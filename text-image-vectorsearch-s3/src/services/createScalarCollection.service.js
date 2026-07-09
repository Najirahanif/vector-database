const qdrantClient = require("../config/qdrant");

const COLLECTION_NAME = "image_embeddings_scalar";

async function createScalarCollection() {
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
        scalar: {
          type: "int8",
          quantile: 0.99,
          always_ram: true,
        },
      },
    });

    console.log(
      `✅ Scalar Quantized Collection '${COLLECTION_NAME}' created successfully.`
    );
  } catch (error) {
    console.error("❌ Error creating scalar collection:");
    console.error(error);
  }
}

module.exports = {
  createScalarCollection,
};