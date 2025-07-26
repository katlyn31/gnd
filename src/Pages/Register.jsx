import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader";
import { IoMdAddCircle } from "react-icons/io";
import MtnLogo from "../assets/mtn.svg";
import AirtelLogo from "../assets/Airtel_logo.png";
import { RouteList } from "../util/RouteList";

export default function Register() {
  const [buttonText, setButtonText] = useState('Copy');
  const [showInvite, setShowInvite]= useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("Connecting to secure server..");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    subscriptionfee: "",
    tokens: [""],
    carrier: "",
  });
  const [errors, setErrors] = useState({});

  const messages = [
    "Connecting to secure server..",
    "Connecting to secure server...",
    "Connecting to secure server",
    "Connecting to secure server..",
    "Checking available payment methods...",
    " Searching... Paypal",
    "Searching...Stripe",
    "Searching...Bank Transfer",
    "Searching...Bitcoin",
    "Checking for available method.",
    "Checking for available method..",
    "Checking for available method...",
    "Checking for available method.",
    "Checking for available method..",
    "Checking for available method...",
    "Payment method found...",
  ];

  useEffect(() => {
    if (modalOpen && !showTokenInput) {
      let index = 0;
      const interval = setInterval(() => {
        setModalText(messages[index]);
        index++;
        if (index === messages.length) {
          clearInterval(interval);
          setShowTokenInput(true);
          setLoading(false);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [modalOpen, showTokenInput]);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RouteList.siteAddress);
      setButtonText('Copied');
      setTimeout(() => setButtonText('Copy'), 2000); // Revert to "Copy" after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.subscriptionfee)
      newErrors.subscriptionfee = "Please select a subscription plan";
    return newErrors;
  };

  const validateModalForm = () => {
    const newErrors = {};
    if (!formData.carrier)
      newErrors.carrier = "Please select a Network Carrier";
    if (formData.tokens.every((t) => t.trim() === ""))
      newErrors.token = "At least one valid token is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setModalOpen(true);
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateModalForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          subscriptionfee: formData.subscriptionfee,
          token: formData.tokens.filter((t) => t.trim() !== ""),
          carrier: formData.carrier,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setErrors({ token: result.message || "Invalid token" });
        return;
      }

      alert(
        "Registration successful! Token will be validated and login detail will be sent shortly."
      );
      setModalOpen(false);
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        subscriptionfee: "",
        tokens: [""],
        carrier: "",
      });
    } catch (error) {
      setErrors({ token: "An error occurred. Please try again." });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "token") {
      const updatedTokens = [...formData.tokens];
      updatedTokens[index] = value;
      setFormData((prev) => ({
        ...prev,
        tokens: updatedTokens,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddTokenInput = () => {
    setFormData((prev) => ({
      ...prev,
      tokens: [...prev.tokens, ""],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        {errors.general && (
          <p className="text-sm text-red-500 mb-4">{errors.general}</p>
        )}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="John Doe"
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">{errors.fullname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="08123456789"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="********"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="********"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="subscriptionfee"
              className="block text-sm font-medium text-gray-700"
            >
              Subscription Fee
            </label>
            <select
              name="subscriptionfee"
              id="subscriptionfee"
              value={formData.subscriptionfee}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.subscriptionfee ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select a plan</option>
              <option value="1 Month - ₦5,000">1 Month - ₦5,000</option>
              <option value="3 Months - ₦10,000">3 Months - ₦10,000</option>
              <option value="1 Year - ₦20,000">1 Year - ₦20,000</option>
              <option value="3 Years - ₦50,000">3 Years - ₦50,000</option>
            </select>
            {errors.subscriptionfee && (
              <p className="mt-1 text-sm text-red-500">
                {errors.subscriptionfee}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            {showTokenInput ? (
              <div className="space-y-4 overflow-scroll">
                <div className="flex items-center">
                  <h4 className="text-lg font-medium text-gray-800">
                    AutoMobile Recharge
                  </h4>
                  <img src={MtnLogo} className="w-20" />
                  <img src={AirtelLogo} className="w-20" />
                </div>
                <div>
                  <label
                    htmlFor="carrier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Network
                  </label>
                  <select
                    name="carrier"
                    id="carrier"
                    value={formData.carrier}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.carrier ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Select Carrier</option>
                    <option value="MTN">MTN</option>
                    <option value="Airtel">Airtel</option>
                  </select>
                  {errors.carrier && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.carrier}
                    </p>
                  )}
                </div>
                {errors.token && (
                  <p className="text-sm text-red-500">{errors.token}</p>
                )}
                <button
                  id="add"
                  onClick={handleAddTokenInput}
                  className="bg-indigo-600 p-2 text-white rounded-lg cursor-pointer hover:bg-indigo-500"
                  title="Add more Cards"
                >
                  <IoMdAddCircle />
                </button>
                {formData.tokens.map((token, index) => (
                  <input
                    key={index}
                    type="text"
                    name="token"
                    value={token}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={`Enter token ${index + 1}`}
                  />
                ))}
                <button
                  onClick={handleTokenSubmit}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mb-20"
                >
                  Submit
                </button>
                <div>
                  <p onClick={()=> setShowInvite(true)} className="text-[10px] text-green-800 cursor-pointer text-center">
                    Get free Credit
                  </p>
                </div>
              { showInvite && <div class="relative group " id="invite">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg blur opacity-75 
              group-hover:opacity-100 transition duration-300 group-hover:scale-105"
                  ></div>
                  <div
                    class="relative bg-white rounded-lg shadow-xl p-6 transform transition duration-300 
              group-hover:-translate-y-1 group-hover:shadow-2xl"
                  >
                    <p class="text-[10px] font-bold text-gray-800">
                      To gain free credit to use for the day, Copy and share
                      link to 5 persons and claim your access credit
                      immediately.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={RouteList.siteAddress}
                        disabled
                        className="p-1 bg-blue-300 rounded-lg"
                      />
                      <button
                      onClick={handleCopy}
                       className="p-1 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 cursor-pointer">
                      {buttonText}
                      </button>
                    </div>
                  </div>
                </div>}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <h4 className="text-lg font-medium text-gray-800">
                  {modalText}
                </h4>
                {loading && <Loader />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
