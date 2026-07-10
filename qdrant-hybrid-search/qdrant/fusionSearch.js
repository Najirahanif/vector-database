import client from "./client.js";

import { getDenseEmbedding } from "../embeddings/dense.js";
import { getSparseEmbedding } from "../embeddings/sparse.js";


const COLLECTION_NAME = "hybrid_products";


export async function qdrantFusionSearch(query) {

    console.log("\nFusion Query:", query);
    // Create dense query vector
    const denseVector = await getDenseEmbedding(query);
    // Create sparse TF-IDF query vector
    const sparseVector = getSparseEmbedding(query);
    const response = await client.query(
        COLLECTION_NAME,
        {
            prefetch: [
                {
                    query: denseVector,
                    using: "dense",
                    limit: 10
                },
                {
                    query: {
                        indices: sparseVector.indices,
                        values: sparseVector.values
                    },
                    using: "sparse",
                    limit: 10
                }
            ],
            query: {
                fusion: "rrf"//Distribution-Based Score Fusion
            },
            limit: 5,
            with_payload: true
        }
    );


    return response.points;
}