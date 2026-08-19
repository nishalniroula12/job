import cloudinary from "../config/cloudinary.js"

export const cloudinaryupload =(buffer,foldername)=>{
    console.log(cloudinary)

    return new Promise( (resolve ,reject)=>{
        const stream =cloudinary.uploader.upload_stream ({
            folder:`job/${foldername}`,
        },
        (error ,result)=>{
            console.log(result);
            
            if(error)return reject(error)
                resolve(result)
        }
    )
    console.log(stream);
    
    stream.end(buffer)
    })

}