const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.project) {
      if (!mongoose.isValidObjectId(req.query.project)) {
        return res.status(400).json({
          message: "Invalid project id"
        });
      }

      filter.project = req.query.project;
    }

    const tasks = await Task.find(filter)
      .populate("project", "name color")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    const task = await Task.findById(req.params.id).populate("project", "name color");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    const populated = await task.populate("project", "name color");
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("project", "name color");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task", error: error.message });
  }
});

module.exports = router;
