import { db } from "../database/knexfile";
import { User } from "../models/user.model";

export default {
  getUserById: async (id: number) => {
    try {
      return (
        (await db<User>("users")
          .where({ id })
          .first()
          .select("username", "name")) || { user: null }
      );
    } catch {}
  },
};
