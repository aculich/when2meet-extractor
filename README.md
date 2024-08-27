
# When2Meet CSV Export Script


This script is designed to make exporting data from When2Meet simpler and more efficient, saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.

## Features

- **Readable Time Slots:** Converts internal When2Meet time identifiers into human-readable format (e.g., "Monday 09:00:00 AM").
- **Participant Availability:** Maps participant availability, marking `1` for available and `0` for unavailable.
- **Direct CSV Download:** Automatically downloads the generated CSV file to your device.
- **Simple Execution:** Runs directly from the browser's developer console, no additional tools required.

## How to Use

1. **Open the When2Meet page** where you want to export the availability data.
2. **Open the browser's developer console:**
   - On most browsers, press `F12` or `Ctrl + Shift + I` (Windows/Linux) or `Cmd + Option + I` (Mac).
3. **Copy and paste the code** from export_when2meet.js into the browser's developer console. Note, in Chrome, you may need to first type "allow pasting" and then you can either copy & paste or you can just drag the file into the console.
4. **Press Enter** to run the script.
5. The CSV file named `when2meet.csv` will automatically download to your device.
