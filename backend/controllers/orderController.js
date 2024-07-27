import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req,res)=>{

    const frontend_url = "https://mern-project-frontend-9gvh.onrender.com";  //update port number according to localhost

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,  //we will get from Middleware, it decode the token and generate the userId
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();

        //When the user will placed the order after that we have to clear the userCart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
 
        //Create a payment link using the stripe 
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: 'inr',
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: 'inr',
                product_data:{
                    name: 'Delivery Charges'
                },
                unit_amount: 20 * 100 * 80
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false,error:"error"});
    }


}

//verify the order payment
const verifyOrder = async (req,res)=>{

    const {orderId,success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}

//users order for frontend
const userOrders = async(req,res)=>{

    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

//Listing orders for admin panel
const listOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"});
  }
}


//updating the status of food order status
const updateStatus = async (req,res)=>{
try {
     await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
     res.json({success:true,message:"Status Updated"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"});
}
}
 
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};
