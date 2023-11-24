
// import mongoose from "mongoose"

// function connect() {
    
//      try {       
//         mongoose.connect(process.env.MONGODB_URL!);
//         const connection=mongoose.connection;

//         connection.on("connected",()=>{  
//             console.log("mongoDB Connected Sucessfully.");         
//         })

//         connection.on("error",(error)=>{  
//             console.log("mongoDB Connection Error, please make sure mongodb is running "+ error );   
//         })

//      } catch (error) {
//         console.log(error);
//         console.log("mongoDB Connection Error");
//      }
// }

// export default connect;


import mongoose from 'mongoose';

export async function connect() {
    try {
        console.log(process.env.NEXT_PUBLIC_MONGODB_URL);
        
        mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL!);
        // mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }
}
