const {Schema, model}= require('mongoose');
const Reaction= require("./Reaction");

const thoughtSchema= new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            max: 280,
            min: 1
        },
        username:{
            type: String,
            required: true,
            ref:"User"
        },
        createdAt:{
            type: Date,
            default: Date.now()
        },
        reactions: [Reaction]
    },
    {
        toJSON:{
            getters:true
        }
    }
);

const Thought= model("thought", thoughtSchema);

module.exports= Thought;