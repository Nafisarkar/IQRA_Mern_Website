import React, { useEffect, useState } from "react";

const Timetable = () => {
  const [timetable, setTimetable] = useState({});
  const [location, setLocation] = useState("Dhaka"); // Default location
  const [isLoading, setLoading] = useState(true);

  const availableLocations = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];

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
    setLoading(true); // Set loading to true when location changes
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = formatWithLeadingZero(currentDate.getMonth() + 1);
    const day = formatWithLeadingZero(currentDate.getDate());
    const date = `${day}-${month}-${year}`;

    const fetchTimetable = () => {
      fetch(
        `https://api.aladhan.com/v1/timingsByAddress/${date}?address=${location}&method=10&school=1&shafaq=general&midnightMode=0&timezonestring=Asia%2FDhaka&latitudeAdjustmentMethod=3&calendarMethod=UAQ`
      )
        .then((res) => res.json())
        .then((data) => {
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
            localStorage.setItem("location", location); // Store selected location
            localStorage.setItem("date", date);
            setLoading(false);
          } else {
            // Handle API error (e.g., location not found by API)
            console.error("Error fetching timetable from API:", data.status);
            setLoading(false); // Ensure loading is set to false on API error
            // Optionally, set an error state to display to the user
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false); // Ensure loading is set to false on network error
        });
    };

    const checkLocalStorage = () => {
      const storedTimetable = localStorage.getItem("timetable");
      const storedDate = localStorage.getItem("date");
      const storedLocation = localStorage.getItem("location");

      if (
        storedTimetable &&
        storedDate === date &&
        storedLocation === location
      ) {
        setTimetable(JSON.parse(storedTimetable));
        setLoading(false);
      } else {
        fetchTimetable();
      }
    };

    // Retrieve last selected location from localStorage or use default
    const lastSelectedLocation = localStorage.getItem("location");
    if (
      lastSelectedLocation &&
      availableLocations.includes(lastSelectedLocation) &&
      location !== lastSelectedLocation
    ) {
      // This condition is tricky. If we setLocation here, it causes a re-render and re-run of useEffect.
      // It's better to initialize `location` state with localStorage value.
      // For now, let's keep it simple: the initial fetch will use the default or the current `location` state.
      // If `location` state changes via dropdown, this useEffect will re-run.
    }

    checkLocalStorage();
  }, [location]); // Add location to dependency array

  const handleLocationChange = (newLocation) => {
    if (document.activeElement) {
      document.activeElement.blur(); // Close the dropdown on selection
    }
    setLocation(newLocation);
  };

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
      <div className="flex flex-col sm:flex-col justify-center items-center w-full mb-4 px-2">
        <h1 className="text-sm md:text-xl lg:text-xl font-hind text-center font-bold mb-2 sm:mb-0">
          আজকের নামাজের সময়সূচি ({location})
        </h1>
        <div className="dropdown dropdown-bottom dropdown-center">
          <div tabIndex={0} role="button" className="btn btn-sm m-1 font-hind">
            শহর পরিবর্তন করুন
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[50] w-52 p-2 shadow-lg max-h-80 overflow-y-auto"
          >
            {availableLocations.map((loc) => (
              <li key={loc}>
                <a onClick={() => handleLocationChange(loc)}>{loc}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
