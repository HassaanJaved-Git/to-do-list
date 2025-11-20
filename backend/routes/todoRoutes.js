import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: 1 });
  res.json(todos);
});

// Add new
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: "Failed to create todo" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete" });
  }
});

export default router;
