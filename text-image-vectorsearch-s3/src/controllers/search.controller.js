const {
    generateTextEmbedding
} = require("../services/embedding.service");


const {
    searchImages
} = require("../services/search.service");



async function textSearch(req,res){

    try{


        const {text}=req.body;


        if(!text){

            return res.status(400).json({

                success:false,

                message:"Text is required"

            });

        }



        const vector =
            await generateTextEmbedding(text);



        const results =
            await searchImages(vector);



        return res.json({

            success:true,

            query:text,

            results

        });



    }catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

}



module.exports={
    textSearch
};