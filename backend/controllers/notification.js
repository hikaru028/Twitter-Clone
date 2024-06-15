import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/userSchema.js';
import Notification from '../models/notificationSchema.js';
import passwordSchema from '../models/passwordSchema.js';

export const getNotifications = async (req, res) => {    
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ to: userId }).populate({
            path: 'from',
            select: 'username profileImg',
        });

        await Notification.updateMany({ to: userId }, { read: true });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error in getNotifications controller: ', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const deleteNotifications = async (req, res) => {    
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });
        res.status(200).json({ message: 'Notifications deleted successfully'});
    } catch (error) {
        console.error('Error in deleteNotifications controller: ', error.message);
        res.status(500).json({ error: error.message });
    }
};