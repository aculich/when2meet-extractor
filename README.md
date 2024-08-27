
# When2Meet CSV Export Script


This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.

## Bookmarklet

You can add the When2Meet CSV Export bookmarklet to your browser by visiting this [link](https://aculich.github.io/when2meet-extractor/) to activate the link below.

**[When2Meet CSV Export Bookmarklet](javascript:(function(){function%20getCSV(%7Bdelimiter%3D%22%2C%22%2CtimeFormat%3D%2212-hour%22%7D%3D%7B%7D)%7Bif(%5BPeopleNames%2CPeopleIDs%2CAvailableAtSlot%2CTimeOfSlot%5D.some(v%3D%3E!Array.isArray(v)%7Cv.length%3D%3D%3D0))%7Bconsole.error(%22Error%3A%20One%20or%20more%20required%20variables%20(PeopleNames%2C%20PeopleIDs%2C%20AvailableAtSlot%2C%20TimeOfSlot)%20are%20undefined%20or%20empty.%22)%3Breturn%3B%7Dlet%20result%3D%60Day%24%7Bdelimiter%7DTime%24%7Bdelimiter%7D%60%2BPeopleNames.join(delimiter)%2B%22%5Cn%22%3Bfor(let%20i%3D0%3Bi%3CAvailableAtSlot.length%3Bi%2B%2B)%7Blet%20slotExpr%3D%60%2F%2Fdiv%5B%40id%3D'GroupTime%24%7BTimeOfSlot%5Bi%5D%7D'%5D%2F%40onmouseover%60%3Blet%20slot%3Ddocument.evaluate(slotExpr%2Cdocument%2Cnull%2CXPathResult.STRING_TYPE%2Cnull).stringValue.match(%2F.*%22(.*)%22.*%2F)%3F.%5B1%5D%3Bif(!slot)%7Bconsole.error(%60Error%3A%20Could%20not%20retrieve%20or%20format%20time%20slot%20for%20index%20%24%7Bi%7D.%60)%3Bcontinue%3B%7Dlet%5Bday%2Ctime%5D%3Dslot.split(%22%20%22)%3Bif(timeFormat%3D%3D%3D%2224-hour%22)%7Btime%3DconvertTo24HourFormat(time)%3B%7Dresult%2B%3D%60%24%7Bday%7D%24%7Bdelimiter%7D%24%7Btime%7D%24%7Bdelimiter%7D%60%3Bresult%2B%3DPeopleIDs.map(id%3D%3EAvailableAtSlot%5Bi%5D.includes(id)%3F1%3A0).join(delimiter)%3Bresult%2B%3D%22%5Cn%22%3B%7Dconsole.log(result)%3Breturn%20result%3Bfunction%20convertTo24HourFormat(time12h)%7Bconst%5Btime%2Cmodifier%5D%3Dtime12h.split('%20')%3Blet%5Bhours%2Cminutes%2Cseconds%5D%3Dtime.split('%3A')%3Bif(hours%3D%3D%3D'12')%7Bhours%3D'00'%3B%7Dif(modifier%3D%3D%3D'PM')%7Bhours%3DparseInt(hours%2C10)%2B12%3B%7Dreturn%60%24%7Bhours%7D%3A%24%7Bminutes%7D%3A%24%7Bseconds%7D%60%3B%7D%7Dfunction%20downloadCSV(%7Bfilename%2Cdelimiter%3D%22%2C%22%2CtimeFormat%3D%2212-hour%22%7D%3D%7B%7D)%7Bconst%20urlParams%3Dnew%20URLSearchParams(window.location.search)%3Bconst%20uniqueCode%3DurlParams.keys().next().value%7C%7C'UNKNOWNCODE'%3Bconst%20timestamp%3Dnew%20Date().toISOString().slice(0%2C19).replace(%2F%5B%3A%5D%2Fg%2C%22%22)%3Bif(!filename)%7Bfilename%3D%60when2meet_%24%7BuniqueCode%7D_%24%7Btimestamp%7D.csv%60%3B%7Dconst%20content%3DgetCSV(%7Bdelimiter%2CtimeFormat%7D)%3Bif(!content)%7Bconsole.error(%22Error%3A%20Failed%20to%20generate%20CSV%20content.%22)%3Breturn%3B%7Dconst%20file%3Dnew%20Blob(%5Bcontent%5D%2C%7Btype%3A'text%2Fplain'%7D)%3Bconst%20link%3Ddocument.createElement(%22a%22)%3Blink.href%3DURL.createObjectURL(file)%3Blink.download%3Dfilename%3Blink.click()%3BURL.revokeObjectURL(link.href)%3B%7DdownloadCSV(%7Bdelimiter%3A%22%3B%22%2CtimeFormat%3A%2224-hour%22%7D)%3B%7D)())**

Drag the link above to your bookmarks bar or right-click the link above and add to bookmarks.

## Features

- **Simple Execution:** Runs as a bookmarklet or directly from the browser's developer console, no additional tools required.
- **Readable Time Slots:** Converts internal When2Meet time identifiers into human-readable format (e.g., "Monday 09:00:00 AM").
- **Participant Availability:** Maps participant availability, marking `1` for available and `0` for unavailable.
- **Day and Time Separation:** The exported CSV file separates the day of the week and the time into distinct columns.
- **Dynamic Filename Generation:** The CSV file is automatically named using the format `when2meet_UNIQUECODE_TIMESTAMP.csv`, where `UNIQUECODE` is extracted from the URL and `TIMESTAMP` is formatted down to seconds.
- **Customizable Options:** Allows customization of the filename, CSV delimiter, and time format (12-hour or 24-hour).
- **Direct CSV Download:** Automatically downloads the generated CSV file to your device.

## How to Use

1. **Open the When2Meet page** where you want to export the availability data.
2. **Run from bookmarklet** by clicking on it in your bookmarks bar after you have added the link above to your bookmarks.
2. **Or optionally, for more customization, open the browser's developer console:**
   - On most browsers, press `F12` or `Ctrl + Shift + I` (Windows/Linux) or `Cmd + Option + I` (Mac).
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
