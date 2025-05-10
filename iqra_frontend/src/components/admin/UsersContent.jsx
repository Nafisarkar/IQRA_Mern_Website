import React, { useState, useEffect } from "react";
import Toast from "../ui/toast";
import { useSelector } from "react-redux";
import { selectCurrentUserDetails } from "../../app/features/user/userSlice";

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const currentUser = useSelector(selectCurrentUserDetails);

  useEffect(() => {
    if (currentUser) {
      setUsers([currentUser]);
    }
    setLoading(false);
  }, [currentUser]);

  const showToastMessage = (message, type = "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-base-100 p-4 md:p-6 rounded-lg shadow-lg w-full overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 font-hind">
        ইউজার ম্যানেজমেন্ট
      </h2>

      {showToast && (
        <Toast
          message={toastMessage}
          status={toastType}
          duration={3000}
          position="bottom-end"
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm md:text-base">
            <thead>
              <tr>
                <th>ইউজারনেম</th>
                <th>ইমেইল</th>
                <th>রোল</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user?._id || user?.id}>
                    <td>{user?.username}</td>
                    <td>{user?.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user?.isAdmin ? "badge-primary" : "badge-ghost"
                        }`}
                      >
                        {user?.isAdmin ? "অ্যাডমিন" : "ইউজার"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() =>
                          showToastMessage("সম্পাদনা ক্লিক করা হয়েছে", "info")
                        }
                      >
                        সম্পাদনা
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    কোন ইউজার পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersContent;
