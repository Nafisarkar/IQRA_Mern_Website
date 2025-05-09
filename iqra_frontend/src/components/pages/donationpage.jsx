import React from "react";
import {
  FaMobileAlt,
  FaUniversity, // for bank
} from "react-icons/fa";

const DonationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center font-hind">
      <div className="m-4 rounded-lg font-hind w-[calc(100%-2rem)] lg:max-w-[800px] bg-base-300">
        <div className="tabs tabs-lift flex-wrap">
          {/* Tab 1: Bkash */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="বিকাশ"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm leading-relaxed font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              বিকাশ (Bkash)
            </h2>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaMobileAlt className="text-lg " />
              <strong>নম্বর:</strong>{" "}
              <p className="font-barlow">+880177774416</p>
            </p>
            <p className="font-hind mb-2">
              <strong>প্রতিষ্ঠান/পার্সোনাল:</strong> পার্সোনাল
            </p>
            <p className="font-hind mb-2">
              <strong>নোট:</strong> দয়া করে পেমেন্টের পর রেফারেন্সে আপনার নাম
              লিখুন এবং কনফার্মেশনের জন্য আমাদের ইমেইলে জানান।
            </p>
          </div>

          {/* Tab 2: Rocket */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="রকেট"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm leading-relaxed font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              রকেট (Rocket)
            </h2>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaMobileAlt className="text-lg" />
              <strong>নম্বর:</strong>{" "}
              <p className="font-barlow">+880177774416</p>
            </p>
            <p className="font-hind mb-2">
              <strong>প্রতিষ্ঠান/পার্সোনাল:</strong> পার্সোনাল
            </p>
            <p className="font-hind mb-2">
              <strong>নোট:</strong> দয়া করে পেমেন্টের পর রেফারেন্সে আপনার নাম
              লিখুন এবং কনফার্মেশনের জন্য আমাদের ইমেইলে জানান।
            </p>
          </div>

          {/* Tab 3: Bank Transfer */}
          <input
            type="radio"
            name="my_tabs_3"
            className="tab font-hind"
            aria-label="ব্যাংক ট্রান্সফার"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 text-sm leading-relaxed font-hind">
            <h2 className="text-lg font-semibold mb-2 font-hind">
              ব্যাংক ট্রান্সফার
            </h2>
            <p className="font-hind flex items-center gap-3 mb-2">
              <FaUniversity className="text-lg" />
              <strong>ব্যাংক নাম:</strong> Dutch Bangla Bank Limited
            </p>
            <p className="font-hind mb-2">
              <strong>একাউন্ট নাম:</strong> হাসান আব্দুল মোইদ
            </p>
            <p className="font-hind mb-2">
              <strong>একাউন্ট নম্বর:</strong> 1234567890
            </p>
            <p className="font-hind mb-2">
              <strong>ব্রাঞ্চ:</strong> ঢাকা মেইন ব্রাঞ্চ
            </p>
            <p className="font-hind mb-2">
              <strong>ইমেইল:</strong> quransunnah1991@gmail.com
            </p>
            <p className="font-hind mb-2">
              <strong>নোট:</strong> ব্যাংক ট্রান্সফারের পর আপনার ট্রান্সফার
              স্লিপ/প্রমাণ ইমেইলে পাঠাতে অনুরোধ করা হচ্ছে।
            </p>
          </div>
        </div>
      </div>

      {/* Donation purposes section in a separate div with similar styling */}
      <div className="m-4 rounded-lg font-hind w-[calc(100%-2rem)] lg:max-w-[800px] bg-base-300 mt-6">
        <div className="p-4 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3 font-hind text-center">
            আপনার অনুদান সম্পর্কে
          </h2>

          <div className="join join-vertical bg-base-100 rounded-lg">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" defaultChecked />
              <div className="collapse-title font-semibold font-hind">
                আপনার অনুদান কিসের জন্য ব্যবহৃত হবে?
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind mb-4">
                  আল্লাহ আপনার উদারতার জন্য আপনাকে পুরস্কৃত করুন। যতই ছোট হোক না
                  কেন, প্রতিটি অবদান আমাদের কাজ চালিয়ে যেতে সাহায্য করে।
                </p>
              </div>
            </div>

            {/* <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" />
              <div className="collapse-title font-semibold font-hind">
                মোবাইল অ্যাপ নির্মাণ
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind">
                  একটি মোবাইল অ্যাপ আমাদের সবচেয়ে বেশি অনুরোধ করা ফিচার; এখন
                  পর্যন্ত আমাদের এই প্রকল্পে শুরু করার সংস্থান ছিল না।
                </p>
              </div>
            </div> */}

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" />
              <div className="collapse-title font-semibold font-hind">
                তথ্য সংযোজন
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind">
                  আরও হাদিস বই, ভাষা এবং হাদিস সংক্রান্ত তথ্য যেমন ব্যাখ্যা এবং
                  বর্ণনাকারীর জীবনী সংযোজন করা।
                </p>
              </div>
            </div>

            {/* <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" />
              <div className="collapse-title font-semibold font-hind">
                ফিচার সংযোজন
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind">
                  একটি সমৃদ্ধ ব্যবহারকারী অভিজ্ঞতার জন্য শেখার যাত্রা, বুকমার্ক
                  এবং আরও প্লাটফর্ম ফিচার যোগ করা।
                </p>
              </div>
            </div> */}

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" />
              <div className="collapse-title font-semibold font-hind">
                পরিচালনা খরচ
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind">
                  আমাদের সার্ভার চালু রাখা এবং ডিজাইন রিফ্রেশ করা।
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="donation-accordion" />
              <div className="collapse-title font-semibold font-hind">
                অনুবাদ কমিশন করা
              </div>
              <div className="collapse-content text-sm">
                <p className="font-hind">
                  আমাদের কিছু অনুবাদ পুরানো এবং আমরা যোগ্য বিদ্বানদের কাছ থেকে
                  আধুনিক অনুবাদ কমিশন করার প্রকল্প অন্বেষণ করছি।
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <p className="font-hind text-center italic">
              "যে ব্যক্তি আল্লাহর পথে ব্যয় করে, আল্লাহ তার জন্য তা বাড়িয়ে
              দেন।" (সূরা বাকারা, আয়াত ২৬১)
            </p>
            <p className="font-hind mt-4 text-center">
              আমরা আপনি যদি সক্ষম হন তবে নিয়মিত অনুদান দেওয়ার জন্য উত্সাহিত
              করি, কারণ এটি আমাদের আরও দূরের পরিকল্পনা করতে সাহায্য করে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
