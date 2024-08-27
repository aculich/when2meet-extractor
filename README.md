
# When2Meet CSV Export Script


This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.

## Features

- **Readable Time Slots:** Converts internal When2Meet time identifiers into human-readable format (e.g., "Monday 09:00:00 AM").
- **Participant Availability:** Maps participant availability, marking `1` for available and `0` for unavailable.
- **Day and Time Separation:** The exported CSV file separates the day of the week and the time into distinct columns.
- **Dynamic Filename Generation:** The CSV file is automatically named using the format `when2meet_UNIQUECODE_TIMESTAMP.csv`, where `UNIQUECODE` is extracted from the URL and `TIMESTAMP` is formatted down to seconds.
- **Customizable Options:** Allows customization of the filename, CSV delimiter, and time format (12-hour or 24-hour).
- **Direct CSV Download:** Automatically downloads the generated CSV file to your device.
- **Simple Execution:** Runs directly from the browser's developer console, no additional tools required.

## How to Use

1. **Open the When2Meet page** where you want to export the availability data.
2. **Open the browser's developer console:**
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
