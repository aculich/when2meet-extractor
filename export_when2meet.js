function getCSV({ delimiter = ",", timeFormat = "12-hour" } = {}) {
    // Condensed error checking for required variables
    if ([PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot].some(v => !Array.isArray(v) || v.length === 0)) {
        console.error("Error: One or more required variables (PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot) are undefined or empty.");
        return;
    }

    let result = `Day${delimiter}Time${delimiter}` + PeopleNames.join(delimiter) + "\n"; 
    for (let i = 0; i < AvailableAtSlot.length; i++) {
        // Attempt to extract and format the time slot
        let slot = $x(`string(//div[@id="GroupTime${TimeOfSlot[i]}"]/@onmouseover)`)?.match(/.*"(.*)".*/)?.[1];
        if (!slot) {
            console.error(`Error: Could not retrieve or format time slot for index ${i}.`);
            continue;
        }

        // Split the slot into day and time
        let [day, time] = slot.split(" ");
        if (timeFormat === "24-hour") {
            time = convertTo24HourFormat(time);
        }

        result += `${day}${delimiter}${time}${delimiter}`;
        
        // Map availability to 1 (available) and 0 (not available)
        result += PeopleIDs.map(id => AvailableAtSlot[i].includes(id) ? 1 : 0).join(delimiter);
        result += "\n";
    }
    console.log(result);
    return result;

    // Helper function to convert 12-hour time to 24-hour time
    function convertTo24HourFormat(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes, seconds] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}:${seconds}`;
    }
}

function downloadCSV({ filename, delimiter = ",", timeFormat = "12-hour" } = {}) {
    // Extract the unique code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueCode = urlParams.keys().next().value || 'UNKNOWNCODE';

    // Generate an ISO timestamp down to the second
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, "");

    // Default filename format if not provided
    if (!filename) {
        filename = `when2meet_${uniqueCode}_${timestamp}.csv`;
    }

    const content = getCSV({ delimiter, timeFormat });
    if (!content) {
        console.error("Error: Failed to generate CSV content.");
        return;
    }

    // Create a blob with the CSV content
    const file = new Blob([content], { type: 'text/plain' });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();

    // Revoke the object URL to free memory
    URL.revokeObjectURL(link.href);
}

// Run the download function with customizable options
downloadCSV({ delimiter: ";", timeFormat: "24-hour" });
