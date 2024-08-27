function getCSV() {
    let result = "Time," + PeopleNames.join(",") + "\n"; 
    for(let i = 0; i < AvailableAtSlot.length; i++) {
        // Format the time slot into a readable string
        let slot = $x(`string(//div[@id="GroupTime${TimeOfSlot[i]}"]/@onmouseover)`);
        slot = slot.match(/.*"(.*)".*/)[1];
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
  