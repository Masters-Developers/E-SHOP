const express=require("express");
const { userRegistration,loginUser,logOut,forgotPassword,resetPassword,getUserProfile,
     updatePassword,updateProfile,getAllUsers,getUserDetails,updateUser,deleteUser } = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router= express.Router();
router.route('/user/registration').post(userRegistration)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route("/forgotPassword").post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile)
router.route('/myprofile/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/myprofile/updateProfile').put(isAuthenticatedUser, updateProfile)

//rutas admin
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route("/admin/deleteUser/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports= router



























module.exports= router