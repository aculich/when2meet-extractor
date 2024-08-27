function getCSV() {
    result = "Time," + PeopleNames.join(",")+"\n"; 
    for(let i = 0; i < AvailableAtSlot.length; i++) {
        let slot = $x(`string(//div[@id="GroupTime${TimeOfSlot[i]}"]/@onmouseover)`);
        slot = slot.match(/.*"(.*)".*/)[1];
        result += slot + ",";
        result += PeopleIDs.map(id => AvailableAtSlot[i].includes(id) ? 1 : 0).join(",");
        result+= "\n";
    }
    console.log(result);
    return result;
  }
  copy(getCSV()); // automatically copy results to clipboard
  