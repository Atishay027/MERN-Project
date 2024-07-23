//first create a basic express server

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;


//middleware
app.use(express.json()) //whenever we get the request from frontend to backend that will pssed using json

app.use(cors()) //using this we access the backend from frontend



// db connection started 
connectDB();


//Api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))

app.use("/api/user",userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouter);



app.get("/",(req,res)=>{
    res.send("Api working")
})    //get method is a http method using that we can request the data from server and give path where we have to run this endpoint


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})

//Connection string
//mongodb+srv://atishay027:<password>@cluster0.vyhxvby.mongodb.net/?
