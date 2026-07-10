// embeddings/sparse.js

const vocabulary = new Map();
const documentFrequency = new Map();

let totalDocuments = 0;

// ----------------------------
// Tokenize
// ----------------------------
function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);
}

// ----------------------------
// Build Vocabulary + DF
// ----------------------------
export function buildVocabulary(documents) {

    vocabulary.clear();
    documentFrequency.clear();

    totalDocuments = documents.length;

    let index = 0;

    for (const document of documents) {

        const uniqueWords = new Set(tokenize(document.text));

        for (const word of uniqueWords) {

            if (!vocabulary.has(word)) {
                vocabulary.set(word, index++);
            }

            documentFrequency.set(
                word,
                (documentFrequency.get(word) || 0) + 1
            );
        }
    }

    console.log("Vocabulary Size:", vocabulary.size);
}

// ----------------------------
// TF-IDF Sparse Vector
// ----------------------------
export function getSparseEmbedding(text) {

    const words = tokenize(text);
    const tf = {};
    // TF
    for (const word of words) {
        tf[word] = (tf[word] || 0) + 1;
    }

    const indices = [];
    const values = [];

    for (const word in tf) {
        const tfValue = tf[word];
        const df = documentFrequency.get(word) || 1;
        const idf = Math.log((totalDocuments + 1) / (df + 1)) + 1;
        const weight = tfValue * idf;
        const index = vocabulary.get(word);
        if (index === undefined) {
            continue;
        }
        indices.push(index);
        values.push(Number(weight.toFixed(4)));
    }
    return {
        indices,
        values
    };
}