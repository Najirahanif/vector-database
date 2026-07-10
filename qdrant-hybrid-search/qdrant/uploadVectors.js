import client from "./client.js";

import products from "../data/products.json" with { type: "json" };

import { getDenseEmbedding } from "../embeddings/dense.js";
import {
    buildVocabulary,
    getSparseEmbedding,
} from "../embeddings/sparse.js";

const COLLECTION_NAME = "hybrid_products";

export async function uploadVectors() {

    // Build the vocabulary once
    buildVocabulary(products);

    const points = [];

    for (const product of products) {

        console.log(`Processing: ${product.text}`);

        const denseVector = await getDenseEmbedding(product.text);

        const sparseVector = getSparseEmbedding(product.text);

        points.push({
            id: product.id,

            vector: {
                dense: denseVector,

                sparse: {
                    indices: sparseVector.indices,
                    values: sparseVector.values,
                },
            },

            payload: {
                text: product.text,
            },
        });
    }

    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points,
    });

    console.log("\n✅ All vectors uploaded successfully.");
}