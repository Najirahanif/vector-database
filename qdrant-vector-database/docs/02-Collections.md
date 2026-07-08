# Part 2 – Collections

## Objective

Learn what a **Collection** is in Qdrant and understand how to create, view, inspect, and delete collections using the Qdrant Node.js SDK.

A collection is the first object that must be created before storing vectors.

---

# What is a Collection?

A **Collection** is a logical container that stores **Points**.

Each collection defines:

* The vector dimension
* The distance metric
* The indexing configuration
* The payload configuration

Every point stored inside a collection must follow the collection's configuration.

Example:

```text
Qdrant
│
└── Collection (animals)
      │
      ├── Point
      ├── Point
      ├── Point
      └── Point
```

---

# Why do we need a Collection?

A collection organizes similar types of vector data.

Examples:

```text
images

documents

products

movies

songs
```

Instead of storing everything together, each dataset can have its own collection with its own configuration.

---

# Collection Properties

Every collection is created with:

## Collection Name

A unique name used to identify the collection.

Example:

```text
animals
```

---

## Vector Size

Defines the number of dimensions every vector must have.

Example:

```text
4
```

Valid vector:

```text
[0.2, 0.5, 0.7, 0.9]
```

Invalid vector:

```text
[0.2, 0.5]
```

Every vector stored in the collection must have exactly the configured number of dimensions.

---

## Distance Metric

Determines how similarity between vectors is calculated.

Common options:

* Cosine
* Euclidean
* Dot Product

For this project, **Cosine** distance is used because it is commonly used with embedding models.

---

# Commands Used

## createCollection()

Creates a new collection.

Purpose:

* Define vector size
* Define distance metric
* Initialize a collection

---

## getCollections()

Returns a list of all collections available in the Qdrant database.

Purpose:

* Verify connection
* View existing collections

---

## getCollection()

Returns detailed information about a specific collection.

Information includes:

* Collection name
* Vector size
* Distance metric
* Number of points
* Collection status
* Optimizer configuration

---

## deleteCollection()

Deletes an existing collection and all points stored inside it.

Use this carefully because deleting a collection removes all associated data.

---

# Questions & Answers

## 1. What is a Collection?

A Collection is a container that stores multiple points. It defines how vectors inside the collection should be stored and compared.

---

## 2. Why does it require a vector size?

The vector size defines the number of dimensions every vector must contain.

Similarity calculations require vectors of equal length, so Qdrant enforces a fixed vector size for all points in a collection.

---

## 3. Why is a distance metric mandatory?

The distance metric tells Qdrant how to measure similarity between vectors.

Without a distance metric, Qdrant would not know how to compare one vector with another during search.

---

## 4. What happens if the collection already exists?

Attempting to create a collection with an existing name results in an error because collection names must be unique within a Qdrant instance.

---

## 5. How do I inspect a collection?

A collection can be inspected by:

* Opening the Qdrant Dashboard
* Calling `getCollection()` using the Node.js SDK
* Accessing the REST API endpoint for the collection

Inspection provides details such as vector size, distance metric, point count, and collection configuration.

---

# What I Learned

* A collection is created before storing any vectors.
* A collection contains points.
* Every collection has a fixed vector dimension.
* Every collection uses a distance metric to compare vectors.
* Collection names must be unique.
* Collections can be created, listed, inspected, and deleted using the SDK.
* The Qdrant Dashboard provides a visual way to inspect collection details.

---

# Commands Used

```bash
node src/part2-createCollection.js
```

```bash
node src/part1-connect.js
```

---

# Observations

* Successfully created a new collection in Qdrant.
* Verified the collection using the Qdrant Dashboard.
* Retrieved collection details using the Node.js SDK.
* Observed that the collection initially contained zero points.
* Confirmed the configured vector size and distance metric.
* Learned that points cannot be inserted until a collection has been created.
* Verified that deleting a collection removes all data stored within it.

---

# Summary

A Collection is the foundation of data storage in Qdrant. It defines how vectors are stored and compared. Before inserting points or performing similarity search, a collection must be created with a vector size and a distance metric. Once the collection is created, it can store points, perform vector search, and support metadata filtering.
