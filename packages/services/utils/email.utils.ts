import { Resend } from "resend";
import { env } from "../env";
class EmailService {
  private static resend = new Resend(env.RESEND_API_KEY);

  public static async sendEmailForOTP(email: string, otp: string) {
    const response = await this.resend.emails.send({
      from: "Filloutly <onboarding@resend.dev>",
      to: email,

      subject: "Verify your Filloutly account",

      html: `
        <div
          style="
            background:#0f172a;
            padding:40px;
            font-family:Arial,sans-serif;
            color:white;
          "
        >
          <div
            style="
              max-width:500px;
              margin:auto;
              background:rgba(255,255,255,0.08);
              border:1px solid rgba(255,255,255,0.1);
              border-radius:24px;
              padding:40px;
              backdrop-filter:blur(20px);
            "
          >
            <h1
              style="
                margin:0 0 10px;
                font-size:32px;
              "
            >
              Filloutly
            </h1>

            <p
              style="
                color:#cbd5e1;
                font-size:16px;
                margin-bottom:30px;
              "
            >
              Verify your email address to continue.
            </p>

            <div
              style="
                background:rgba(255,255,255,0.06);
                border-radius:18px;
                padding:24px;
                text-align:center;
                margin-bottom:30px;
              "
            >
              <p
                style="
                  margin:0;
                  color:#94a3b8;
                  font-size:14px;
                "
              >
                Your verification code
              </p>

              <h2
                style="
                  font-size:42px;
                  letter-spacing:10px;
                  margin:12px 0 0;
                  color:white;
                "
              >
                ${otp}
              </h2>
            </div>

            <p
              style="
                color:#94a3b8;
                font-size:14px;
                line-height:1.6;
              "
            >
              This code will expire in 10 minutes.
            </p>

            <p
              style="
                color:#64748b;
                font-size:12px;
                margin-top:30px;
              "
            >
              If you didn’t request this email, you can safely ignore it.
            </p>
          </div>
        </div>
      `,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;
  }
}

export default EmailService;
