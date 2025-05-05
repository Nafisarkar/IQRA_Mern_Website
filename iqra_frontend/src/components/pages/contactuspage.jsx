import React from "react";
import {
  FaLaptopCode,
  FaGithub,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Contactuspage = () => {
  return (
    <div className="flex flex-col items-center justify-center font-hind">
      <div className="m-4 rounded-lg font-hind w-[calc(100%-2rem)] lg:max-w-[800px] bg-base-300">
        <div className="tabs tabs-lift">
          {/* Tab 1: যোগাযোগের ঠিকানা */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="ঠিকানা"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm leading-relaxed font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              যোগাযোগের ঠিকানা
            </h2>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaMapMarkerAlt className="text-lg" /> <strong>ঠিকানা:</strong>{" "}
              ঢাকা, বাংলাদেশ
            </p>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaPhone className="text-lg" /> <strong>ফোন:</strong> +৮৮০
              ১৭১১-১২৩৪৫৬
            </p>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaEnvelope className="text-lg" /> <strong>ইমেইল:</strong>{" "}
              support@quransunnah.com
            </p>
            <p className="mt-2 font-hind">
              আমরা ২৪ ঘণ্টার মধ্যে আপনার বার্তার উত্তর দেওয়ার চেষ্টা করি।
            </p>
          </div>

          {/* Tab 2: ফর্ম */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="ফর্ম"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm font-hind">
            <h2 className="text-lg font-semibold mb-4 font-hind">
              ফর্মের মাধ্যমে বার্তা পাঠান
            </h2>
            <form className="flex flex-col gap-3 font-hind">
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full font-hind"
              />
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="input input-bordered w-full font-hind"
              />
              <textarea
                className="textarea textarea-bordered w-full font-hind"
                placeholder="আপনার বার্তা"
                rows={4}
              ></textarea>
              <button className="btn btn-neutral w-full font-hind">
                পাঠান
              </button>
            </form>
          </div>

          {/* Tab 3: সামাজিক যোগাযোগ */}
          {/* <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="সামাজিক যোগাযোগ"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              সামাজিক যোগাযোগ
            </h2>
            <ul className="list-disc list-inside font-hind">
              <li className="font-hind">
                📘 <strong>Facebook:</strong>{" "}
                <a
                  href="https://facebook.com/quransunnahbd"
                  className="link font-hind"
                >
                  facebook.com/quransunnahbd
                </a>
              </li>
              <li className="font-hind">
                📺 <strong>YouTube:</strong>{" "}
                <a
                  href="https://youtube.com/quransunnah"
                  className="link font-hind"
                >
                  youtube.com/quransunnah
                </a>
              </li>
              <li className="font-hind">
                🐦 <strong>Twitter:</strong>{" "}
                <a
                  href="https://twitter.com/quransunnah"
                  className="link font-hind"
                >
                  twitter.com/quransunnah
                </a>
              </li>
            </ul>
            <p className="mt-2 font-hind">
              আপনার যেকোনো প্রশ্ন বা মতামত আমাদের জানাতে পারেন সামাজিক মাধ্যমেও।
            </p>
          </div> */}

          {/* Tab 4: ডেভেলপার তথ্য */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="ডেভেলপার "
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              ডেভেলপার সম্পর্কে
            </h2>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaLaptopCode className="text-lg" /> <strong>নাম:</strong> শাওন আন
              নাফি
            </p>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaGithub className="text-lg" /> <strong>গিটহাব:</strong>{" "}
              <a href="https://github.com/Nafisarkar" className="link">
                Nafisarkar
              </a>
            </p>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaGlobe className="text-lg" /> <strong>পোর্টফোলিও:</strong>{" "}
              <a href="https://www.shaonannafi.me/" className="link font-hind">
                shaonannafi.me
              </a>
            </p>
            <p className="mt-2 font-hind">
              এই ওয়েবসাইটটি রেসপনসিভ ডিজাইন ও আধুনিক টেকনোলজি ব্যবহার করে
              নির্মাণ করা হয়েছে। আপনি যদি এই ওয়েবসাইটটিতে কোনো সমস্যা খুঁজে
              পান, আমাকে সরাসরি যোগাযোগ করতে পারেন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactuspage;
