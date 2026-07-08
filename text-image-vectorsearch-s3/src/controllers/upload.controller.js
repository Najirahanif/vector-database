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



async function uploadImage(req,res){

    let s3 = null;

    try {


        const imagePath = req.file.path;


        // Generate vector
        const embedding =
            await generateImageEmbedding(imagePath);



        // Upload image
        s3 =
            await uploadFile(req.file);



        // Store vector
        const pointId =
            await storeVector({

                embedding,

                fileName:req.file.originalname,

                fileType:req.file.mimetype,

                s3Key:s3.key,

                imageUrl:s3.imageUrl

            });



        // Remove temp file
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }



        return res.status(201).json({

            success:true,

            data:{
                pointId,
                fileName:req.file.originalname,
                imageUrl:s3.imageUrl
            }

        });



    } catch(error){


        if(req.file?.path &&
           fs.existsSync(req.file.path)){

            fs.unlinkSync(req.file.path);

        }


        console.log(error);


        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}



module.exports={
    uploadImage
};