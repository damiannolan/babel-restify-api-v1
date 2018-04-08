import { User } from '../model';
import { logger as log } from '../../logger';

export const getUserIdByUsername = async (username) => {
    try {
        const result = await User.findOne({ username: username }).select('userId');
        return result._doc.userId;
    } catch (e) {
        log.debug(e);
        throw new Error(`User ${username} does not exist`);
    }
};
