/*
============================================================

File : config/qdrant.js

Purpose
-------
Create a reusable connection to the Qdrant server.

Why?
----
Instead of creating a new connection in every file,
we configure it once and reuse it throughout the project.

Connection Details
------------------
Host : localhost
Port : 6333 (REST API)

============================================================
*/

const { QdrantClient } = require("@qdrant/js-client-rest");

const client = new QdrantClient({
    host: "localhost",
    port: 6333,
});

module.exports = client;