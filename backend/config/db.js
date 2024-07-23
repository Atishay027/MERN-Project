import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://atishay027:atishayjain220@cluster0.vyhxvby.mongodb.net/FoodDeliveryProject').then(()=>console.log("DB Connected"));
}