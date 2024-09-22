
# When2Meet CSV Export Script


This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.

## Bookmarklet

You can add the When2Meet CSV Export bookmarklet to your browser by visiting this [link](https://aculich.github.io/when2meet-extractor/) to activate the link below.

**[When2Meet CSV Export Bookmarklet](javascript:(function(){function getCSV({delimiter=",",timeFormat="12-hour"}={}){if([PeopleNames,PeopleIDs,AvailableAtSlot,TimeOfSlot].some(v=>!Array.isArray(v)||v.length===0)){console.error("Error: One or more required variables (PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot) are undefined or empty.");return;}let result=`Day${delimiter}Time${delimiter}`+PeopleNames.join(delimiter)+"\n";for(let i=0;i<AvailableAtSlot.length;i++){let slot=new Date(TimeOfSlot[i]*1000);if(!slot){console.error(`Error: Could not retrieve or format time slot for index ${i}.`);continue;}let day=slot.toLocaleDateString('en-US',{weekday:'short'});let time=slot.toLocaleTimeString('en-US',{hour12:timeFormat==="12-hour",hour:'2-digit',minute:'2-digit'});result+=`${day}${delimiter}${time}${delimiter}`;result+=PeopleIDs.map(id=>AvailableAtSlot[i].includes(id)?1:0).join(delimiter);result+="\n";}console.log(result);return result;}function downloadCSV({filename,delimiter=",",timeFormat="12-hour"}={}){const urlParams=new URLSearchParams(window.location.search);const uniqueCode=urlParams.keys().next().value||'UNKNOWNCODE';const timestamp=new Date().toISOString().slice(0,19).replace(/[:]/g,"");if(!filename){filename=`when2meet_${uniqueCode}_${timestamp}.csv`;}const content=getCSV({delimiter,timeFormat});if(!content){console.error("Error: Failed to generate CSV content.");return;}const file=new Blob([content],{type:'text/plain'});const link=document.createElement("a");link.href=URL.createObjectURL(file);link.download=filename;link.click();URL.revokeObjectURL(link.href);}downloadCSV({delimiter:";",timeFormat:"24-hour"});})();)**

Drag the link above to your bookmarks bar or right-click the link above and add to bookmarks.
![image](https://github.com/user-attachments/assets/7d582206-221b-4025-9e29-ddaaccc6e988)


## Features

- **Simple Execution:** Runs as a bookmarklet or directly from the browser's developer console, no additional tools required.
- **Readable Time Slots:** Converts internal When2Meet time identifiers into human-readable format (e.g., "Monday 09:00:00 AM").
- **Participant Availability:** Maps participant availability, marking `1` for available and `0` for unavailable.
- **Day and Time Separation:** The exported CSV file separates the day of the week and the time into distinct columns.
- **Dynamic Filename Generation:** The CSV file is automatically named using the format `when2meet_UNIQUECODE_TIMESTAMP.csv`, where `UNIQUECODE` is extracted from the URL and `TIMESTAMP` is formatted down to seconds.
- **Customizable Options:** Allows customization of the filename, CSV delimiter, and time format (12-hour or 24-hour).
- **Direct CSV Download:** Automatically downloads the generated CSV file to your device.

## Problems or Feature Requests?
Add a [new issue](https://github.com/aculich/when2meet-extractor/issues) or check out the [github repo](https://github.com/aculich/when2meet-extractor/) and [submit a pull request](https://github.com/aculich/when2meet-extractor/pulls).

## How to Use

1. **Open the When2Meet page** where you want to export the availability data.
2. **Run from bookmarklet** by clicking on it in your bookmarks bar after you have added the link above to your bookmarks.
2. **Or optionally, for more customization, open the browser's developer console:**
   - On most browsers, press `F12` or `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
3. **Copy and paste the code** from `export_when2meet.js` into the browser's developer console. In Chrome, you may need to first type `allow pasting` before you can copy & paste or drag the file into the console.
4. **Press Enter** to run the script as: `downloadCSV()`
5. The CSV file named `when2meet_UNIQUECODE_TIMESTAMP.csv` will automatically download to your device, where `UNIQUECODE` is extracted from the URL and `TIMESTAMP` is the current date and time, so for example `when2meet_24892637-Evxyx_2024-05-20_133456.csv` would be the download file from https://www.when2meet.com/?24892637-Evxyx


### Customization Options

You can customize the filename, delimiter, and time format by passing options when calling the `downloadCSV` function. Here are some examples:

- **Default Filename:** The default filename follows the format `when2meet_UNIQUECODE_TIMESTAMP.csv`, where `UNIQUECODE` is extracted from the URL and `TIMESTAMP` is the current date and time, so for example `when2meet_24892637-Evxyx_2024-05-20_133456.csv` would be the download file from https://www.when2meet.com/?24892637-Evxyx
  ```javascript
  downloadCSV();
  ```


- **Custom Filename:** Specify a custom filename instead of the default.
  ```javascript
  downloadCSV({ filename: "my_custom_filename.csv" });
  ```

- **Custom Delimiter:** Use a different delimiter (e.g., semicolon) instead of the default comma.
  ```javascript
  downloadCSV({ delimiter: ";" });
  ```

- **24-Hour Time Format:** Convert times to 24-hour format.
  ```javascript
  downloadCSV({ timeFormat: "24-hour" });
  ```

- **Combined Customization:** Combine multiple options.
  ```javascript
  downloadCSV({ filename: "custom_schedule.csv", delimiter: ";", timeFormat: "24-hour" });
  ```

---

This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability.
