const {Thought, User}= require("../models/index");

module.exports={
    getAll(req,res){
        Thought.find().then((thoughts)=> res.json(thoughts))
        .catch((err)=> res.status(500).json(err));
    },
    getOne(req,res){
        Thought.findOne({_id:req.params.id})
        .populate('reactions')
        .then((thought)=>{
            !thought ? res.status(404).json({message: "No thought found with that id."})
            : res.status(200).json(thought)
        }).catch((err)=> res.status(500).json(err));
    },
    newThought(req,res){
        Thought.create(req.body).then((thought)=>{
            !thought ? res.status(400).json({message: "Something went wrong :("})
            : User.findOneAndUpdate(
                {username: thought.username},
                {$addToSet: {thoughts: thought._id}},
                ).then((user)=>{
                    !user ? res.status(400).json({message: "Something went wrong :("})
                    :res.status(200).json({message: "Thought created and associated user thoughts updated."})
                }).catch((err)=> res.status(500).json(err));
        }).catch((err)=>res.status(500).json(err));
    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
            ).then((thought)=>{
                !thought ? res.status(404).json({message: "No thought found with that id."})
                : res.status(200).json(thought)
            }).catch((err)=> res.status(500).json(err));
    },
    deleteThought(req,res){
        Thought.findOneAndDelete({_id:req.params.id}).then((thought)=>{
            !thought ? res.status(404).json({message: "No thought found with that id."})
            : User.findOneAndUpdate(
                {username: thought.username},
                {$pull: {thoughts:{thoughtId: thought._id}}},
                ).then((user)=>{
                    !user ? res.status(400).json({message: "Something went wrong :("})
                    :res.status(200).json({message: "Thought deleted and associated user thoughts updated."})
                }).catch((err)=> res.status(500).json(err));
        }).then(()=> res.status(200).json({message: "User and associated thoughts deleted."}))
        .catch((err)=> res.status(500).json(err));
    },
    addReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.id},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
            ).then((thought)=>{
                !thought ? res.status(404).json({message: "No thought found with that id."})
                : res.status(200).json(thought)
            }).catch((err)=> res.status(500).json(err));
    },
    removeReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.id},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
            ).then((thought)=>{
                !thought ? res.status(404).json({message: "No user found with that id."})
                : res.status(200).json(thought)
            }).catch((err)=> res.status(500).json(err));
    }
}