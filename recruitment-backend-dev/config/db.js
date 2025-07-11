import mongoose from 'mongoose'

const connectdb = async () => {
    console.log(process.env.DATABASE_URL);  // <-- fix here
    
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
          // optional options if needed
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error(err);
    }
}

export default connectdb;
