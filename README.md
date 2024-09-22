
# When2Meet CSV Export Script


This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.

## Bookmarklet

You can add the When2Meet CSV Export bookmarklet to your browser by visiting this [link](https://aculich.github.io/when2meet-extractor/) to activate the link below.

**[When2Meet CSV Export Bookmarklet test](javascript:(function(){function%20getCSV({delimiter=%22,%22,timeFormat=%2212-hour%22}=%7B%7D){if([PeopleNames,PeopleIDs,AvailableAtSlot,TimeOfSlot].some(v=%3E!Array.isArray(v)%7Cv.length===0)){console.error(%22Error:%20One%20or%20more%20required%20variables%20(PeopleNames,%20PeopleIDs,%20AvailableAtSlot,%20TimeOfSlot)%20are%20undefined%20or%20empty.%22);return;}let%20result=%20%60Day%24%7Bdelimiter%7DTime%24%7Bdelimiter%7D%60+PeopleNames.join(delimiter)+%22%5Cn%22;for(let%20i=0;i%3CAvailableAtSlot.length;i++){let%20slot=new%20Date(TimeOfSlot[i]*1000);if(!slot){console.error(%60Error:%20Could%20not%20retrieve%20or%20format%20time%20slot%20for%20index%20%24%7Bi%7D.%60);continue;}let%20day=slot.toLocaleDateString(%27en-US%27,{weekday:%27short%27});let%20time=slot.toLocaleTimeString(%27en-US%27,{hour12:timeFormat===%2212-hour%22,hour:%272-digit%27,minute:%272-digit%27});result+=%60%24%7Bday%7D%24%7Bdelimiter%7D%24%7Btime%7D%24%7Bdelimiter%7D%60;result+=PeopleIDs.map(id=%3EAvailableAtSlot[i].includes(id)?1:0).join(delimiter);result+=%22%5Cn%22;}console.log(result);return%20result;}function%20downloadCSV({filename,delimiter=%22,%22,timeFormat=%2212-hour%22}=%7B%7D){const%20urlParams=new%20URLSearchParams(window.location.search);const%20uniqueCode=urlParams.keys().next().value||%27UNKNOWNCODE%27;const%20timestamp=new%20Date().toISOString().slice(0,19).replace(/[:]/g,%22%22);if(!filename){filename=%60when2meet_%24%7BuniqueCode%7D_%24%7Btimestamp%7D.csv%60;}const%20content=getCSV({delimiter,timeFormat});if(!content){console.error(%22Error:%20Failed%20to%20generate%20CSV%20content.%22);return;}const%20file=new%20Blob([content],{type:%27text/plain%27});const%20link=document.createElement(%22a%22);link.href=URL.createObjectURL(file);link.download=filename;link.click();URL.revokeObjectURL(link.href);}downloadCSV({delimiter:%22;%22,timeFormat:%2224-hour%22});)())**

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
