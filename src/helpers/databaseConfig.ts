import mongoose from "mongoose";


export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully1!");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running." + error);
            throw new Error(error);
        });

    } catch (error) {
        console.log("Something went wrong!" + error);
    }
}