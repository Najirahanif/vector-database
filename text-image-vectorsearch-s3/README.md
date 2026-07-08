# Text Image Vector Search using Node.js, CLIP, Qdrant & AWS S3

A multimodal vector search system built using **Node.js**, **CLIP embeddings**, **Qdrant Vector Database**, and **AWS S3**.

This project allows users to:

- Upload images
- Store images in AWS S3
- Generate image embeddings using CLIP
- Store vectors in Qdrant
- Perform Text → Image search
- Perform Image → Image similarity search


## Architecture


```
                    Upload Image
                         |
                         |
                    Multer Upload
                         |
                         |
                 Temporary Storage
                         |
              +----------+----------+
              |                     |
              |                     |
        CLIP Image Encoder        AWS S3
              |
              |
        Image Vector (512)
              |
              |
          Qdrant Database
              |
              |
        Vector + Metadata


Search Flow:

Text Query
    |
    |
CLIP Text Encoder
    |
    |
Text Vector (512)
    |
    |
Qdrant Similarity Search
    |
    |
Top Similar Images



Image Search:

Query Image
    |
    |
CLIP Image Encoder
    |
    |
Image Vector
    |
    |
Qdrant Similarity Search
    |
    |
Similar Images
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- JavaScript


## File Upload

- Multer


## Storage

- AWS S3


## Embedding Model

- CLIP ViT-B/32
- Hugging Face Transformers
- ONNX Runtime


## Vector Database

- Qdrant


## Containerization

- Docker


---

# Features

## 1. Image Upload

Users can upload an image.

The system:

1. Receives image using Multer
2. Generates image embedding
3. Uploads image to S3
4. Stores vector and metadata in Qdrant
5. Removes temporary local file


Stored Qdrant payload:

```json
{
  "fileName": "image.png",
  "fileType": "image/png",
  "s3Key": "image-key.png",
  "imageUrl": "s3-url",
  "uploadedAt": "timestamp"
}
```


---

# 2. Text To Image Search

Example:

Input:

```
red car on road
```

Flow:

```
Text
 |
 |
CLIP Text Encoder
 |
 |
512 Dimension Vector
 |
 |
Qdrant Search
 |
 |
Similar Images
```


Example response:

```json
{
  "success": true,
  "query": "red car on road",
  "results": [
    {
      "score": 0.92,
      "payload": {
        "fileName": "car.png",
        "imageUrl": "..."
      }
    }
  ]
}
```


---

# 3. Image To Image Search


Example:

Upload:

```
shoe.png
```


Flow:

```
Query Image

     |

CLIP Image Encoder

     |

512 Vector

     |

Qdrant Similarity Search

     |

Similar Images
```


---

# Project Structure


```
src
│
├── app.js
├── server.js
│
├── config
│   ├── aws.js
│   ├── multer.js
│   └── qdrant.js
│
├── controllers
│   ├── upload.controller.js
│   ├── search.controller.js
│   └── image-search.controller.js
│
├── routes
│   ├── upload.route.js
│   ├── search.route.js
│   └── image-search.route.js
│
├── services
│   ├── embedding.service.js
│   ├── s3.service.js
│   ├── vector.service.js
│   └── search.service.js
│
└── temp
```


---

# Installation


## Clone Repository


```bash
git clone <repository-url>

cd text-image-vectorsearch-s3
```


---

# Install Node Dependencies


```bash
npm install
```


Required packages:

```bash
npm install express cors multer dotenv

npm install @huggingface/transformers

npm install @qdrant/js-client-rest

npm install @aws-sdk/client-s3

npm install uuid
```


---

# Environment Variables


Create:

```
.env
```


Add:

```env
PORT=3000


# AWS

AWS_REGION=ap-south-1

AWS_ACCESS_KEY_ID=<your-access-key>

AWS_SECRET_ACCESS_KEY=<your-secret-key>

AWS_BUCKET_NAME=<bucket-name>



# Qdrant

QDRANT_URL=http://localhost:6333

```


---

# Run Qdrant Using Docker


Create:

```
docker-compose.yml
```


```yaml
version: "3.8"

services:

  qdrant:

    image: qdrant/qdrant

    container_name: qdrant

    ports:

      - "6333:6333"

      - "6334:6334"

    volumes:

      - ./qdrant_storage:/qdrant/storage
```


Start:

```bash
docker compose up -d
```


Qdrant Dashboard:

```
http://localhost:6333/dashboard
```


---

# Create Qdrant Collection


CLIP produces:

```
512 dimensional vectors
```


Collection:

```javascript
await qdrantClient.createCollection(
"multimedia_embeddings",
{
 vectors:{
    size:512,
    distance:"Cosine"
 }
}
)
```


---

# Run Application


Development:

```bash
npm run dev
```


or


```bash
node src/server.js
```


---

# API Endpoints


## Upload Image


```
POST /api/upload
```


Request:

```
multipart/form-data
```


Field:

```
file=image
```


Example:

```bash
curl \
--location \
'http://localhost:3000/api/upload' \
--form 'file=@image.png'
```


---

# Text Search


Endpoint:

```
POST /api/search/text
```


Request:


```json
{
 "text":"a dog playing"
}
```


Curl:

```bash
curl --location \
'http://localhost:3000/api/search/text' \
--header 'Content-Type: application/json' \
--data '
{
"text":"a dog playing"
}'
```


---

# Image Search


Endpoint:

```
POST /api/search/image
```


Curl:

```bash
curl --location \
'http://localhost:3000/api/search/image' \
--form 'file=@query.png'
```


---

# Vector Database Design


Collection:

```
multimedia_embeddings
```


Vector:

```
512 dimensions
```


Distance:

```
Cosine Similarity
```


Example Point:


```json
{
"id":"uuid",

"vector":[
0.12,
0.45
],

"payload":{

"fileName":"cat.png",

"fileType":"image/png",

"s3Key":"cat.png",

"imageUrl":"s3-url",

"uploadedAt":"date"

}

}
```


---

# Future Improvements


## Video Search

Add:

- Video frame extraction
- CLIP embeddings per frame
- Store video metadata


## Hybrid Search

Combine:

- Keyword search
- Vector search


## Production Improvements

- Generate signed S3 URLs dynamically
- Add authentication
- Add pagination
- Add vector filtering
- Add batch indexing
- Add background workers


---

# Learning Outcome

This project demonstrates:

- Vector database architecture
- Multimodal embeddings
- Similarity search
- AWS object storage integration
- Semantic search systems
- AI-powered retrieval pipelines



```bash 
## curl to upload the file 
```bash
curl --location 'http://localhost:3000/api/upload' \
--form 'file=@"/Users/najirabanum/Downloads/zebra.jpeg"'



## curl to search text-> image 
```bash
curl --location 'http://localhost:3000/api/search/text' \
--header 'Content-Type: application/json' \
--data '{
    "text": "panda"
}'



## curl to search image-> image
```bash
curl --location 'http://localhost:3000/api/search/image' \
--form 'file=@"/Users/najirabanum/Downloads/cat.jpg"'

```

