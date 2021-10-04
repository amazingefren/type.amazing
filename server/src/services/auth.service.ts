import { RegisterInput } from "routes/auth/dto/user.dto";
import { User } from "../models/user.model";
import { db } from "../database/knexfile";

const authService = {
  createUser: async (data: RegisterInput) => {
    // Knex returns id of user created
    const userId = await db<User>("users").insert({
      username: data.username,
      password: data.password,
      name: data.username,
    });

    console.log(userId[0]);
    return userId[0];
  },
};

export default authService;
