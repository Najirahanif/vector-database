// command to run 
//node src/part2-deleteCollection.js 

const client = require("../config/qdrant");

async function deleteCollection() {

    await client.deleteCollection("animalss");

    console.log("Collection deleted.");

}

deleteCollection();