# Part 4 – Vector Search

## Objective

Learn how Qdrant performs similarity search using vectors instead of exact text matching.

---

# What is Vector Search?

Vector search compares a **query vector** with the vectors stored in a collection and returns the most similar results.

```text
Query Vector
      │
      ▼
Compare with Stored Vectors
      │
      ▼
Calculate Similarity
      │
      ▼
Sort by Score
      │
      ▼
Return Top-K Results
```

---

# Query Vector

A query vector is the vector used to perform the search.

Example:

```text
[0.88, 0.15, 0.32, 0.76]
```

It is compared against every indexed vector in the collection.

---

# Similarity Score

The similarity score indicates how close a stored vector is to the query vector.

Since this collection uses **Cosine Similarity**:

* Score close to **1** → Highly similar
* Lower score → Less similar

Example:

| Point | Score |
| ----- | ----: |
| Dog   | 0.998 |
| Cat   | 0.964 |
| Tiger | 0.421 |

---

# Top-K Search

The `limit` parameter specifies how many of the most similar results should be returned.

Example:

```javascript
limit: 3
```

Returns only the top 3 matching points.

---

# with_payload

Payload contains metadata stored with each point.

Example:

```json
{
  "name": "Dog",
  "category": "Pet"
}
```

* `with_payload: false` → Returns only ID and score.
* `with_payload: true` → Returns ID, score, and payload.

---

# with_vector

Controls whether the stored vector is included in the response.

* `with_vector: false` → Vector is hidden (default).
* `with_vector: true` → Stored vector is returned along with the result.

---

# Search Flow

```text
User Query
      │
      ▼
Embedding Model
      │
      ▼
Query Vector
      │
      ▼
Qdrant
      │
      ▼
Similarity Search
      │
      ▼
Rank by Score
      │
      ▼
Top-K Results
```

---

# Commands Used

* `query()` / `search()`
* `limit`
* `with_payload`
* `with_vector`

---

# Comparison with MongoDB Atlas

| MongoDB Atlas       | Qdrant                 |
| ------------------- | ---------------------- |
| `$vectorSearch`     | `query()` / `search()` |
| `queryVector`       | `query`                |
| `limit`             | `limit`                |
| `vectorSearchScore` | `score`                |
| Document Fields     | Payload                |
| Embedding Field     | Vector                 |

---

# What I Learned

* Vector search finds similar vectors instead of matching text.
* A query vector is compared with stored vectors.
* Cosine similarity calculates the similarity score.
* Results are ranked from highest to lowest score.
* `limit` controls the number of returned results.
* `with_payload` returns metadata.
* `with_vector` returns the stored vector.
* The workflow is conceptually similar to MongoDB Atlas Vector Search.
