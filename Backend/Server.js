import app from "./App.js"
import connectionToDB from "./config/dbConnection.js";


const PORT=process.env.PORT||5000;

app.listen(PORT,async ()=>{
    await connectionToDB();
   console.log(`server is running on port:${PORT}`)
})