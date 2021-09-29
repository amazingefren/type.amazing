import { Router } from "express";
import AuthRouter from "./auth";
const router = Router();

router.use("/auth", AuthRouter);

router.use("/api", (_, res) => {
  res.send("HIIIIIIIIIIIIIIIIIII");
});

export default router;
