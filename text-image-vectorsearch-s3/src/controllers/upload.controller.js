const fs = require("fs");
const {
  generateImageEmbedding
} = require("../services/embedding.service");

const {
  uploadFile
} = require("../services/s3.service");

const {
  storeVector
} = require("../services/vector.service");

async function uploadImage(req, res) {
  let s3 = null;

  try {
    const imagePath = req.file.path;

    // Generate vector
    const embedding = await generateImageEmbedding(imagePath);

    // Upload image to S3
    s3 = await uploadFile(req.file);

    // Prepare common data
    const vectorData = {
      embedding,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      s3Key: s3.key,
      imageUrl: s3.imageUrl,
    };

    // ✅ Store in ALL THREE collections
    const pointId = await storeVector({
      collectionName: "image_embeddings",
      ...vectorData,
    });

    // ✅ Store in scalar collection
    await storeVector({
      collectionName: "image_embeddings_scalar",
      ...vectorData,
    });

    // ✅ Store in binary collection
    await storeVector({
      collectionName: "image_embeddings_binary",
      ...vectorData,
    });

    // Remove temp file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return res.status(201).json({
      success: true,
      data: {
        pointId,
        fileName: req.file.originalname,
        imageUrl: s3.imageUrl,
      },
    });

  } catch (error) {
    // Clean up temp file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  uploadImage,
};