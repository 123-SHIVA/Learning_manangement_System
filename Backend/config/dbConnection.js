import mongoose from "mongoose";

mongoose.set("strictQuery",false);

const connectionToDB=async()=>{
      try {
        const {connection}=await mongoose.connect(
            process.env.MONGO_URL || "mongodb://127.0.0.1:27017/LMS"
        )
        // ek baat puchu isme to  direct me LMS ke andar ja rahe hai use create bhi krna padta hai na syad ya nhi ta ha
        if(connection){
            console.log('------------------',connection);
            console.log(`connected to mongoDB:${connection.host}`)
        }
      } catch (e) {
        console.log(e);
        process.exit(1)
        //thank you hata diji itti si chijh me time laga rahe the 
      }
}


export default connectionToDB;