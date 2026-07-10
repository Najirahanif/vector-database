Use this:

```md
# Qdrant Hybrid Search (Dense + Sparse + RRF)

## Overview

This project demonstrates **Hybrid Search using Qdrant** by combining:

1. Dense Vector Search
2. Sparse Vector Search (TF-IDF)
3. Manual Reciprocal Rank Fusion (RRF)
4. Qdrant Built-in Fusion Query (RRF)

The goal of hybrid search is to combine **semantic understanding** from dense vectors with **keyword matching** from sparse vectors to improve search accuracy.

---

# Tech Stack

- Node.js
- Qdrant Vector Database
- @qdrant/js-client-rest
- Transformers.js (@xenova/transformers) for dense embeddings
- Custom TF-IDF implementation for sparse vectors

---

# Project Structure

```

qdrant-hybrid-search/

│
├── data/
│   └── products.json
│
├── embeddings/
│   ├── dense.js
│   └── sparse.js
│
├── qdrant/
│   ├── client.js
│   ├── createCollection.js
│   ├── uploadVectors.js
│   ├── search.js
│   ├── manualRRF.js
│   └── fusionSearch.js
│
├── index.js
├── package.json
└── README.md

```

---

# How Hybrid Search Works

## 1. Dense Search

Dense embeddings convert text into numerical vectors.

Example:

```

"Apple Phone"

```
    ↓
```

[0.123, -0.432, ...]

```

Dense search understands the meaning of words.

Example:

```

Query:
"Apple Phone"

Can find:

* iPhone
* Smartphone
* Mobile device

```

even if the exact words are different.

---

## 2. Sparse Search (TF-IDF)

Sparse search uses keyword-based matching.

TF-IDF calculates the importance of words.

Formula:

```

TF-IDF = Term Frequency × Inverse Document Frequency

```

Example:

```

Query:

Apple Phone

Matches:

Apple iPhone 15 Pro

```

because the important keywords are present.

---

## 3. Hybrid Search

Hybrid search combines both approaches.

Flow:

```

```
          Query

            |
    ----------------
    |              |
    ▼              ▼
```

Dense Vector     Sparse Vector

```
    |              |

    ▼              ▼
```

Dense Search    Sparse Search

```
    |              |

    ----------------

            |

            ▼

      RRF Fusion

            |

            ▼

    Final Ranked Results
```

```

---

# Reciprocal Rank Fusion (RRF)

RRF combines multiple ranked lists.

Formula:

```

RRF Score = 1 / (K + Rank)

```

where:

```

K = 60

```

Example:

```

Rank 1:

1 / (60 + 1)

= 0.01639

````

If a document appears in both dense and sparse search results, its score increases.

---

# Installation

Clone the project:

```bash
git clone <repository-url>
````

Move into the project:

```bash
cd qdrant-hybrid-search
```

Install dependencies:

```bash
npm install
```

---

# Required Packages

Install packages:

```bash
npm install @qdrant/js-client-rest
npm install @xenova/transformers
```

---

# Start Qdrant

Run Qdrant using Docker:

```bash
docker compose up -d
```

Qdrant will run on:

```
http://localhost:6333
```

---

# Environment Setup

Create:

```
qdrant/client.js
```

Configure Qdrant connection:

```javascript
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
    url: "http://localhost:6333"
});

export default client;
```

---

# Running the Project

Start the application:

```bash
npm start
```

or:

```bash
node index.js
```

---

# Execution Flow

When the application starts:

### Step 1

Create Qdrant collection:

```
hybrid_products
```

with:

```
Dense Vector
Size: 384

Sparse Vector
TF-IDF
```

---

### Step 2

Generate embeddings:

For every product:

```
Product Text

      |
      |

Dense Embedding

      +

TF-IDF Sparse Vector
```

---

### Step 3

Upload vectors:

Stored in Qdrant:

```json
{
 "dense":[...],
 "sparse":{
    "indices":[...],
    "values":[...]
 }
}
```

---

### Step 4

Perform searches:

## Dense Search

Uses only dense vectors.

```
Meaning based search
```

---

## Sparse Search

Uses only TF-IDF vectors.

```
Keyword based search
```

---

## Manual RRF

Combines dense and sparse results using custom code.

File:

```
manualRRF.js
```

---

## Qdrant Fusion Query
With prefetch
"First perform multiple searches, then combine the results."

Uses Qdrant's internal RRF implementation.

query: {
   fusion: "rrf"           //*** use dbsf(Distribution-Based Score Fusion)***
},

*** DBSF (Distribution-Based Score Fusion) - Simple Explanation***

DBSF is another method to combine multiple search results (like dense search + sparse search) into one final ranking.

The difference:

RRF looks at the rank position.
DBSF looks at the actual search scores
File:

```
fusionSearch.js
```

---

# Example Query

```javascript
denseSearch("Apple Phone")

sparseSearch("Apple Phone")

qdrantFusionSearch("Apple Phone")
```

---

# Comparison

| Search Type   | Advantage               |
| ------------- | ----------------------- |
| Dense Search  | Understands meaning     |
| Sparse Search | Exact keyword matching  |
| Manual RRF    | Learn fusion logic      |
| Qdrant RRF    | Production-ready fusion |

---

# Learning Outcomes

After completing this project, you understand:

* Vector embeddings
* Dense vector search
* Sparse vector search
* TF-IDF weighting
* Hybrid search architecture
* Reciprocal Rank Fusion
* Qdrant multi-vector collections
* Qdrant Fusion Query

---

# Future Improvements

Possible improvements:

* Replace TF-IDF with BM25
* Add metadata filtering
* Add larger datasets
* Add reranking models
* Measure search performance using Node.js `perf_hooks`
* Compare dense vs sparse vs hybrid accuracy

---

# Summary

This project implements a complete hybrid search system:

```
Text Data

   ↓

Dense Embedding + Sparse TF-IDF

   ↓

Qdrant Storage

   ↓

Dense Search + Sparse Search

   ↓

RRF Fusion

   ↓

Improved Search Results
```

```

This README is written as a **future reference document**: it explains not only how to run it, but also why each part exists and how the complete hybrid search pipeline works.
```
