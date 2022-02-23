
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const Comment = require("../models/Comment");

// * GET CHARTS *
module.exports.charts_GET = async (req, res) => {
    // Query strings :
    const postId = req.query.postId;        // .../comments?postId=61f1115d86f7e859e1e2f2c7
    const commentId = req.query.commentId;  // .../comments?commentId=61f1115d86f7e859e1e2f2c7

    try {
        const comments = postId ?
        await Comment.find({ postId: postId }) // Je fetch les comments par leur postId
        :
        await Comment.find({ commentId : commentId }) // Je fetch les subcomments par leur commentId
        
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * LIKE OR UNLIKE A COMMENT *
module.exports.like_PUT = async (req, res) => {
    try {
        // Je cherche un comment correspondant à l'id ET avec un like du user :
        let comment = await Comment.findOne({$and: [ { _id: req.params.id }, { "likes.userId": req.body.userId } ] } )
        // Si un post a bien été trouvé, je retire le like du user :
        if(comment) {
            await comment.updateOne({ $pull: { likes : { userId: req.body.userId } } });
            res.status(200).json("The comment has been unliked successfully.");
        // Si aucun comment n'a été trouvé, je cherche le comment en fonction de son id et ajoute un like du user :
        } else {
            comment = await Comment.findById(req.params.id);
            await comment.updateOne({ $push: { likes : { userId: req.body.userId } } });
            res.status(200).json("The comment has been liked successfully.")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


// todo: UPDATE A COMMENT
module.exports.update_PUT = async (req, res) => {}

// todo: DELETE A COMMENT
module.exports.delete_DELETE = async (req, res) => {}