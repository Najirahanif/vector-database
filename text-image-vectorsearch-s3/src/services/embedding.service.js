const {
  pipeline,
  env,
  AutoTokenizer,
  CLIPTextModelWithProjection,
} = require("@huggingface/transformers");

env.allowLocalModels = true;
// Cache models
let imageExtractor = null;

let tokenizer = null;
let textModel = null;
// -----------------------------
// IMAGE MODEL
// -----------------------------

async function loadImageModel() {
  if (!imageExtractor) {

    console.log("Loading CLIP image model...");

    imageExtractor = await pipeline(
      "image-feature-extraction",
      "Xenova/clip-vit-base-patch32"
    );

    console.log("CLIP image model loaded");
  }


  return imageExtractor;
}



// -----------------------------
// TEXT MODEL
// -----------------------------

async function loadTextModel() {

  if (!tokenizer) {

    console.log("Loading CLIP text model...");
    tokenizer = await AutoTokenizer.from_pretrained(
      "Xenova/clip-vit-base-patch32"
    );
    textModel =
      await CLIPTextModelWithProjection.from_pretrained(
        "Xenova/clip-vit-base-patch32"
      );
    console.log("CLIP text model loaded");
  }

}



// -----------------------------
// IMAGE -> VECTOR
// -----------------------------

async function generateImageEmbedding(imagePath) {

  const model =
    await loadImageModel();
  const output =
    await model(imagePath, {

      pooling: "mean",

      normalize: true,

    });
  const vector =
    Array.from(output.data);
  console.log(
    "Image vector dimension:",
    vector.length
  );
  return vector;
}



// -----------------------------
// TEXT -> VECTOR
// -----------------------------

async function generateTextEmbedding(text) {


  await loadTextModel();
  const inputs =
    await tokenizer(
      text,
      {
        padding: true,
        truncation: true,
      }
    );
  const output =
    await textModel(inputs);
  const embedding =
    Array.from(
      output.text_embeds.data
    );
  // Normalize vector
  const magnitude =
    Math.sqrt(
      embedding.reduce(
        (sum, value) =>
          sum + value * value,
        0
      )
    );
  const normalizedVector =
    embedding.map(
      value => value / magnitude
    );
  console.log(
    "Text vector dimension:",
    normalizedVector.length
  );
  return normalizedVector;
}



module.exports = {
  generateImageEmbedding,
  generateTextEmbedding,
};