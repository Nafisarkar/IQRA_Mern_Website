import React from "react";

const Termsofusepage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 rounded-lg font-hind w-[calc(100%-2rem)] lg:max-w-[800px]">
        <div className="flex justify-center items-center">
          <div className="flex w-full flex-col lg:flex-row gap-4">
            {/* Part 1: General Terms */}
            <div className="card bg-base-300 rounded-box grid p-6 lg:w-1/2 place-items-start">
              <h2 className="text-lg font-bold mb-2">
                ওয়েবসাইট ব্যবহারের নিয়ম
              </h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  এই ওয়েবসাইটটি শুধুমাত্র ইসলামিক শিক্ষামূলক উদ্দেশ্যে
                  ব্যবহারের জন্য।
                </li>
                <li>কোনো বানিজ্যিক উদ্দেশ্যে কনটেন্ট ব্যবহার করা যাবে না।</li>
                <li>
                  আপনার ব্যবহার অবশ্যই ইসলামিক শিষ্টাচার অনুযায়ী হতে হবে।
                </li>
              </ul>
            </div>

            <div className="divider lg:divider-horizontal ">এবং</div>

            {/* Part 2: Copyright & Liability */}
            <div className="card bg-base-300 rounded-box grid p-6 lg:w-1/2 place-items-start">
              <h2 className="text-lg font-bold mb-2">কপিরাইট ও দায়বদ্ধতা</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  ওয়েবসাইটের সব কনটেন্টের স্বত্বাধিকার সংরক্ষিত। অনুমতি ছাড়া
                  ব্যবহার নিষিদ্ধ।
                </li>
                <li>
                  তথ্য যথাসম্ভব সঠিকভাবে প্রদান করা হয়েছে, তবে আমরা ভুলের জন্য
                  দায়ী নই।
                </li>
                <li>
                  যেকোনো গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে একজন আলেম বা ফতোয়া
                  বোর্ডের পরামর্শ নিন।
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Termsofusepage;
