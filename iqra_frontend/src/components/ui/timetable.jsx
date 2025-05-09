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
    } else if (englishWord === "Dhuhr") {
      return "যোহর";
    } else if (englishWord === "Asr") {
      return "আসর";
    } else if (englishWord === "Maghrib") {
      return "মাঘরিব";
    } else if (englishWord === "Isha") {
      return "ইশা";
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
        `https://api.aladhan.com/v1/timingsByAddress/${date}?address=Dhaka&method=10&school=0&shafaq=general&midnightMode=0&timezonestring=Asia%2FDhaka&latitudeAdjustmentMethod=3&calendarMethod=UAQ
`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Data fetched from the API");
          if (data.code === 200 && data.status === "OK") {
            let wantedTimes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
            let filteredTimings = {};
            for (const time of wantedTimes) {
              filteredTimings[time] = data.data.timings[time];
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

  return (
    <div className="px-5 py-3 m-4 rounded-lg flex flex-col items-center font-poppins w-[calc(100%-2rem)] lg:max-w-[800px] bg-base-200">
      <h1 className="text-sm md:text-xl lg:text-xl font-hind text-center mb-2 font-bold">
        আজকের নামাজের সময়সূচি ( ঢাকা )
      </h1>

      <ul className="timeline timeline-vertical sm:timeline-horizontal ">
        {entries.map(([timeName, timeValue], index) => (
          <li key={index}>
            {index > 0 && <hr className="bg-base-content" />}
            <div className="timeline-start font-hind text-sm">
              {engToBangla(timeName)}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <circle cx="10" cy="10" r="5" />
              </svg>
            </div>
            <div className="timeline-end timeline-box font-hind">
              {convertTo12Hour(timeValue)}
            </div>
            {index == entries.length - 1 ? (
              <></>
            ) : (
              <hr className="bg-base-content" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
