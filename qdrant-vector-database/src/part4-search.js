const client = require("../config/qdrant");

async function search() {
    const results = await client.query("animals", {
        query: [0.88, 0.15, 0.32, 0.76],
        limit: 1,
        with_payload: true,
        with_vector: true
    });

    console.log(results);
}

search();