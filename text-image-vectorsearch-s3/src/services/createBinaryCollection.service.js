const qdrantClient = require("../config/qdrant");

const COLLECTION_NAME = "image_embeddings_binary";

async function createBinaryCollection() {
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

      quantization_config: {
        binary: {
          always_ram: true,
        },
      },
    });

    console.log(
      `✅ Binary Quantized Collection '${COLLECTION_NAME}' created successfully.`
    );
  } catch (error) {
    console.error("❌ Error creating binary collection:");
    console.error(error);
  }
}

module.exports = {
  createBinaryCollection,
};