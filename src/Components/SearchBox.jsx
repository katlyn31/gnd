import React, { useState } from "react";

export default function SearchBox({ setTheImages }) {
  const [query, setQuery] = useState("");
  const getSetValue = (setName) => {
    switch (setName) {
      case "set1":
        return 12;
        break;

      case "set2":
        return 15;
        break;

      case "set3":
        return 5;
        break;

      case "set4":
        return 5;
        break;

      case "set5":
        return 16;
        break;
      case "set6":
        return 16;
        break;
      case "set7":
        return 12;
        break;
      case "set8":
        return 8;
        break;
      case "set9":
        return 15;
        break;
      case "set10":
        return 8;
        break;

      case "set11":
        return 9;
        break;
      case "set12":
        return 12;
        break;

      case "set13":
        return 12;
        break;
      case "set14":
        return 9;
        break;
      case "set15":
        return 9;
        break;
      case "set16":
        return 10;
        break;

      default:
    }
  };

  function generatePatchRange(patchNumber) {
    const patchRange = [];
    while (patchRange.length < patchNumber) {
     const rangeNum = Math.floor(Math.random() * 32) + 1; // Generate numbers from 1 to 32
      // Check if the generated number doesn't exist in the array
      if (!patchRange.includes(rangeNum)) {
        patchRange.push(rangeNum);
      }
    }
    return patchRange;
  }

  const handleSearch = () => {
    const genNumber = Math.floor(Math.random() * 12 ); // Get random value **** CHAAGE VALUE BACK TO 16 AFTER FOTO EDIT

    const photoSet = [
      "set1",
      "set2",
      "set3",
      "set4",
      "set5",
      "set6",
      "set7",
      "set8",
      "set9",
      "set10",
      "set11",
      "set12",
      "set13",
      "set14",
      "set15",
      "set16",
    ];

    const selectSet = photoSet[genNumber];
    const SetValue = getSetValue(selectSet);
    console.log("The folder has the following nymbers of files", SetValue);
    // Simulate search results (replace with actual API call if needed)
    let MockResults = [];
    for (let i = 1; i < SetValue; i++) {
      MockResults.push(`/girls_in_the_area/${selectSet}/p${i}.png`);
    }
    const patchNumber = 30 - SetValue;


    const Range = generatePatchRange(patchNumber);
    console.log(Range)
    //Add (new range to mockResult)
    for (let i = 0; i < Range.length; i++) {
      MockResults.push(`/default/p${Range[i]}.png`);
    }

    // Call the callback function to update parent state
    setTheImages(MockResults);
      console.log(MockResults)
  };



  return (
    <div className="flex items-center gap-4 p-6 max-w-lg mx-auto mt-10">
      {/* <label
        htmlFor="location"
        className="text-lg font-semibold text-gray-700 shrink-0"
      >
        Your Location:
      </label> */}
      <select
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        id="location"
        className="w-full p-4 text-lg bg-white border-2 border-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-600 transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw4IDdMMTUgMSIgc3Ryb2tlPSIjNjU1Y2ZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] bg-no-repeat bg-[length:16px_8px] bg-[right_1rem_center]"
      >
        <option value="Abia">Abia (Umuahia)</option>
        <option value="Adamawa">Adamawa (Yola)</option>
        <option value="Akwa Ibom">Akwa Ibom (Uyo)</option>
        <option value="Anambra">Anambra (Awka)</option>
        <option value="Bauchi">Bauchi (Bauchi)</option>
        <option value="Bayelsa">Bayelsa (Yenagoa)</option>
        <option value="Benue">Benue (Makurdi)</option>
        <option value="Borno">Borno (Maiduguri)</option>
        <option value="Cross River">Cross River (Calabar)</option>
        <option value="Delta">Delta (Asaba)</option>
        <option value="Ebonyi">Ebonyi (Abakaliki)</option>
        <option value="Edo">Edo (Benin City)</option>
        <option value="Ekiti">Ekiti (Ado Ekiti)</option>
        <option value="Enugu">Enugu (Enugu)</option>
        <option value="Gombe">Gombe (Gombe)</option>
        <option value="Imo">Imo (Owerri)</option>
        <option value="Jigawa">Jigawa (Dutse)</option>
        <option value="Kaduna">Kaduna (Kaduna)</option>
        <option value="Kano">Kano (Kano)</option>
        <option value="Katsina">Katsina (Katsina)</option>
        <option value="Kebbi">Kebbi (Birnin Kebbi)</option>
        <option value="Kogi">Kogi (Lokoja)</option>
        <option value="Kwara">Kwara (Ilorin)</option>
        <option value="Lagos">Lagos (Ikeja)</option>
        <option value="Nasarawa">Nasarawa (Lafia)</option>
        <option value="Niger">Niger (Minna)</option>
        <option value="Ogun">Ogun (Abeokuta)</option>
        <option value="Ondo">Ondo (Akure)</option>
        <option value="Osun">Osun (Osogbo)</option>
        <option value="Oyo">Oyo (Ibadan)</option>
        <option value="Plateau">Plateau (Jos)</option>
        <option value="Rivers">Rivers (Port Harcourt)</option>
        <option value="Sokoto">Sokoto (Sokoto)</option>
        <option value="Taraba">Taraba (Jalingo)</option>
        <option value="Yobe">Yobe (Damaturu)</option>
        <option value="Zamfara">Zamfara (Gusau)</option>
        <option value="Federal Capital Territory">
          Federal Capital Territory (Abuja)
        </option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
}
