function exportData() {
    const peopleMap = {};
    for(let i = 0; i < PeopleIDs.length; i++) {
        peopleMap[PeopleIDs[i]] = PeopleNames[i];
    }
    nameAtSlot = AvailableAtSlot.map(e => e.map(i => peopleMap[i]));
    timedNames = TimeOfSlot.map((e, i) => [e, nameAtSlot[i]]);
    return JSON.stringify(timedNames);
}