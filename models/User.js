const {Schema, model}= require('mongoose');
const Thought= require("./Thought");

const userSchema= new Schema(
    {
        username:{
            type: String,
            unique:true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique:true,
            validate:{
                validator: (email)=>{
                    return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(email);
                }
            }
        },

        thoughts: [Thought],

        friends: [this],
    }
);

const User= model("user", userSchema);

module.exports= User;