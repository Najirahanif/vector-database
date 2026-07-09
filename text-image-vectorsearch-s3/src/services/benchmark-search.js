const { performance } = require("perf_hooks");
const qdrantClient = require("../config/qdrant");

async function benchmark(collectionName, queryVector) {
    const start = performance.now();

    const results = await qdrantClient.search(collectionName, {
        vector: queryVector,
        limit: 5,
    });

    const end = performance.now();

    console.log(
        `${collectionName}: ${(end - start).toFixed(2)} ms`
    );

    return results;
}

module.exports = benchmark;