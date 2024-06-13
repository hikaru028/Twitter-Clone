import User from '../models/userSchema.js';

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile: ', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow/unfollow yourself" });
        }

        if (!userToModify || !currentUser) return res.status(400).json({ error: 'User not found'});

        const isFollowing = currentUser.following.includes(id);
        console.log(isFollowing);

        if (isFollowing) {
            // Unfollow a user
            // Pull the own id from the user's "followers" list 
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            // Simultaneously Pull the user's id from the own "following" list
            await User.findByIdAndUpdate(req.user._id, { $pull: { followers: id } });
            res.status(200).json({ message: 'User unfollowing successfully' });
        } else {
            // Follow the user
            // Push the own id to the user's "followers" list 
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            // Simultaneously Push the user's id to the own "following" list
            await User.findByIdAndUpdate(req.user._id, { $push: { followers: id } });
            // Send notification to the user
            res.status(200).json({ message: 'User follow successfully' });
        }
    } catch (error) {
        console.error('Error in followUnfollowUser:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", " ", {maxAge:0})
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: 'Server error'})
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in getMe controller', error.message);
        res.status(500).json({ error: 'Server error'})
    }
};

const getPasswordErrorMessage = (validationErrors) => {
    const errorMessages = {
        min: 'Password must be at least 8 characters long.',
        max: 'Password must be at most 100 characters long.',
        uppercase: 'Password must contain at least one uppercase letter.',
        lowercase: 'Password must contain at least one lowercase letter.',
        digits: 'Password must contain at least one number.',
        spaces: 'Password should not contain spaces.',
        symbols: 'Password must contain at least one special character (e.g., !@#$%^&*).'
    };

    return validationErrors.map(error => errorMessages[error]);
};