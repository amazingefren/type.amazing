import { Router } from "express";
import userService from "../../services/user.service";

const router = Router();

router.get("/me", async (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(
      await userService
        .getUserById(req.user as number)
        .catch((_) => ({ error: "Something Went Wrong!" }))
    );
  }
  return res.send({ user: null });
});

export default router;
