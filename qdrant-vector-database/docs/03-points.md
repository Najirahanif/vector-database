# Part 3 – Points

## Objective

Understand what a Point is in Qdrant and learn how to insert, retrieve, update, and delete points. This part focuses on how data is stored inside a collection before performing vector search.

---

# What is a Point?

A **Point** is the basic unit of data stored in a Qdrant collection.

Every point contains:

* **ID** – A unique identifier for the point.
* **Vector** – A numerical representation (embedding) used for similarity search.
* **Payload** *(Optional)* – Additional metadata associated with the point.

Structure:

```text
Collection
│
├── Point
│   ├── ID
│   ├── Vector
│   └── Payload
│
├── Point
│   ├── ID
│   ├── Vector
│   └── Payload
│
└── Point
```

---

# Commands Used

## 1. upsert()

Inserts new points into a collection.

If a point with the same ID already exists, it is updated instead of creating a duplicate.

Purpose:

* Insert new points
* Update existing points

---

## 2. retrieve()

Retrieves one or more points using their IDs.

Purpose:

* Read stored vectors
* View payload
* Verify inserted data

---

## 3. delete()

Removes one or more points from a collection.

Purpose:

* Delete unwanted data
* Test point removal

---

# Questions & Answers

## 1. What is a Point?

A Point is the smallest unit of data stored in a Qdrant collection. It represents a single object and contains a unique ID, a vector, and optional payload metadata.

---

## 2. What is the purpose of the ID?

The ID uniquely identifies each point in the collection.

It is used to:

* Retrieve a specific point
* Update an existing point
* Delete a point
* Prevent duplicate records with the same identifier

Example:

```text
ID: 1

Dog
```

---

## 3. What is the Vector?

A Vector is an array of numbers that represents the semantic meaning or features of an object.

Examples:

* Text embeddings
* Image embeddings
* Audio embeddings

Example:

```text
[0.92, 0.11, 0.35, 0.81]
```

Qdrant compares vectors to find similar points.

---

## 4. What is the Payload?

Payload is additional metadata stored alongside a vector.

Unlike the vector, payload is not used directly for similarity calculations. It provides descriptive information and can be used for filtering.

Example:

```json
{
  "name": "Dog",
  "category": "Pet"
}
```

Examples of payload fields:

* name
* category
* price
* brand
* createdAt
* city

---

## 5. What does upsert() do?

The `upsert()` operation combines **Update** and **Insert**.

Behavior:

* If the ID does not exist → a new point is inserted.
* If the ID already exists → the existing point is updated.

This means you can safely call `upsert()` without checking whether the point already exists.

---

## 6. Why must the vector length match the collection's vector size?

When a collection is created, its vector dimension is fixed.

Example:

Collection vector size:

```text
4
```

Valid vector:

```text
[0.2, 0.5, 0.7, 0.9]
```

Invalid vector:

```text
[0.2, 0.5, 0.7]
```

The second vector has only three values, so Qdrant rejects it.

This restriction exists because similarity algorithms compare vectors mathematically, and all vectors must have the same number of dimensions.

---

# Sample Point

```text
Point
│
├── ID
│      1
│
├── Vector
│      [0.9, 0.1, 0.3, 0.8]
│
└── Payload
       name      : Dog
       category  : Pet
```

---

# What I Learned

* A collection stores multiple points.
* Every point has a unique ID.
* Every point contains a vector used for similarity search.
* Payload stores metadata about the point.
* `upsert()` inserts new points or updates existing ones.
* `retrieve()` reads points by their IDs.
* `delete()` removes points from a collection.
* Every vector in a collection must have the same number of dimensions.

---

# Commands Used

```bash
node src/part3-insertPoints.js
```

```bash
node src/part3-getPoints.js
```

```bash
node src/part3-deletePoint.js
```

---

# Observations

* Points became visible in the Qdrant Dashboard after insertion.
* Each point displayed its ID, vector, and payload.
* Updating an existing ID with `upsert()` modified the existing point instead of creating a duplicate.
* Attempting to insert a vector with the wrong dimension resulted in an error because the collection enforces a fixed vector size.
* Deleting a point removed it from the collection, and the dashboard reflected the updated point count.
