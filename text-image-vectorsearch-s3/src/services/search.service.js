const qdrantClient = require("../config/qdrant");


const COLLECTION_NAME = "image_embeddings";


async function searchImages(vector) {

  const result = await qdrantClient.search(
    COLLECTION_NAME,
    {
      vector,
      limit: 2,
      with_payload: true,
    }
  );


  return result;
}


module.exports = {
  searchImages,
};