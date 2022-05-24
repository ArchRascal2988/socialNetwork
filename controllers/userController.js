const {Thought, User}= require('../models/index');

module.exports={
    getAll(req,res){
        User.find().then((users)=> res.json(users))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    getOne(req,res){
        User.findOne({_id:req.params.id})
        .populate('thoughts')
        .then((user)=>{
            !user ? res.status(404).json({message: "No user found with that id."})
            : res.status(200).json(user)
        }).catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    newUser(req,res){
        User.create(req.body).then((user)=> res.status(200).json(user))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    updateUser(req,res){
        User.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
            ).then((user)=>{
                !user ? res.status(404).json({message: "No user found with that id."})
                : res.status(200).json(user)
            }).catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            })
    },
    deleteUser(req,res){
        User.findOneAndDelete({_id:req.params.id}).then((user)=>{
            !user ? res.status(404).json({message: "No user found with that id."})
            : Thought.deleteMany({_id:{$in: user.thoughts}})
        }).then(()=> res.status(200).json({message: "User and associated thoughts deleted."}))
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.id},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
            ).then((user)=>{
                !user ? res.status(404).json({message: "No user found with that id."})
                : res.status(200).json(user)
            }).catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            })
    },
    removeFriend(req,res){
        User.findOneAndUpdate(
            {_id:req.params.id},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
            ).then((user)=>{
                !user ? res.status(404).json({message: "No user found with that id."})
                : res.status(200).json(user)
            }).catch((err)=>{
                console.log(err);
                return res.status(500).json(err);
            })
    }
}