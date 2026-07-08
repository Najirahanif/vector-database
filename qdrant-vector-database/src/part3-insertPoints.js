/*
============================================================

Part 3 : Points

Goal
----
Learn how to insert points into a collection.

A Point consists of:
✔ ID
✔ Vector
✔ Payload

============================================================
*/

const client = require("../config/qdrant");

async function insertPoints() {

    try {

        await client.upsert("animals", {
            wait: true,
            points: [

                {
                    id: 1,
                    vector: [0.9, 0.1, 0.3, 0.8],
                    payload: {
                        name: "Dog",
                        category: "Pet"
                    }
                },

                {
                    id: 2,
                    vector: [0.8, 0.2, 0.4, 0.7],
                    payload: {
                        name: "Cat",
                        category: "Pet"
                    }
                },

                {
                    id: 3,
                    vector: [0.1, 0.9, 0.8, 0.2],
                    payload: {
                        name: "Tiger",
                        category: "Wild"
                    }
                }

            ]
        });

        console.log("Points inserted successfully.");

    } catch (error) {

        console.error(error);

    }

}

insertPoints();