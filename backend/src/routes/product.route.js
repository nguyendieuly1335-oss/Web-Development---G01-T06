const express = require("express");
const ProductService = require("@services/product.service.js");
const productSchema = require("@validators/product.validator.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || null;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const result = await ProductService.getByKeyword(search, page, limit);

    res.json({ success: true, ...result });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await ProductService.getById(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const data = await ProductService.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const data = await ProductService.update(req.params.id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ProductService.delete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

module.exports = router;
