const router = require("express").Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("../controllers/tokenController");
const postController = require("../controllers/postController");

// todo: /!\ Add verifyTokenAndAuth middlewares
router.get("/:id", postController.findOne_GET);                  // GET A POST
router.post("/", postController.create_POST);                    // CREATE A POST
router.put("/:id", postController.update_PUT);                   // UPDATE A POST
router.delete("/:id", postController.delete_DELETE)              // DELETE A POST
router.put("/:id/like", postController.like_PUT);                // LIKE OR UNLIKE A POST
router.get("/profile/:username", postController.findByUser_GET); // GET A USER'S POSTS (all posts from a user)
router.get("/timeline/:userId", postController.timeline_GET);    // GET TIMELINE POSTS (user's posts + followings' posts)
router.get("/:id/comments", postController.findComments_GET);    // GET A POST'S COMMENTS

module.exports = router;