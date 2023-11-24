
import mongoose from "mongoose"

function connect() {
    
     try {       
        mongoose.connect(process.env.MONGODB_URL!);
        const connection=mongoose.connection;

        connection.on("connected",()=>{  
            console.log("mongoDB Connected Sucessfully.");         
        })

        connection.on("error",(error)=>{  
            console.log("mongoDB Connection Error, please make sure mongodb is running "+ error );   
        })

     } catch (error) {
        console.log(error);
        console.log("mongoDB Connection Error");
     }
}

export default connect;
