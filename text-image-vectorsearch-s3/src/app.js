const express = require("express");
const cors = require("cors");
const qdrantClient = require("./config/qdrant.js");
const { createCollection } = require("./services/qdrant.service.js");
const uploadRoute = require("./routes/upload.route.js");
const searchRoute = require("./routes/search.route.js");
const imageSearchRoute =
  require("./routes/image-search.route");

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await createCollection();
    await qdrantClient.getCollections();
    console.log("✅ Qdrant connected successfully");
  } catch (error) {
    console.error("❌ Qdrant connection failed");
    console.error(error.message);
  }
})();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vector Search API Running",
  });
});

app.use("/api", uploadRoute);
app.use(
  "/api",
  searchRoute
);
app.use(
  "/api",
  imageSearchRoute
);

module.exports = app;