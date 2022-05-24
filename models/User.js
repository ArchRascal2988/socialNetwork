const {Schema, model}= require('mongoose');

const validateEmail= function(email) {
    const regex= /([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
    return regex.test(email);
}

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
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        }
    }
);

userSchema.virtual("friendCount").get(function() {return this.friends.length;});

const User= model("user", userSchema);

module.exports= User;