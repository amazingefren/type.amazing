import { Router } from "express";

const router = Router();

router.use("/", (_, res) => {
  res.send("API ROUTE");
});

export default router;
