import { RegisterInput } from "routes/auth/dto/user.dto";
import { User } from "../models/user.model";
import { db } from "../database/knexfile";
import * as bcrypt from "bcrypt";

import getLogger from "../utils/logger";
const logger = getLogger("AuthService");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const getError = (code: string) => {
  if (code == "ER_DUP_ENTRY") return "Username is taken";
  return "Something Went Wrong!";
};

const authService = {
  // Create User
  createUser: async (data: RegisterInput) => {
    try {
      const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
      const userId = await db<User>("users").insert({
        username: data.username,
        password: hash,
        name: data.username,
      });
      logger.debug("Successful Registration of UserID: " + userId);
      return userId[0];
    } catch (e) {
      logger.debug(e.code);
      throw new Error(getError(e.code));
    }
  },
};

export default authService;
