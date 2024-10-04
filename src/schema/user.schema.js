import Joi from "joi";

 const userRegistrationSchema = {
   body:Joi.object({
    username:Joi.string().min(3).required(),
    fullname:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
   })
} 

const userLoginSchema = {
    body:Joi.object({
        username:Joi.string().min(3),
        email:Joi.string().email(),
        password:Joi.string().min(8).required()
    }).xor('username','email').messages({"message" : "Please provide either username or email"})
}
 
const userSchema = {userRegistrationSchema,userLoginSchema}

export default userSchema