import express from "express";
import coursesRoutes from "../modules/courses/routes/courses-routes";

const router = express.Router();

router.use("/courses", coursesRoutes);

export default router;
