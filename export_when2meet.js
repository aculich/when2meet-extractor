function getCSV() {
    // Condensed error checking for required variables
    if ([PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot].some(v => !Array.isArray(v) || v.length === 0)) {
        console.error("Error: One or more required variables (PeopleNames, PeopleIDs, AvailableAtSlot, TimeOfSlot) are undefined or empty.");
        return;
    }

    let result = "Time," + PeopleNames.join(",") + "\n"; 
    for (let i = 0; i < AvailableAtSlot.length; i++) {
        // Attempt to extract and format the time slot
        let slot = $x(`string(//div[@id="GroupTime${TimeOfSlot[i]}"]/@onmouseover)`)?.match(/.*"(.*)".*/)?.[1];
        if (!slot) {
            console.error(`Error: Could not retrieve or format time slot for index ${i}.`);
            continue;
        }

        result += slot + ",";
        
        // Map availability to 1 (available) and 0 (not available)
        result += PeopleIDs.map(id => AvailableAtSlot[i].includes(id) ? 1 : 0).join(",");
        result += "\n";
    }
    console.log(result);
    return result;
}

function downloadCSV() {
    const content = getCSV();
    if (!content) {
        console.error("Error: Failed to generate CSV content.");
        return;
    }

    // Create a blob with the CSV content
    const file = new Blob([content], { type: 'text/plain' });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "when2meet.csv";
    link.click();

    // Revoke the object URL to free memory
    URL.revokeObjectURL(link.href);
}

// Run the download function
downloadCSV();
