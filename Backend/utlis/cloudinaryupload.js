import cloudinary from "../config/cloudinary.js"

export const cloudinaryupload =(buffer,foldername)=>{
    return new Promise( (resolve ,reject)=>{
        const stream =cloudinary.uploader.upload_stream ({
            folder:`job/${foldername}`,
        },
        (error ,result)=>{
            if(error)return reject(error)
                resolve(result)
        }
    )
    stream.end(buffer)
    })

}