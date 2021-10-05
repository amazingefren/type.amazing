import * as passport from "passport";
import { Router, Response, Request } from "express";
import { userRegisterValidator } from "./dto/user.dto";

import { validationResult } from "express-validator";
import authService from "../../services/auth.service";

const router = Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.send("Already logged in");
  res.send("You're not logged in");
});

router.post("/login", (req, res, next) => {
  if (req.isAuthenticated()) return res.send("Already logged in");
  passport.authenticate("local", { successRedirect: "/" }, (err, user) => {
    if (err) return res.send({ error: err });
    req.login(user, (err) => {
      if (err) {
        return res.send({ error: err });
      }
      return res.send("ok");
    });
  })(req, res, next);
});

router.post(
  "/register",
  userRegisterValidator(),
  async (req: Request, res: Response) => {
    if (req.isAuthenticated()) return res.send("Already logged in");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = await authService.createUser(req.body);
      return res.json({ userId: userId });
    } catch ({ message }) {
      return res.status(500).send({ error: { message } });
    }
  }
);

export default router;
