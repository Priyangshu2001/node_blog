var  mongoose=require('mongoose')
var PostSchema=new mongoose.Schema({
    subject:String,
    message:String
})
const Post=mongoose.model('Post',PostSchema)
module.exports=Post