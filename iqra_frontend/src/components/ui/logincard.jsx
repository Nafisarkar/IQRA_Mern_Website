import React from "react";

const Logincard = () => {
  return (
    <div className="font-hind">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-10">
        <legend className="fieldset-legend  text-xl">লগইন ফর্ম</legend>

        <label className="label">ইউজারনেম</label>
        <input type="email" className="input" placeholder="ইউজারনেম" />

        <label className="label">পাসওয়ার্ড</label>
        <input type="password" className="input" placeholder="পাসওয়ার্ড" />

        <button className="btn btn-neutral mt-4 ">লগইন</button>
      </fieldset>
    </div>
  );
};

export default Logincard;
