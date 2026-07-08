const client = require("../config/qdrant");

async function getPoints() {

    try {

        const result = await client.retrieve("animals", {
            ids: [1, 2, 3]
        });

        console.log(result);

    } catch (error) {

        console.error(error);

    }

}

getPoints();