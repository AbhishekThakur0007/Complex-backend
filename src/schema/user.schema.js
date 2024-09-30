import Joi from "joi";

 const userRegistrationSchema = {
   body:Joi.object({
    username:Joi.string().min(3).required(),
    fullname:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required()
   })
} 
 
const userSchema = {userRegistrationSchema}

export default userSchema