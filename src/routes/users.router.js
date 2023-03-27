import { Router } from "express";
import UsersManager from "../dao/mongoManagers/usersManager.js";
import { generateToken } from "../utils.js";
const userRouter = Router();
const userManager = new UsersManager();

userRouter.post("/registro", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/");
  } else {
    res.redirect("/errorRegistro");
  }
});

userRouter.post('/login', async (req,res)=>{
  const user = await userManager.loginUser(req.body)
  if(user){
      const token = generateToken(user)
      res.cookie('token', token, { httpOnly: true })
      if(token){
        res.json({user})
      }else{
        res.json({message:'error authentication'})
      }
  }else{
      res.json({message:'Error token'})
  }
})

userRouter.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/");
  });
});

export default userRouter;
