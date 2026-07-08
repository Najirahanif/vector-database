/*
============================================================

Part 5 : Payload Filtering

Goal
----
Learn how to filter vector search results
using payload metadata.

Topics Covered
--------------
✔ Payload
✔ Match Filter
✔ Vector Search + Filter

============================================================
*/

const client = require("../config/qdrant");

async function searchWithFilter() {
    try {

        const results = await client.query("animals", {

            query: [0.88, 0.15, 0.32, 0.76],

            filter: {
                must: [
                    {
                        key: "category",
                        match: {
                            value: "Pet"
                        }
                    }
                ]
            },

            limit: 5,

            with_payload: true

        });

        console.log(JSON.stringify(results, null, 2));

    } catch (error) {

        console.error(error);

    }
}

searchWithFilter();