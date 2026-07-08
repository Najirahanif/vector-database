const qdrantClient = require("../config/qdrant");

const COLLECTION_NAME = "image_embeddings";

async function createCollection() {
  try {
    const collections = await qdrantClient.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === COLLECTION_NAME
    );

    if (exists) {
      console.log(`✅ Collection '${COLLECTION_NAME}' already exists.`);
      return;
    }

    await qdrantClient.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 512,
        distance: "Cosine",
      },
    });

    console.log(`✅ Collection '${COLLECTION_NAME}' created successfully.`);
  } catch (error) {
    console.error("❌ Error creating collection:");
    console.error(error.message);
  }
}

module.exports = {
  createCollection,
};