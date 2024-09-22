// This script is designed to make exporting data from When2Meet simpler and more efficient, 
// saving you time and effort in organizing participant availability data from a When2Meet page into a CSV file. 
// It combines the best features from various community contributions (originally from [camtheman256](https://gist.github.com/camtheman256/3125e18ba20e90b6252678714e5102fd)) into a single, easy-to-use tool.
//
// and while you can load this into the javascript console and run it, it's designed to be run as a bookmarklet.
// To use as a bookmarklet, visit the page with the When2Meet, drag the link above to your bookmarks bar, 
// and then click it when you want to export the data.

function getCSV({ delimiter = ",", timeFormat = "12-hour" } = {}) {
    if ([PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot].some(v => !Array.isArray(v) || v.length === 0)) {
        console.error("Error: One or more required variables (PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot) are undefined or empty.");
        return;
    }

    let result = `Day${delimiter}Time${delimiter}` + PeopleNames.join(delimiter) + "\n"; 
    for (let i = 0; i < AvailableAtSlot.length; i++) {
        let slot = new Date(TimeOfSlot[i] * 1000);
        if (!slot) {
            console.error(`Error: Could not retrieve or format time slot for index ${i}.`);
            continue;
        }

        // Format the day and time
        let day = slot.toLocaleDateString('en-US', { weekday: 'short' });
        let time = slot.toLocaleTimeString('en-US', { hour12: timeFormat === "12-hour", hour: '2-digit', minute: '2-digit' });

        result += `${day}${delimiter}${time}${delimiter}`;
        
        // Map availability to 1 (available) and 0 (not available)
        result += PeopleIDs.map(id => AvailableAtSlot[i].includes(id) ? 1 : 0).join(delimiter);
        result += "\n";
    }
    console.log(result);
    return result;
}

function downloadCSV({ filename, delimiter = ",", timeFormat = "12-hour" } = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueCode = urlParams.keys().next().value || 'UNKNOWNCODE';
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, "");
    if (!filename) {
        filename = `when2meet_${uniqueCode}_${timestamp}.csv`;
    }

    const content = getCSV({ delimiter, timeFormat });
    if (!content) {
        console.error("Error: Failed to generate CSV content.");
        return;
    }

    const file = new Blob([content], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

downloadCSV({ delimiter: ";", timeFormat: "24-hour" });