import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is COnnected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParse: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log("MonoDB Connected");
    } catch (error) {
        console.log(error);
    }
}