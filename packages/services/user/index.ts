import { emailVerificationTable } from "@repo/database/models/email-verifications";
import { usersTable } from "@repo/database/models/user";
import crypto from "node:crypto";
import { db, eq } from "../../database/index";
import JwtUtils from "../utils/jwt.utils";
import {
  createUserWithEmailPasswordInput,
  CreateUserWithEmailPasswordInput,
  resendEmailInput,
  ResendEmailInput,
  signUserWithEmailPasswordInput,
  SignUserWithEmailPasswordInput,
  verifyEmailInput,
  VerifyEmailInput,
} from "./model";

class UserService {
  private hashPassword(salt: string, plainPassword: string) {
    const hashedPassword = crypto.createHmac("sha256", salt).update(plainPassword).digest("hex");
    return hashedPassword;
  }

  private async getUserWithEmail(email: string) {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!users || users.length === 0 || !users[0]?.id)
      throw new Error("User with email  not exist");
    return users[0];
  }

  private async getEmailVerificationData(email: string) {
    const emailVerificationsData = await db
      .select()
      .from(emailVerificationTable)
      .where(eq(emailVerificationTable.email, email));
    if (
      !emailVerificationsData ||
      emailVerificationsData.length === 0 ||
      !emailVerificationsData[0]?.id
    )
      throw new Error("Invalid email no user account exist with this email");
    return emailVerificationsData[0];
  }

  private async updateOtpForEmail(email: string, otp: string) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const existingEmails = await db
      .select()
      .from(emailVerificationTable)
      .where(eq(emailVerificationTable.email, email));

    if (existingEmails.length === 0) {
      // Insert new OTP
      const data = await db
        .insert(emailVerificationTable)
        .values({
          email,
          otp,
          expiresAt,
        })
        .returning({
          id: emailVerificationTable.id,
        });

      if (!data[0]?.id) {
        throw new Error("Failed to create OTP verification");
      }

      return {
        id: data[0].id,
      };
    } else {
      // Update existing OTP
      const data = await db
        .update(emailVerificationTable)
        .set({
          otp,
          expiresAt,
        })
        .where(eq(emailVerificationTable.email, email))
        .returning({
          id: emailVerificationTable.id,
        });

      if (!data[0]?.id) {
        throw new Error("Failed to update OTP verification");
      }

      return {
        id: data[0].id,
      };
    }
  }

  public async createUserWithEmailPassword(payload: CreateUserWithEmailPasswordInput) {
    const { fullName, email, password } =
      await createUserWithEmailPasswordInput.parseAsync(payload);
    const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (existingUsers && existingUsers.length > 0 && existingUsers[0]?.id)
      throw new Error("User already exist with email");
    /// Password hashing
    const salt = crypto.randomBytes(32).toString();
    const hashedPassword = this.hashPassword(salt, password);

    const users = await db
      .insert(usersTable)
      .values({ fullName, email, password: hashedPassword, salt })
      .returning({ id: usersTable.id });
    if (!users || users.length === 0 || !users[0]?.id)
      throw new Error("Something went wrong while adding user");
    // Create otp
    await this.sendOtpEmail(email);
    /// Sent email to user
    return {
      message: "6 digit code sent on your email please check your inbox",
      email: email,
    };
  }

  private async sendOtpEmail(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailVerificationData = await this.updateOtpForEmail(email, otp);
    // await EmailService.sendEmailForOTP(email, otp);
    return emailVerificationData.id;
  }
  public async signUserWithEmailPassword(payload: SignUserWithEmailPasswordInput) {
    console.log("Sign user password service call...");
    const { email, password } = await signUserWithEmailPasswordInput.parseAsync(payload);
    const user = await this.getUserWithEmail(email);
    if (!user.salt) throw new Error("Invalid salt");
    const hashPassword = this.hashPassword(user.salt, password);
    if (user.password !== hashPassword) throw new Error("Password incorrect");
    if (!user.emailVerified) {
      // Create otp
      await this.sendOtpEmail(email);
      /// Send email to user
      return {
        message: "6 digit code sent on your email please check your inbox ",
        isVerified: false,
        token: "",
        refreshToken: "",
        id: user.id,
        email: user.email,
        role: user.role as "creator" | "admin",
      };
    } else {
      const accessToken = JwtUtils.generateJwtToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshToken = JwtUtils.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      // Persist refresh token in DB
      await db.update(usersTable).set({ refreshToken }).where(eq(usersTable.id, user.id));

      return {
        message: "Logged in successfully",
        isVerified: true,
        token: accessToken,
        refreshToken,
        id: user.id,
        email: user.email,
        role: user.role as "creator" | "admin",
      };
    }
  }

  public async resendEmail(payload: ResendEmailInput) {
    const { email } = await resendEmailInput.parseAsync(payload);
    const user = await this.getUserWithEmail(email);
    /// Create otp and send otp
    await this.sendOtpEmail(email);
    return {
      message: "Otp Resend successfully please check email",
      email: user.email,
    };
  }

  public async verifyEmail(payload: VerifyEmailInput) {
    const { email, otp } = await verifyEmailInput.parseAsync(payload);
    const currentDate = new Date();
    const emailVerificationData = await this.getEmailVerificationData(email);
    /// Check expiry first
    if (emailVerificationData.expiresAt < currentDate) throw new Error("Otp has been expired");
    /// Match otp
    if (emailVerificationData.otp !== otp) throw new Error("Invalid otp");
    const updatedUser = await db
      .update(usersTable)
      .set({ emailVerified: true })
      .where(eq(usersTable.email, email))
      .returning();
    if (!updatedUser || updatedUser.length === 0) throw new Error("Error while updating user");

    const user = await this.getUserWithEmail(email);
    /// generate tokens
    const accessToken = JwtUtils.generateJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = JwtUtils.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    // Persist refresh token in DB
    await db.update(usersTable).set({ refreshToken }).where(eq(usersTable.id, user.id));

    return {
      message: "Email verified successfully",
      id: user.id,
      token: accessToken,
      refreshToken,
      role: user.role as "creator" | "admin",
    };
  }

  public async userInfoUsingId(id: string) {
    const user = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        fullName: usersTable.fullName,
        role: usersTable.role,
        profileImageUrl: usersTable.profileImageUrl,
        refreshToken: usersTable.refreshToken,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));
    if (!user || user.length === 0 || !user[0]?.id) throw new Error("User not exist with this id");
    return user[0];
  }

  public async verifyAndDecodeUserToken(token: string) {
    const { id } = JwtUtils.verifyJwtToken(token);
    const userInfo = await this.userInfoUsingId(id);
    return { ...userInfo };
  }

  // ── Refresh Token Flow
  public async refreshUserToken(refreshToken: string) {
    const payload = JwtUtils.verifyRefreshToken(refreshToken);

    const userInfo = await this.userInfoUsingId(payload.id);
    if (!userInfo.refreshToken || userInfo.refreshToken !== refreshToken) {
      throw new Error("Refresh token reuse detected or token revoked");
    }

    const newAccessToken = JwtUtils.generateJwtToken({
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    });
    const newRefreshToken = JwtUtils.generateRefreshToken({
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    });

    await db
      .update(usersTable)
      .set({ refreshToken: newRefreshToken })
      .where(eq(usersTable.id, userInfo.id));

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      id: userInfo.id,
    };
  }

  public async revokeRefreshToken(userId: string) {
    await db.update(usersTable).set({ refreshToken: null }).where(eq(usersTable.id, userId));
  }
}

export default UserService;
