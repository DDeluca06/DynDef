// Function to load sensors from local storage
function loadSensorsFromStorage() {
  const storedSensors = localStorage.getItem('sensors');
  return storedSensors ? JSON.parse(storedSensors) : [
    { id: 1, type: 'Smoke', status: 'Online', delay: 5 },
    { id: 2, type: 'Fire', status: 'Disabled', delay: 3 },
    { id: 3, type: 'Heat', status: 'Online', delay: 7 }
  ];
}

// Global variable to store sensor data
let sensors = loadSensorsFromStorage();

// Function to save sensors to local storage
function saveSensorsToStorage() {
  localStorage.setItem('sensors', JSON.stringify(sensors));
}

// Get time for element
function updateRecentActivityTime() {
    const now = new Date(); // Get todaythe date right now
    
    const date = now.toLocaleDateString('en-US', { // US Timezone
      year: 'numeric', // Year in full
      month: '2-digit', // 10
      day: '2-digit' // 24
    });
    
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit', // 12 hour time
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    // Format the date 
    const formattedDateTime = `Recent Time — ${time}`;
    
    // Get the element
    const element = document.getElementById("recentact");
    if (element) {
        // Change the element to the formatted date
      element.innerHTML = formattedDateTime;
    }
  }
  
  // Update immediately and then every second
  updateRecentActivityTime();
  setInterval(updateRecentActivityTime, 1000);