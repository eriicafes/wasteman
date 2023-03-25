import bcrypt from 'bcrypt'
import { BcryptServiceInterface } from '@/helpers'
import { BCRYPT_ROUND } from '@/config'

  /**
     * User password service builder factory
     * @function bcryptService
     * @description user password encryption and decryption service
     * @exports BcryptServiceInterface
     */

  function bcryptService(): BcryptServiceInterface {
    /**
     * @function hashPassword
     * @param {string} password - user registration password
     * @returns {string} Returns the signed encrypted user password
     */
    const hashPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(Number(BCRYPT_ROUND));
    return bcrypt.hashSync(password, salt);
    };

    /**
     * @function comparePassword
     * @param {string} password - user registered password
     * @param {string} hash - user encrypted registration password
     * @returns {boolean} Returns boolean if the both the registration password and encrypted password matches after decrypting it
     */
    const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
    };

    return { hashPassword, comparePassword };
}

export default bcryptService();