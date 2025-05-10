import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/features/user/userSlice";
import Toast from "./toast";

const Logincard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.userR);

  // Monitor login status changes
  useEffect(() => {
    if (status === "succeeded") {
      setToastMessage("লগইন সফল");
      setToastType("success");
      setShowToast(true);
      // Clear form after successful login
      setUsername("");
      setPassword("");
    } else if (status === "failed") {
      setToastMessage(error || "লগইন ব্যর্থ");
      setToastType("error");
      setShowToast(true);
    }
  }, [status, error]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (username === "" || password === "") {
      setToastMessage("ইউজারনেম এবং পাসওয়ার্ড প্রয়োজনীয়");
      setToastType("error");
      setShowToast(true);
    } else {
      // Dispatch login with username and password as expected by backend
      dispatch(loginUser({ username, password }));
    }

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="font-hind">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-2 my-6">
        <legend className="fieldset-legend text-xl">লগইন ফর্ম</legend>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">ইউজারনেম</label>
            <input
              type="text"
              className="input"
              placeholder="ইউজারনেম"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={status === "loading"}
              autoComplete="username"
            />
          </div>

          <div className="form-control">
            <label className="label">পাসওয়ার্ড</label>
            <input
              type="password"
              className="input"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === "loading"}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-neutral mt-4 w-full ${
              status === "loading" ? "loading" : ""
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "লোড হচ্ছে..." : "লগইন"}
          </button>
        </form>

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
