import { registerUser,loginUser,getUserById } from "./users.service.js";

export const registerusercontroller=async(req,res,next)=>{
    try {
        const { email, password, role } = req.body;
        console.log("Controller Received:", { email, password, role }); // Debugging log
        const user = await registerUser( email, password, role);

        res.status(201).json({message:'User registered successfully',user});
    }
    catch(error){
        next(error);
    }

}
export const loginusercontroller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      accessToken,
    });

  } catch (error) {
    next(error);
  }
};

export const getUserByIdcontroller=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const user=await getUserById(id);
        res.status(200).json({user});
    }
    catch(error){
        next(error);
    }
}