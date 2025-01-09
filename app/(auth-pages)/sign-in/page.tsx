"use client";
import React, { useState } from "react";
import { auth, RecaptchaVerifier } from "../../../firebase.config";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [verificationId, setVerificationId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
        }
      );
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number.");
      return;
    }
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter the OTP.");
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      setMessage(`Welcome ${userCredential.user.phoneNumber}`);
    } catch (error) {
      console.error(error);
      setMessage("Invalid OTP.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Phone Authentication</h1>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Send OTP
        </button>
      </div>
      {verificationId && (
        <div className="mt-4">
          <label htmlFor="otp" className="block text-sm font-medium">
            OTP
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      )}
      <div id="recaptcha-container"></div>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default PhoneAuth;
