/*
============================================================

Part 2 : Collections

Goal
----
Learn how to create and manage collections.

Topics
------
✔ Create Collection
✔ List Collections
✔ Get Collection Info

============================================================
*/

const client = require("../config/qdrant");

async function createCollection() {

    try {

        await client.createCollection("animals", {
            vectors: {
                size: 4,
                distance: "Cosine"
            }
        });

        console.log("Collection created successfully.");

        const collections = await client.getCollections();
        console.log(collections);

    } catch (error) {

        console.error(error);

    }

}

createCollection();