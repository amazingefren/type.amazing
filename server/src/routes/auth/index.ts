import * as passport from "passport";
// import { db } from '../../database/knexfile'
import { Router, Response, Request } from "express";
import { userRegisterValidator } from "./dto/user.dto";

import log from "../../utils/logger";
import { validationResult } from "express-validator";
import authService from "../../services/auth.service";
const logger = log("/auth");

const router = Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.send("HII");
  res.send("You're not logged in");
});

router.post("/login", passport.authenticate("local", { successRedirect: "/" }));

router.post(
  "/register",
  userRegisterValidator(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = await authService.createUser(req.body);
    return res.json({ userId: userId });
  }
);

export default router;
