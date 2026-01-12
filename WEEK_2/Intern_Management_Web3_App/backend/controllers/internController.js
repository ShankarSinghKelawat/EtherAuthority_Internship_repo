const Intern = require("../models/Intern");
const { ethers } = require("ethers");

// Register Intern
const registerIntern = async (req, res) => {
  try {
    const {
      name,
      internId,
      email,
      wallet,
      highestEducation,
      background
    } = req.body;

    // Basic validation
    if (!name || !internId || !email || !wallet || !background) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const intern = new Intern({
      name,
      internId,
      email,
      wallet,
      highestEducation,
      background
    });

    await intern.save();

    return res.status(201).json({
      message: "Intern created successfully",
      intern
    });

  } catch (error) {
  console.error("REGISTER ERROR:", error);

  // Duplicate key error
  if (error.code === 11000) {
    return res.status(409).json({
      message: "Intern already registered"
    });
  }

  return res.status(500).json({
    message: error.message
  });
  }

};

// Get intern by internId
const getInternById = async (req, res) => {
  try {
    const { internId } = req.params;

    // Find intern using internId
    const intern = await Intern.findOne({ internId });

    if (!intern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    return res.status(200).json({
      intern
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Update intern details by internId
const updateInternById = async (req, res) => {
  try {
    const { internId } = req.params;
    const { highestEducation, background } = req.body;

    // Ensure at least one field is provided
    if (!highestEducation && !background) {
      return res.status(400).json({
        message: "Nothing to update"
      });
    }

    // Find intern and update allowed fields
    const updatedIntern = await Intern.findOneAndUpdate(
      { internId },
      {
        ...(highestEducation && { highestEducation }),
        ...(background && { background })
      },
      { new: true }
    );

    if (!updatedIntern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    return res.status(200).json({
      message: "Intern updated successfully",
      intern: updatedIntern
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get all interns (Admin)
const getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find().sort({
      registrationDetails: -1
    });

    return res.status(200).json({
      count: interns.length,
      interns
    });

  } catch (error) {
    console.error("GET ALL INTERNS ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const adminUpdateIntern = async (req, res) => {
  try {
    const { internId } = req.params;

    const updatedIntern = await Intern.findOneAndUpdate(
      { internId },
      req.body, // ⚠ admin can update ANY field
      { new: true, runValidators: true }
    );

    if (!updatedIntern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    res.json({
      message: "Intern updated by admin",
      intern: updatedIntern
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Delete intern by internId
const deleteInternById = async (req, res) => {
  try {
    const { internId } = req.params;

    const deletedIntern = await Intern.findOneAndDelete({ internId });

    if (!deletedIntern) {
      return res.status(404).json({
        message: "Intern not found"
      });
    }

    return res.status(200).json({
      message: "Intern deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Wallet login
const walletLogin = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    let { wallet, message, signature } = req.body;

    wallet = wallet.toLowerCase();

    const recoveredAddress = ethers.verifyMessage(message, signature);

    console.log("Recovered:", recoveredAddress);

    const intern = await Intern.findOne({ wallet });

    console.log("Intern found:", intern);

    if (!intern) {
      return res.status(401).json({ message: "Not registered" });
    }

    res.json({ message: "Login successful", intern });

  } catch (err) {
    console.error("LOGIN CRASH:", err);
    res.status(500).json({ message: err.message });
  }
};





module.exports = { registerIntern,
                   getInternById, 
                   updateInternById, 
                   deleteInternById, 
                   walletLogin,
                   getAllInterns,
                   adminUpdateIntern };
