
const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

//************************************* */  Admin Dashboard  routes**********************//

router.get('/adminRoute',adminController.adminPage );


router.get('/viewUser/:id',adminController.viewUser );

router.get('/editUser/:id',adminController.editUser );

router.put('/editUser/:id', adminController.editUser_post);



// //************************************* */ All Widthdrawals  routes**********************//

router.get('/allWidthdrawal',adminController.allWidthdrawal );

router.get('/viewWidthdrawals/:id',adminController.viewWidthdrawal );

router.get('/editWidthdrawals/:id',adminController.editWidthdrawal );
router.put('/editWidthdrawals/:id',adminController.editWidthdrawal_post );

// //************************************* */ All Verification routes**********************//
router.get('/allVerify',adminController.allVerification );
router.get('/viewVerify/:id',adminController.viewVerify);



// //************************************* */ All Delete routes**********************//
router.delete('/deleteUser/:id',adminController.deletePage);
router.delete('/deleteWidthdrawal/:id', adminController.deleteWidthdraw)
router.delete('/deleteVerification/:id', adminController.deleteVerification)



module.exports = router;
