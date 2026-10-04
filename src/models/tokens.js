import mongoose from "mongoose";


const TokenSchema = new mongoose.Schema({
  currentToken: { type: String },
  isFirstPhaseCompleted: { type: Boolean, default: true },
  isPhotoUploaded: { type: Boolean, default: false },
  isProfileFullyUpdated: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  
  // Fields needed for the email OTP validation steps
  tempOtp: { type: String, default: null },
  otpExpiresAt: { type: Date, default: null },
  
  updatedAt: { type: Date, default: Date.now },
});

const dbToken = mongoose.models.dbToken || mongoose.model("dbToken", TokenSchema);


export default dbToken;
