import userModel from "./../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {

    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Doesn't Exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Password is Incorrect"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
    }

};


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    //check if user already exist
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    //checking password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    //Hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });


    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
};

export { loginUser, registerUser };
