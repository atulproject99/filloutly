import jwt from "jsonwebtoken";
import { env } from "../env";
import { GenerateTokePayloadType } from "../user/model";
class JwtUtils {
  public static generateJwtToken(payload: GenerateTokePayloadType) {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
  public static verifyJwtToken(token: string): GenerateTokePayloadType {
    try {
      const result = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as GenerateTokePayloadType;
      return result;
    } catch (error: any) {
      throw new Error(`Token invalid ${error.message}`);
    }
  }
}

export default JwtUtils;
