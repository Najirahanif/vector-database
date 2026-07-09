const express = require("express");
const cors = require("cors");
const qdrantClient = require("./config/qdrant.js");
const { createCollection } = require("./services/createCollection.js");
const uploadRoute = require("./routes/upload.route.js");
const searchRoute = require("./routes/search.route.js");
const imageSearchRoute =
  require("./routes/image-search.route");
const { createScalarCollection } = require("./services/createScalarCollection.service.js");
const { createBinaryCollection } = require("./services/createBinaryCollection.service.js");
const benchmark = require("./services/benchmark-search.js");

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  const points = await qdrantClient.scroll("image_embeddings", {
    limit: 1,
    with_vector: true,
  });

  const vector = points.points[0].vector;
  try {

    //create the collection 
    await createCollection();
    await createScalarCollection();
    await createBinaryCollection();
    await qdrantClient.getCollections();

    // check the size for4 each quantization 
    // image_embeddings: 3.81 ms
    // image_embeddings_scalar: 3.25 ms
    // image_embeddings_binary: 2.99 ms
    await benchmark("image_embeddings", vector);
    await benchmark("image_embeddings_scalar", vector);
    await benchmark("image_embeddings_binary", vector);
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