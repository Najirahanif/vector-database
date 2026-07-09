const { v4: uuidv4 } = require("uuid");
const qdrantClient = require("../config/qdrant");

async function storeVector({
    collectionName,
    embedding,
    fileName,
    fileType,
    s3Key,
    imageUrl,
}) {
    const id = uuidv4();

    await qdrantClient.upsert(collectionName, {
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

    console.log(`✅ Stored in ${collectionName}`);

    return id;
}

module.exports = {
    storeVector,
};