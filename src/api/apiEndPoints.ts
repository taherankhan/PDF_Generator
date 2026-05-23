// API END Points
import * as constants from "../utils/constants";
/**---------------Authentication------------------------------ */
export const LOGIN = "admin/login" + " " + constants.POST_RAW;
export const LOGOUT = "admin/logout" + " " + constants.POST_RAW;
export const AUTH = {
    FORGOT_PASSWORD: "admin/password/forgot" + " " + constants.POST_RAW,
    RESET_PASSWORD: "admin/password/reset" + " " + constants.POST_RAW,
    CHANGE_PASSWORD: "admin/password/change" + " " + constants.PATCH,
};