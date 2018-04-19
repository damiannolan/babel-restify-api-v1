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

/*
*   Could possibly consolidate these functions into one function with a parameter for specifying 
*   which exact score you want updated. But at the moment it can stay as is.
*/
export const updateAdditionScore = async (username, score) => {
    return await User.update({ username: username }, {
        additionScore: score
    });
};

export const updateSubtractionScore = async (username, score) => {
    return await User.update({ username: username }, {
        subtractionScore: score
    });
};

export const updateMultiplicationScore = async (username, score) => {
    return await User.update({ username: username }, {
        multiplicationScore: score
    });
};
