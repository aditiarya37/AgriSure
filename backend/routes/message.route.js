import express from "express";
const router = express.Router();

// Add your message routes here
router.get("/", (req, res) => {
  res.json({ message: "Message routes working" });
});

export default router;