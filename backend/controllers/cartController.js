import userModel from './../models/UserModel.js'


//Add item to user cart
const addToCart = async (req,res)=>{

    try {
        // let userData = await userModel.findOne({_id:req.body.userId})
       let userData = await userModel.findById(req.body.userId); 
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId])    
        {    //So if the user want to add product in cart with product id,
            //which is not in cart then it will add that product in cart
            cartData[req.body.itemId] = 1
        }
        else{ //if cart item is available then increase the value
           cartData[req.body.itemId] += 1;
        }

        //When the item is added in the cart, then we have to update the usercart with new user data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData}) ;

        res.json({success:true,message:"Added to Cart"});
    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error"})
    }
}



//Remove item from user cart
const removeFromCart = async (req,res)=>{

    try {
        //first find user data 
        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            //if the item is presnet then we decrease the quantity
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:"Removed from Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}

//fecth user cart data
const getCart = async (req,res)=>{
 
    try {
        let userData = await userModel.findById(req.body.userId) //that we get using the middleware
         let cartData = await userData.cartData;
         res.json({success:true,cartData})
    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error"});
    }

}
export {addToCart,removeFromCart,getCart}