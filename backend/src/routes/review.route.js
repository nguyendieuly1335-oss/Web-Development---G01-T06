const express = require("express");
const ReviewService = require("@services/review.service.js");
const reviewSchema = require("@validators/review.validator.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const data = await ReviewService.getAll(page, limit);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/byProductId/:product_id", async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const { source, sortBy } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const data = await ReviewService.getByProductId(product_id, page, limit, source, sortBy);
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await ReviewService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const data = await ReviewService.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const data = await ReviewService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ReviewService.delete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

module.exports = router;
