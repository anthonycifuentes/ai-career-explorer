import express from "express";


const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    version: "1.0.0",
    documentation: "https://example.com/docs",
  });
});

export default router;
