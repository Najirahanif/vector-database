const client = require("../config/qdrant");

async function deletePoint() {

    try {

        await client.delete("animals", {
            wait: true,
            points: [3]
        });
        console.log("Point deleted.");

    } catch (error) {

        console.error(error);

    }

}

deletePoint();