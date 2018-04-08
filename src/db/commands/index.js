import { User } from '../model';

export const createUser = async (userId, username, persistedFaceId) => {
    try {
        const user = new User({
            userId: userId,
            username: username,
            persistedFaceId: persistedFaceId
        });

        return await user.save();
    } catch (e) {
        throw new Error(`Failed to create user: ${username} -> already existed`, e);
    }   
};
