import React, { useState } from "react";
import Toast from "./toast";

const Logincard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const loginHandler = () => {
    console.log(username, password);
    if (username === "" || password === "") {
      setToastMessage("ইউজারনেম এবং পাসওয়ার্ড প্রয়োজনীয়");
      setToastType("error");
      setShowToast(true);
    } else {
      setToastMessage("লগইন সফল");
      setToastType("success");
      setShowToast(true);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="font-hind">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-2 my-6">
        <legend className="fieldset-legend  text-xl">লগইন ফর্ম</legend>

        <label className="label">ইউজারনেম</label>
        <input
          type="email"
          className="input"
          placeholder="ইউজারনেম"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">পাসওয়ার্ড</label>
        <input
          type="password"
          className="input"
          placeholder="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4 " onClick={loginHandler}>
          লগইন
        </button>

        {showToast && (
          <Toast
            message={toastMessage}
            status={toastType}
            duration={4000}
            position="bottom-end"
            show={showToast}
            onClose={() => setShowToast(false)}
          />
        )}
      </fieldset>
    </div>
  );
};

export default Logincard;
