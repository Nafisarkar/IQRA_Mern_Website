import React from "react";

const Aboutuspage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="m-4 rounded-lg font-poppins w-[calc(100%-2rem)] lg:max-w-[800px] bg-base-300 flex flex-col gap-3 p-3">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 font-hind rounded-lg">
          <input type="radio" name="about-accordion" defaultChecked />
          <div className="collapse-title font-semibold font-hind">আমরা কে?</div>
          <div className="collapse-content text-sm font-hind">
            QuranSunnah একটি ইসলামিক প্ল্যাটফর্ম, যার উদ্দেশ্য হল কুরআন, সহিহ
            হাদিস, ও নির্ভরযোগ্য ফতোয়ার আলোকে সঠিক ইসলামিক জ্ঞান ছড়িয়ে দেওয়া।
            আমরা বিশ্বাস করি, বিশুদ্ধ ইসলামিক শিক্ষাই মানুষের জীবনের পথপ্রদর্শক।
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300 font-hind rounded-lg">
          <input type="radio" name="about-accordion" />
          <div className="collapse-title font-semibold font-hind">
            আমাদের লক্ষ্য কী?
          </div>
          <div className="collapse-content text-sm font-hind">
            আমাদের মূল লক্ষ্য হলো মুসলিম উম্মাহকে ইসলামের বিশুদ্ধ উৎস থেকে তথ্য
            ও দিকনির্দেশনা প্রদান করা। ব্যবহারকারীরা সহজেই কুরআন, হাদিস এবং
            ইসলামি ফতোয়া অনুসন্ধান ও অধ্যয়ন করতে পারবেন।
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300 font-hind rounded-lg">
          <input type="radio" name="about-accordion" />
          <div className="collapse-title font-semibold font-hind">
            আমরা কী কী সুবিধা দিই?
          </div>
          <div className="collapse-content text-sm font-hind">
            আমাদের ওয়েবসাইটে রয়েছে:
            <ul className="list-disc list-inside mt-2 ">
              <li>আরবি সহ কুরআন পাঠ ও বাংলা অনুবাদ</li>
              <li>সহিহ হাদিসের সংগ্রহ</li>
              <li>ইসলামিক প্রশ্ন-উত্তর ও ফতোয়া</li>
              <li>ইসলামী ব্লগ ও দাওয়াতি লেখা</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutuspage;
