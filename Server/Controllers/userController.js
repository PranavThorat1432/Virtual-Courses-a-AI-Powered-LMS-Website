import uploadOnCloudinary from "../Config/cloudinary.js";
import User from "../Models/UserModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password').populate('enrolledCourses');
        if(!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: `Get-Current-User Error: ${error}`
        });
    }
}; 


export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, description } = req.body;
        
        // Find the user first
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        // Update fields if they exist in the request
        if (name) user.name = name;
        if (description !== undefined) user.description = description;
        
        // Handle file upload if present
        if (req.file) {
            const photoUrl = await uploadOnCloudinary(req.file.path);
            if (photoUrl) {
                user.photoUrl = photoUrl.secure_url || photoUrl.url;
            }
        }

        // Save the updated user
        const updatedUser = await user.save();
        
        // Remove sensitive data before sending response
        const { password, ...userWithoutPassword } = updatedUser._doc;

        return res.status(200).json({
            user: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({
            message: `Update-Profile Error: ${error}`
        });
    }
}