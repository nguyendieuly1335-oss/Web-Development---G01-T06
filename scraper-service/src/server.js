const express = require("express");
const dotenv = require("dotenv");
const { mockReviews } = require("./mock-review.js");

dotenv.config();
const app = express();
const SERVICE_PORT = process.env.SERVICE_PORT || 4000;

app.use(express.json());

/**
 * GET /api/scrape/reviews/:productId
 * Fetch reviews for a specific product from all sources
 *
 * Query params:
 * - source: Filter by specific source (amazon, bestbuy, walmart)
 * - delay: Simulate network delay in ms (default: 500)
 */
app.get("/api/scrape/reviews/:productId", async (req, res) => {
  const { productId } = req.params;
  const { source, delay = 3000 } = req.query;

  await new Promise((resolve) => setTimeout(resolve, parseInt(delay)));

  const productReviews = mockReviews[productId];

  if (!productReviews) {
    return res.status(404).json({
      error: "Product not found",
      message: `No reviews available for product ${productId}`,
      availableProducts: Object.keys(mockReviews),
    });
  }

  let reviews = [];
  if (source) {
    const sourceLower = source.toLowerCase();
    reviews = productReviews[sourceLower] || [];
    if (reviews.length === 0) {
      return res.status(404).json({
        error: "Source not found",
        message: `No reviews from ${source} for product ${productId}`,
        availableSources: Object.keys(productReviews),
      });
    }
  } else {
    reviews = Object.values(productReviews).flat();
  }

  res.json({
    product_id: productId,
    source: source || "all",
    count: reviews.length,
    fetched_at: new Date().toISOString(),
    data: reviews,
  });
});

/**
 * GET /api/scrape/sources
 * List available review sources
 */
app.get("/api/scrape/sources", (req, res) => {
  res.json({
    sources: [
      {
        name: "Amazon",
        id: "amazon",
        description: "Amazon product reviews",
        active: true,
      },
      {
        name: "BestBuy",
        id: "bestbuy",
        description: "Best Buy customer reviews",
        active: true,
      },
      {
        name: "Walmart",
        id: "walmart",
        description: "Walmart product ratings",
        active: true,
      },
    ],
  });
});

/**
 * GET /api/scrape/products
 * List available products with reviews
 */
app.get("/api/scrape/products", (req, res) => {
  const products = Object.entries(mockReviews).map(([id, sources]) => {
    const totalReviews = Object.values(sources).flat().length;
    return {
      id,
      name: getProductName(id),
      sources: Object.keys(sources),
      total_reviews: totalReviews,
    };
  });

  res.json({ products });
});

/**
 * Helper: Get product name by ID
 */
function getProductName(id) {
  const names = {
    1: "USB-C Fast Charger 30W",
    2: "Wireless Bluetooth Headphones",
    3: "Smart LED Light Bulb",
    4: "Portable SSD 1TB",
    5: "Webcam HD 1080p",
  };
  return names[id] || `Product ${id}`;
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "Endpoint not found",
    availableEndpoints: [
      "GET /health",
      "GET /api/scrape/reviews/:productId",
      "GET /api/scrape/sources",
      "GET /api/scrape/products",
    ],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
app.listen(SERVICE_PORT, "0.0.0.0", () => {
  console.log(`Scraper service running on http://localhost:${SERVICE_PORT}`);
});
