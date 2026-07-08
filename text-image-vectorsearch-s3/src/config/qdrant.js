const { QdrantClient } = require("@qdrant/js-client-rest");

const client = new QdrantClient({
    url: process.env.QDRANT_URL
});

module.exports = client;