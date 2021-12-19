const User = require("../models/User");

// * GET A USER *
module.exports.findOne_GET = async (req, res) => {
    // Query strings :
    const userId = req.query.userId; // .../users?userId=616ef78085e9a2...
    const username = req.query.username; // .../users?username="John"
    try {
        const user = userId ?
            await User.findById(userId) // Je fetch le user soit par son ID...
            :
            await User.findOne({ username: username }); // ...soit par son username.

        !user && res.status(404).json("No user was found."); // Si la requête ne renvoit aucun utilisateur
        const { password, updatedAt, ...rest } = user._doc; // On ne récupère pas le mot de passe ou la date de mise à jour
        res.status(200).json(rest);
    } catch (err) {
        res.status(500).json(err);
    }
}

// * GET ALL USERS *
module.exports.findAll_GET = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

// * UPDATE A USER *
module.exports.update_PUT = async (req, res) => {
    // Si l'utilisateur veut modifier son mot de passe :
    /* if (req.body.password) {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        } catch (err) {
            return res.status(500).json(err);
        }
    } */
    // Sinon, on modifie les autres champs :
    /* try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json(err);
    } */
    console.log(req.body);

    let userID = req.body.userId;
    let userName = req.body.username;
    let userAvatar = req.body.avatar;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    if (userAvatar) {
        
        console.log("oui");

    }

    if (userPassword) {
        
        console.log("oui!");

    }

    try {

        if (userName === "" || userName === undefined) throw "UserName ne peut pas être vide!";

        //if (userEmail === "" || userEmail === undefined) throw "L'email ne peut pas être vide!";
        
        const updateUser = await User.findByIdAndUpdate(userID, {

            $set: {

                username: userName,
                //email: userEmail,

             }

        }, {new: true});

        res.status(200).json(updateUser);

    } catch (error) {
        
        return res.status(500).json(error);

    }

}

// * DELETE A USER *
module.exports.delete_DELETE = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Account has been deleted successfully.")
    } catch(err) {
        res.status(500).json(err)
    }
}

// * FOLLOW OR UNFOLLOW A USER *
module.exports.follow_PUT = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // On récupère l'utilisateur à suivre et l'utilisateur loggé :
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            // Si l'utilisateur à suivre n'est pas déjà suivi par l'utilisateur loggé :
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("User has been followed successfully.");
            } else {
                // Si l'utilisateur à suivre est déjà suivi par l'utilisateur loggé, on le unfollow :
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User has been unfollowed successfully.");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Users cannot follow themselves.")
    }
}

// * GET FOLLOWINGS LIST *
module.exports.findFollowings_GET = async (req, res) => {
    try {
        // Utilisateur dont on cherche les amis :
        const user = await User.findById(req.params.userId);
        // Amis de l'utilisateur :
        const friends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        );
        // On ne garde que l'ID, l'avatar et le nom :
        let friendList = [];
        friends.map(friend => {
            const { _id, username, avatar } = friend;
            friendList.push( { _id, username, avatar } )
        });
        res.status(200).json(friendList);
        
    } catch (err) {
        res.status(500).json(err);
    }
}