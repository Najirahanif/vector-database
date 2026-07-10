import client from "./client.js";
import { getDenseEmbedding } from "../embeddings/dense.js";
import { getSparseEmbedding } from "../embeddings/sparse.js";

const COLLECTION_NAME = "hybrid_products";

export async function denseSearch(query) {

    console.log("\nQuery:", query);

    // Generate dense embedding for the query
    const queryVector = await getDenseEmbedding(query);

    // Search Qdrant
    const results = await client.query(COLLECTION_NAME, {
        query: queryVector,
        using: "dense",
        limit: 5,
        with_payload: true
    });

    return results.points;
}

export async function sparseSearch(query) {

    console.log("\nQuery:", query);

    // Generate TF-IDF sparse vector
    const sparseVector = getSparseEmbedding(query);

    const results = await client.query(COLLECTION_NAME, {
        query: {
            indices: sparseVector.indices,
            values: sparseVector.values
        },
        using: "sparse",
        limit: 5,
        with_payload: true
    });

    return results.points;
}