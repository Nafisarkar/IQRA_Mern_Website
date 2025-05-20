import React, { useEffect, useState } from "react";

const Timetable = () => {
  const [timetable, setTimetable] = useState({});
  const [isLoading, setLoading] = useState(true);

  function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(":");
    const hour12 = parseInt(hours, 10) % 12 || 12;
    const period = parseInt(hours, 10) < 12 ? "AM" : "PM";

    return `${hour12}:${minutes} ${period}`;
  }
  function formatWithLeadingZero(number) {
    return number.toString().padStart(2, "0");
  }

  function engToBangla(englishWord) {
    if (englishWord === "Fajr") {
      return "ফজর";
    } else if (englishWord === "Sunrise") {
      return "সূর্যোদয়";
    } else if (englishWord === "Ishraq") {
      return "ইশরাক";
    } else if (englishWord === "Dhuhr") {
      return "যোহর";
    } else if (englishWord === "Asr") {
      return "আসর";
    } else if (englishWord === "Maghrib") {
      return "মাঘরিব";
    } else if (englishWord === "Sunset") {
      return "সূর্যাস্ত";
    } else if (englishWord === "Isha") {
      return "ইশা";
    } else if (englishWord === "Imsak") {
      return "সেহরি";
    }
  }

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = formatWithLeadingZero(currentDate.getMonth() + 1);
    const day = formatWithLeadingZero(currentDate.getDate());
    const date = `${day}-${month}-${year}`;
    console.log("Fatching data for - " + date);
    const fetchTimetable = () => {
      fetch(
        `https://api.aladhan.com/v1/timingsByAddress/${date}?address=Dhaka&method=10&school=1&shafaq=general&midnightMode=0&timezonestring=Asia%2FDhaka&latitudeAdjustmentMethod=3&calendarMethod=UAQ
`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Data fetched from the API");
          if (data.code === 200 && data.status === "OK") {
            let wantedTimes = [
              "Fajr",
              "Sunrise",
              "Ishraq",
              "Dhuhr",
              "Asr",
              "Sunset",
              "Maghrib",
              "Isha",
              "Imsak",
            ];
            let filteredTimings = {};
            for (const time of wantedTimes) {
              if (time === "Ishraq") {
                const [hour, minute] = data.data.timings["Sunrise"]
                  .split(":")
                  .map(Number);
                const ishraqTime = new Date();
                ishraqTime.setHours(hour);
                ishraqTime.setMinutes(minute + 15); // Add 15 minutes after Sunrise for Ishraq
                filteredTimings["Ishraq"] = ishraqTime
                  .toTimeString()
                  .slice(0, 5); // Format: "HH:MM"
              } else {
                filteredTimings[time] = data.data.timings[time];
              }
            }
            setTimetable(filteredTimings);
            localStorage.setItem("timetable", JSON.stringify(filteredTimings));
            localStorage.setItem("date", date);
            setLoading(false);
          }
        })
        .catch((err) => console.error(err));
    };

    const checkLocalStorage = () => {
      const storedTimetable = localStorage.getItem("timetable");
      const storedDate = localStorage.getItem("date");
      if (storedTimetable && storedDate === date) {
        console.log("Date matches with the stored date");
        console.log("Timetable found in local storage");
        setTimetable(JSON.parse(storedTimetable));
        setLoading(false);
      } else {
        console.log("Timetable not found in local storage");
        fetchTimetable();
      }
    };

    checkLocalStorage();
    console.log("Timetable updated to UI");
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <span className="loading loading-ring "></span>
      </div>
    );
  }

  const entries = Object.entries(timetable);
  // Filter only the main five prayer times for the timeline
  const mainPrayerTimes = entries.filter(([timeName]) =>
    ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(timeName)
  );

  return (
    <div className="px-3 py-6 m-4 rounded-lg flex flex-col items-center font-poppins w-full max-w-[95%] lg:max-w-[800px] bg-base-200 shadow-xl overflow-hidden">
      <h1 className="text-sm md:text-xl lg:text-xl font-hind text-center mb-2 font-bold">
        আজকের নামাজের সময়সূচি ( ঢাকা )
      </h1>

      <div className="w-full overflow-x-auto pb-2 flex justify-center">
        <ul className="timeline timeline-vertical sm:timeline-horizontal ">
          {mainPrayerTimes.map(([timeName, timeValue], index) => (
            <li key={index}>
              {index > 0 && <hr className="bg-base-content" />}
              <div className="timeline-start font-hind text-xs sm:text-sm whitespace-nowrap">
                {engToBangla(timeName)}
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  <circle cx="10" cy="10" r="5" />
                </svg>
              </div>
              <div className="timeline-end timeline-box font-hind text-xs sm:text-sm">
                {convertTo12Hour(timeValue)}
              </div>
              {index !== mainPrayerTimes.length - 1 && (
                <hr className="bg-base-content" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full overflow-x-auto mt-6">
        <table className="table table-zebra w-full text-center">
          <thead>
            {/* <tr>
              <th className="text-center">#</th>
              <th className="text-center font-hind">সময়</th>
            </tr> */}
          </thead>
          <tbody>
            {entries.map(([timeName, timeValue], index) => (
              <tr key={index}>
                {/* <th className="text-center">{index + 1}</th> */}
                <td className="text-center font-hind">
                  {engToBangla(timeName)}
                </td>
                <td className="text-center font-hind">
                  {convertTo12Hour(timeValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
