import React from "react";
import {
  FaLaptopCode,
  FaGithub,
  FaGlobe,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
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
            className="tab font-hind text-sm"
            aria-label="ঠিকানা"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-4 md:p-6 text-xs md:text-sm leading-relaxed">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              যোগাযোগের ঠিকানা
            </h2>
            <p className="flex items-start gap-2 mb-2">
              <FaUser className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>নাম:</strong> হাসান আব্দুল মুঈদ
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaMapMarkerAlt className="text-base mt-1 min-w-[1rem]" />{" "}
              <span className="break-words">
                <strong>ঠিকানা:</strong> House 4/2, Nasirabad College Road,
                Opposite the Islamic Foundation Divisional Office, Akua
                Bhangapul, Kotwali Model Thana Mymensingh-2200, Bangladesh.
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaPhone className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>ফোন:</strong>&nbsp;
                <span className="font-barlow">+880177774416</span>
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaYoutube className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>ইউটিউব:</strong>&nbsp;
                <a
                  className="font-barlow underline link break-all"
                  href="https://www.youtube.com/@tajkiatv3666"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TAZKIA CHANNEL
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaFacebook className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>ফেসবুক:</strong>&nbsp;
                <a
                  className="font-barlow underline link break-all"
                  href="https://www.facebook.com/share/182SfDRQNa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quran Sunnah
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaEnvelope className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>ইমেইল:</strong>&nbsp;
                <a
                  href="mailto:quransunnah1991@gmail.com"
                  className="link break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  quransunnah1991@gmail.com
                </a>
              </span>
            </p>
          </div>

          {/* Tab 2: ফর্ম */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind text-sm"
            aria-label="ফর্ম"
          />
          <div className="tab-content bg-base-100 border-base-300 p-4 md:p-6 text-xs md:text-sm">
            <h2 className="text-base md:text-lg font-semibold mb-4">
              ফর্মের মাধ্যমে বার্তা পাঠান
            </h2>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="আপনার নাম"
                className="input input-bordered w-full text-sm"
              />
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="input input-bordered w-full text-sm"
              />
              <textarea
                className="textarea textarea-bordered w-full text-sm"
                placeholder="আপনার বার্তা"
                rows={4}
              ></textarea>
              <button className="btn btn-neutral w-full text-sm">পাঠান</button>
            </form>
          </div>

          {/* Tab 4: ডেভেলপার তথ্য */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind text-sm"
            aria-label="ডেভেলপার"
          />
          <div className="tab-content bg-base-100 border-base-300 p-4 md:p-6 text-xs md:text-sm">
            <h2 className="text-base md:text-lg font-semibold mb-2">
              ডেভেলপার সম্পর্কে
            </h2>
            <p className="flex items-start gap-2 mb-2">
              <FaLaptopCode className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>নাম:</strong> শাওন আন নাফি
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaGithub className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>গিটহাব:</strong>&nbsp;
                <a
                  href="https://github.com/Nafisarkar"
                  className="link break-all"
                >
                  Nafisarkar
                </a>
              </span>
            </p>
            <p className="flex items-start gap-2 mb-2">
              <FaGlobe className="text-base mt-1 min-w-[1rem]" />{" "}
              <span>
                <strong>পোর্টফোলিও:</strong>&nbsp;
                <a
                  href="https://www.shaonannafi.me/"
                  className="link break-all"
                >
                  shaonannafi.me
                </a>
              </span>
            </p>
            <p className="mt-2 text-xs md:text-sm">
              এই ওয়েবসাইটটি রেসপনসিভ ডিজাইন ও আধুনিক টেকনোলজি ব্যবহার করে
              নির্মাণ করা হয়েছে। আপনি যদি এই ওয়েবসাইটটিতে কোনো সমস্যা খুঁজে
              পান, আমাকে সরাসরি যোগাযোগ করতে পারেন。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactuspage;
