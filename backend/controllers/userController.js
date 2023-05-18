const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json({ users });
    } catch (error) {
        res.status(404);
        res.send(error);
    };
};

exports.getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userService.getOne(userId);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404);
        res.send(error);
    };

};

exports.registerUser = async (req, res) => {
    const data = req.body;

    try {
        let { token, createdUser } = await userService.register(data);
        res.cookie('user', token, { httpOnly: true });
        res.status(200)
            .json({ token, _id: createdUser._id, email: createdUser.email, fullName: createdUser.fullName, profileImg: createdUser.profileImg, friends: createdUser.friends, profileCoverImg: createdUser.profileCoverImg });
    } catch (error) {
        res.status(400);
        res.send(error);
    };
};

exports.loginUser = async (req, res) => {
    const data = req.body;

    try {
        let { token, user } = await userService.login(data);
        res.cookie('user', token, { httpOnly: true });
        res.status(200)
            .json({ token, _id: user._id, email: user.email, fullName: user.fullName, profileImg: user.profileImg, friends: user.friends, profileCoverImg: user.profileCoverImg });
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};

exports.addFriend = async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    try {
        let friendRequest = await userService.addFriend(userId, friendId);
        res.status(200).json({ friendRequest });
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};