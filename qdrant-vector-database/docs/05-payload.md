# Part 5 – Payload & Filtering

## Objective

Learn how to filter search results using payload (metadata) stored with each point.

---

# What is Payload?

Payload is the metadata stored alongside a vector.

Example:

```json
{
  "name": "Dog",
  "category": "Pet",
  "color": "Brown",
  "age": 3
}
```

Unlike vectors, payload is **not used to calculate similarity**. It is used to filter search results.

---

# Why is Filtering Needed?

Sometimes you don't want to search the entire collection.

Example:

```text
Find similar animals

Only where

category = "Pet"
```

Instead of searching every point, Qdrant searches only the points that satisfy the filter.

---

# Search Flow

```text
Query Vector
      │
      ▼
Apply Filter
(category = Pet)
      │
      ▼
Vector Search
      │
      ▼
Top-K Results
```

---

# Filter Types

### Match

Find exact values.

Example:

```text
category = "Pet"
```

---

### Range

Find values within a range.

Example:

```text
price > 500

age < 5
```

---

### Boolean

Filter true/false values.

Example:

```text
isAvailable = true
```

---

### Multiple Conditions

Combine multiple filters.

Example:

```text
category = "Pet"

AND

age < 5
```

---

# Payload Index

A Payload Index improves filtering performance.

Without an index:

```text
Check every point
```

With an index:

```text
Go directly to matching points
```

Payload indexes are useful when filtering on fields that are queried frequently.

---

# Commands Used

* `query()` / `search()`
* `filter`
* `must`
* `should`
* `must_not`

---

# Comparison with MongoDB

| MongoDB        | Qdrant        |
| -------------- | ------------- |
| Document Field | Payload       |
| `$match`       | `filter`      |
| `$and`         | `must`        |
| `$or`          | `should`      |
| `$ne`          | `must_not`    |
| Index          | Payload Index |

---

# What I Learned

* Payload stores metadata for each point.
* Payload is not used for similarity calculation.
* Filters reduce the search space before returning results.
* Filters can match text, numbers, booleans, and ranges.
* Payload indexes improve filter performance.
* Filtering in Qdrant is conceptually similar to filtering documents in MongoDB.


match → Exact value filtering.
range → Numeric comparisons (gte, lte, gt, lt).
must → All conditions must be true (logical AND).
should → At least one condition should be true (logical OR).
must_not → Exclude matching points (logical NOT).
