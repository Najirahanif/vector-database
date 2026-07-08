/*
============================================================

Part 1 : Connect to Qdrant

Goal
----
Verify that the Node.js application can communicate
with the running Qdrant server.

How?
----
Request the list of all collections from Qdrant.

Expected Result
---------------
If the connection is successful,
Qdrant returns all available collections.

============================================================
*/

const client = require("../config/qdrant");

async function connectToQdrant() {

    try {

        console.log("Connecting to Qdrant...\n");
        const collections = await client.getCollections();
        console.log("Connected Successfully!\n");
        console.log("Available Collections:");
        console.log(collections);

    } catch (error) {

        console.error("Connection Failed");
        console.error(error);

    }

}

connectToQdrant();