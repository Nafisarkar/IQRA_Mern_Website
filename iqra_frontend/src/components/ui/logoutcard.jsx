import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/features/user/userSlice";
import Toast from "./toast";
import { Link } from "react-router"; // fixed import

const LogoutCard = () => {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.userR);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (status === "idle" && !user) {
      setToastMessage("✅ লগআউট সফল");
      setToastType("success");
      setShowToast(true);
    } else if (status === "failed" && error) {
      setToastMessage(error || "❌ লগআউট ব্যর্থ");
      setToastType("error");
      setShowToast(true);
    }
  }, [status, error, user]);

  const logoutHandler = () => {
    dispatch(logoutUser());
    setTimeout(() => setShowToast(false), 4000);
  };

  if (!user) return null;

  return (
    <div className="font-hind flex justify-center mt-6">
      <div className="card w-full max-w-xs bg-base-300 shadow-2xl rounded-[5px]">
        <div className="card-body items-center text-center p-6">
          <h2 className="card-title text-2xl mb-2">
            {user.username || "User"}
          </h2>

          <div className="flex flex-col items-center gap-3 mb-4">
            {user.isAdmin ? (
              <>
                <span className="badge badge-accent px-3 py-1 text-sm">
                  অ্যাডমিন
                </span>
                <Link className="btn btn-outline btn-accent btn-sm" to="/admin">
                  🛡️ অ্যাডমিন প্যানেল
                </Link>
              </>
            ) : (
              <span className="badge badge-secondary px-3 py-1 text-sm">
                ইউজার
              </span>
            )}
          </div>

          <div className="w-full">
            <button
              className={`btn btn-error btn-wide ${
                status === "loading" ? "loading" : ""
              }`}
              onClick={logoutHandler}
              disabled={status === "loading"}
            >
              {status === "loading" ? "প্রক্রিয়া চলছে..." : "🚪 লগআউট করুন"}
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default LogoutCard;
