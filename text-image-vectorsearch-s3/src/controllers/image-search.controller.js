const fs = require("fs");
const {
  generateImageEmbedding
} = require("../services/embedding.service");
const {
  searchImages
} = require("../services/search.service");

async function imageSearch(req, res) {
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Image is required"
            });
        }
        // Image -> Vector
        const vector =
            await generateImageEmbedding(
                req.file.path
            );
        // Vector -> Qdrant
        const results =
            await searchImages(vector);
        // Remove temporary image
        if(fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }
        return res.json({
            success:true,
            results
        });
    } catch(error){
        console.log(error);
        if(req.file?.path &&
           fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}



module.exports = {
    imageSearch
};