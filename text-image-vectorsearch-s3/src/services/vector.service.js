const { v4: uuidv4 } = require("uuid");

const qdrantClient = require("../config/qdrant");

const COLLECTION_NAME = "image_embeddings";

async function storeVector({
    embedding,
    fileName,
    fileType,
    s3Key,
    imageUrl,
}) {

    const id = uuidv4();

    await qdrantClient.upsert(COLLECTION_NAME, {
        wait: true,
        points: [
            {
                id,
                vector: embedding,
                payload: {
                    fileName,
                    fileType,
                    s3Key,
                    imageUrl,
                    uploadedAt: new Date().toISOString(),
                },
            },
        ],
    });

    return id;
}

module.exports = {
    storeVector,
};