const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secret = 'hdasuidhasuia';
const saltRounds = 10;

const jwtSign = promisify(jwt.sign);

exports.getAll = () => User.find();

exports.getOne = (userId) => User.findById(userId);

exports.register = async ({ fullName, email, password, profileImg, profileCoverImg }) => {
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = await User.create({
        fullName,
        email,
        profileImg,
        profileCoverImg,
        password: hashedPassword
    })

    let token = await jwtSign({_id: createdUser._id, fullName: createdUser.fullName}, secret, { expiresIn: "3d"});

    return { token, createdUser };
};

exports.login = async ({email, password}) => {
    const user = await User.findOne({email});

    if(!user){
        throw { message: 'Cannot find email or password.'};
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw { message: 'Cannot find email or password.'};
    }

    let token = await jwtSign({_id: user._id, email: user.email}, secret, {expiresIn: '3d'});

    return { token, user };
};

exports.addFriend = async (userId, friendId) =>{
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    user.friends.push(friendId);
    friend.friends.push(userId);

    user.save();
    friend.save();
};