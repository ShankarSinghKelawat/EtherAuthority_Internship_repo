const express = require("express");
const router = express.Router();

const { registerIntern, 
        getInternById, 
        updateInternById, 
        deleteInternById,
        walletLogin,
        getAllInterns,
        adminUpdateIntern } = require("../controllers/internController");

// API to get all intern data
router.get("/all", getAllInterns);
// POST API to register intern
router.post("/register", registerIntern);
// WALLET BASED login 
router.post("/login", walletLogin);
// GET API to get specific intern by id
router.get("/:internId", getInternById);
// PUT API to update specific intern by id
router.put("/:internId", updateInternById);
// ADMIN API to update intern data
router.put("/admin/:internId", adminUpdateIntern);
// DELETE API to delete an intern by id
router.delete("/:internId", deleteInternById);




module.exports = router;
