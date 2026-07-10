import { pipeline } from "@huggingface/transformers";

let extractor = null;

// Load the model only once
async function loadModel() {
    if (!extractor) {
        console.log("Loading embedding model...\n");

        extractor = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );

        console.log("✅ Model loaded successfully.\n");
    }

    return extractor;
}

export async function getDenseEmbedding(text) {
    const model = await loadModel();

    const output = await model(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}