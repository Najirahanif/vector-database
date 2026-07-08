# Qdrant Learning

## About

This repository contains my hands-on learning of **Qdrant**, a dedicated vector database.

The goal is to understand how a vector database works from scratch before building applications.

---

## Tech Stack

- Node.js
- Qdrant
- Docker
- Docker Compose

---

## Learning Progress

- [x] Part 1 - Installation & Setup
- [ ] Part 2 - Collections
- [ ] Part 3 - Points
- [ ] Part 4 - Vector Search
- [ ] Part 5 - Payload (Metadata)
- [ ] Part 6 - HNSW Index
- [ ] Part 7 - Storage
- [ ] Part 8 - Performance
- [ ] Part 9 - Build a Sample Application

---

## Project Structure

```
qdrant-learning/
│
├── config/
├── docs/
├── src/
├── storage/
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Getting Started

Clone the repository.

```bash
git clone <your-repository-url>
```

Install dependencies.

```bash
npm install
```

Start Qdrant.

```bash
docker compose up -d
```

Verify that Qdrant is running.

``` bash
docker logs qdrant
http://localhost:6333
```

Open the Qdrant Dashboard.

```
http://localhost:6333/dashboard
```

---

## Objective

- Learn Qdrant fundamentals.
- Understand how dedicated vector databases work.
- Explore collections, points, payloads, indexing, and search.
- Compare Qdrant with MongoDB Vector Search.
- Build vector search applications using Node.js.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** Compare with MongoDB ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

```
MongoDB                 Vector Database
----------------------------------------
Collection	            Collection
Document	            Point
Embedding Field	        Vector
Document Fields	        Payload
$vectorSearch	        Search API
Vector Index	        HNSW Index
```

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** Option 1: Global Search ⭐ (Choose this) ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Meaning:

All vectors are stored in one collection, and searches run across the entire collection.

Example:

Collection: images

Point 1 → Dog
Point 2 → Cat
Point 3 → Car
Point 4 → Bike
Point 5 → Flower

If you search with:

"Puppy"

Qdrant searches all points in the collection.

Real-world examples
Image search
Product search
Document search
Movie recommendation
Music recommendation


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** Option 2: Multitenancy ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Meaning:

One collection stores data for multiple users or organizations, but each user only searches their own data.

Example:

Collection: user_documents

User A
├── Resume
├── Notes
└── PDF

User B
├── Invoice
├── Contract
└── Report

When User A searches:

"contract"

Qdrant only searches User A's documents.

It ignores User B's data.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** 1. Simple Single Embedding ⭐ (Choose this) ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## Meaning

Each point stores one vector.

## Example:

Point 1

ID: 1

## Vector:
[0.12, 0.45, 0.89, ...]

Payload:
{
  "name": "Dog"
}

One point → One vector.

## Use cases
Image Search
Text Search
Similarity Search
Recommendation Systems

This is the simplest setup and the one you should start with.


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** 2. Simple Hybrid Search ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## Meaning

Each point stores two types of vectors:

Dense Vector → Semantic meaning (embeddings from models like CLIP, BERT, OpenAI Embeddings).
Sparse Vector → Keyword information (similar to traditional search engines).

## Example:

Point

## Dense Vector
↓

[0.23, 0.78, ...]

## Sparse Vector
↓

{
  "dog": 2,
  "pet": 1,
  "animal": 3
}

## When you search, Qdrant combines:

Semantic similarity
Keyword matching
Use cases
Search engines
Documentation search
Enterprise search
RAG applications

This is more advanced and can wait until you understand basic vector search.


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** 3. Custom ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## Meaning

You configure everything yourself.

## Examples:

Multiple vector fields
Different dimensions
Different distance metrics
Advanced indexing options

Example:

Point

Image Vector

↓

768 dimensions

Text Vector

↓

384 dimensions

Audio Vector

↓

1024 dimensions

One point can have several embeddings, each serving a different purpose.

This is useful when the same item needs multiple representations.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*** 3. POINTS ***
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

A Point is the fundamental unit of data in Qdrant.

Collection → contains → Points

Point = ID + Vector + Payload (optional)