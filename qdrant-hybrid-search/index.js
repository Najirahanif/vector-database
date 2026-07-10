import products from "./data/products.json" with { type: "json" };
import client from "./qdrant/client.js";
import createCollection from "./qdrant/createCollection.js";
import { uploadVectors } from "./qdrant/uploadVectors.js";
import { buildVocabulary } from "./embeddings/sparse.js";
import { denseSearch, sparseSearch } from "./qdrant/search.js";
import { reciprocalRankFusion } from "./qdrant/manualRRF.js";
import { qdrantFusionSearch } from "./qdrant/fusionSearch.js";

async function main() {
    try {
        console.log("Connecting to Qdrant...\n");

        // 1. Create Collection
        await createCollection();

        const collections = await client.getCollections();
        console.log("✅ Connected Successfully");

        collections.collections.forEach((collection, index) => {
            console.log(`${index + 1}. ${collection.name}`);
        });

        // 2. Build TF-IDF Vocabulary
        buildVocabulary(products);

        // 3. Upload Dense + Sparse Vectors
        await uploadVectors();

        // ----------------------------
        // Dense Search
        // ----------------------------
        const denseResults = await denseSearch("Apple Phone");
        console.log('denseResults: ', denseResults);

        // ----------------------------
        // Sparse Search
        // ----------------------------
        const sparseResults = await sparseSearch("Apple Phone");
        console.log('sparseResults: ', sparseResults);

        // ----------------------------
        // Manual RRF
        // ----------------------------
        const manualHybrid = reciprocalRankFusion(
            denseResults,
            sparseResults
        );

        console.log("\n========== MANUAL RRF ==========\n");

        manualHybrid.forEach((result, index) => {
            console.log(`${index + 1}.`);
            console.log("Text:", result.point.payload.text);
            console.log("Score:", result.score.toFixed(6));
            console.log("----------------");
        });

        // ----------------------------
        // Qdrant Built-in RRF
        // ----------------------------
        const qdrantHybrid = await qdrantFusionSearch("Apple Phone");

        console.log("\n========== QDRANT FUSION RRF ==========\n");

        qdrantHybrid.forEach((result, index) => {
            console.log(`${index + 1}.`);
            console.log("Text:", result.payload.text);
            console.log("Score:", result.score);
            console.log("----------------");
        });

    } catch (error) {
        console.error("❌ Failed");
        console.error(error);
    }
}

main();