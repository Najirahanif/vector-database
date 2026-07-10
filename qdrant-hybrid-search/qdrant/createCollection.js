import client from "./client.js";

const COLLECTION_NAME = "hybrid_products";

async function createCollection() {
  try {
    // Check if collection already exists
    const collections = await client.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === COLLECTION_NAME
    );

    if (exists) {
      console.log(`✅ Collection "${COLLECTION_NAME}" already exists.`);
      return;
    }

    // Create hybrid collection
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        dense: {
          size: 384,
          distance: "Cosine",
        },
      },

      sparse_vectors: {
        sparse: {},
      },
    });

    console.log(`✅ Collection "${COLLECTION_NAME}" created successfully.`);
  } catch (error) {
    console.error("❌ Error creating collection");
    console.error(error.message);
  }
}

export default createCollection;