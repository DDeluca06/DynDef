document.addEventListener('DOMContentLoaded', () => {
  const contentArea = document.querySelector('.content');

  // Content for different sections
  const sections = {
    Dashboard: `
    <div class="main-content">
      <div class="info-box">
        <h3>Sensor Status</h3>
        <div id="sensorStatus"></div>
      </div>
      <div class="info-box">
        <h3 id="recentact">Recent Activity</h3>
        <div id="activityLog"></div>
      </div>
    </div>
    <div class="sidebar">
      <div class="info-box">
        <h3>Quick Actions</h3>
        <button id="restartSensors">Restart Sensors</button>
        <button id="resetServer">Reset Server</button>
      </div>
    </div>
  `,
    Sensors: `
      <div class="main-content">
        <div class="info-box">
          <h3>Sensor Details</h3>
          <p>Total Sensors: <span id="totalSensors">3</span></p>
          <p>Active Sensors: <span id="activeSensors">1</span></p>
          <p>Inactive Sensors: <span id="inactiveSensors">2</span></p>
        </div>
      </div>
      <div class="sidebar">
        <div class="info-box">
          <h3>Sensor Actions</h3>
          <button id="addSensor">Add New Sensor</button>
          <button id="calibrateSensors">Calibrate Sensors</button>
        </div>
      </div>
    `,
    Logs: `
      <div class="main-content">
        <div class="info-box">
          <h3>System Logs</h3>
          <div id="systemLogs"></div>
        </div>
      </div>
      <div class="sidebar">
        <div class="info-box">
          <h3>Log Actions</h3>
          <button id="exportLogs">Export Logs</button>
          <button id="clearLogs">Clear Logs</button>
        </div>
      </div>
    `,
    Settings: `
      <div class="main-content">
        <div class="info-box">
          <h3>System Settings</h3>
          <p>Notification Email: <span id="notificationEmail">admin@dynastydefense.com</span></p>
          <p>Alert Threshold: <span id="alertThreshold">High</span></p>
          <p>Maintenance Mode: <span id="maintenanceMode">Off</span></p>
        </div>
      </div>
      <div class="sidebar">
        <div class="info-box">
          <h3>Setting Actions</h3>
          <button id="updateSettings">Update Settings</button>
          <button id="restoreDefaults">Restore Defaults</button>
        </div>
      </div>
    `
  };

  // Create functionality in navigation buttons
  function createNavigation(activeSection) {
    return `
      <h1>Quick Menu</h1>
      <nav class="menu">
        ${Object.keys(sections).map(section => 
          `<button class="menu-item${section === activeSection ? ' active' : ''}" data-section="${section}">${section}</button>`
        ).join('')}
      </nav>
    `;
  }
// Update content when buttons are clicked
  function updateContent(section) {
    const navigation = createNavigation(section);
    contentArea.innerHTML = `
      <div class="container">
        ${navigation}
        <div class="content">
          ${sections[section]}
        </div>
      </div>
    `;
    attachEventListeners();
    updateSectionContent(section);
  }
  // Attach event listeners to our menu items
  function attachEventListeners() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const section = e.target.getAttribute('data-section');
        updateContent(section);
      });
    });

    // Attach event listeners to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', handleButtonClick);
    });
  }
  // Biiiig function for button clicks. This blows, but I got limited time.
  function handleButtonClick(e) {
    const buttonId = e.target.id;
    switch (buttonId) {
      case 'restartSensors':
        restartSensors();
        break;
      case 'resetServer':
        resetServer();
        break;
      case 'addSensor':
        addSensor();
        break;
      case 'calibrateSensors':
        calibrateSensors();
        break;
      case 'exportLogs':
        exportLogs();
        break;
      case 'clearLogs':
        clearLogs();
        break;
      case 'updateSettings':
        updateSettings();
        break;
      case 'restoreDefaults':
        restoreDefaults();
        break;
    }
  }
// Update when we click into new tabs
  function updateSectionContent(section) {
    switch (section) {
      case 'Dashboard':
        updateDashboard();
        break;
      case 'Sensors':
        updateSensors();
        break;
      case 'Logs':
        updateLogs();
        break;
      case 'Settings':
        updateSettings();
        break;
    }
  }
// Function to restart all sensors
function restartSensors() {
  console.log('Restarting sensors...');
  sensors = sensors.map(sensor => ({ ...sensor, status: 'Online' }));
  updateDashboard();
}

// Function to simulate server reset
function resetServer() {
  console.log('Resetting server...');
  setTimeout(() => {
    sensors = sensors.map(sensor => ({ ...sensor, status: 'Online' }));
    updateDashboard();
    alert('Server has been reset successfully.');
  }, 2000);
}

// Function to add a new sensor
function addSensor() {
  console.log('Adding new sensor...');
  const type = prompt('Enter sensor type (Smoke, Fire, or Heat):');
  const delay = parseInt(prompt('Enter sensor delay time (in seconds):'), 10);
  
  if (type && !isNaN(delay)) {
    const newSensor = {
      id: sensors.length + 1,
      type: type,
      status: 'Online',
      delay: delay
    };
    sensors.push(newSensor);
    updateSensors();
    updateDashboard();
    alert(`New ${type} sensor added with ${delay}s delay.`);
  } else {
    alert('Invalid input. Sensor not added.');
  }
}

// Function to calibrate all online sensors
function calibrateSensors() {
  console.log('Calibrating sensors...');
  let calibratedCount = 0;
  sensors = sensors.map(sensor => {
    if (sensor.status === 'Online') {
      calibratedCount++;
      return { ...sensor, status: 'Calibrated' };
    }
    return sensor;
  });
  updateSensors();
  updateDashboard();
  alert(`${calibratedCount} sensors have been calibrated.`);
}

// Function to export sensor logs
function exportLogs() {
  console.log('Exporting logs...');
  const logs = sensors.map(sensor => 
    `Sensor ${sensor.id} (${sensor.type}): Status - ${sensor.status}, Delay - ${sensor.delay}s`
  ).join('\n');
  
  const blob = new Blob([logs], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sensor_logs.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to clear all logs and reset sensor statuses
function clearLogs() {
  console.log('Clearing logs...');
  if (confirm('Are you sure you want to clear all logs?')) {
    sensors = sensors.map(sensor => ({ ...sensor, status: 'Online' }));
    updateLogs();
    updateDashboard();
    alert('All logs have been cleared.');
  }
}

// Function to update system settings
function updateSettings() {
  console.log('Updating settings...');
  const currentEmail = document.getElementById('notificationEmail').textContent;
  const currentThreshold = document.getElementById('alertThreshold').textContent;
  const currentMaintenance = document.getElementById('maintenanceMode').textContent;

  const email = prompt('Enter new notification email:', currentEmail);
  const threshold = prompt('Enter new alert threshold (Low, Medium, High):', currentThreshold);
  const maintenance = confirm('Enable maintenance mode?');
  
  if (email && threshold) {
    document.getElementById('notificationEmail').textContent = email;
    document.getElementById('alertThreshold').textContent = threshold;
    document.getElementById('maintenanceMode').textContent = maintenance ? 'On' : 'Off';
    alert('Settings updated successfully.');
  } else {
    alert('Invalid input. Settings not updated.');
  }
}

// Function to restore default settings
function restoreDefaults() {
  console.log('Restoring default settings...');
  if (confirm('Are you sure you want to restore default settings?')) {
    document.getElementById('notificationEmail').textContent = 'admin@dynastydefense.com';
    document.getElementById('alertThreshold').textContent = 'Medium';
    document.getElementById('maintenanceMode').textContent = 'Off';
    sensors = [
      { id: 1, type: 'Smoke', status: 'Online', delay: 5 },
      { id: 2, type: 'Fire', status: 'Online', delay: 3 },
      { id: 3, type: 'Heat', status: 'Online', delay: 7 }
    ];
    updateSettingsDisplay();
    updateSensors();
    updateDashboard();
    alert('Default settings have been restored.');
  }
}

// Function to update the dashboard display
function updateDashboard() {
  const sensorStatus = document.getElementById('sensorStatus');
  sensorStatus.innerHTML = sensors.map(sensor => `
    <p>${sensor.type}: <span style="color: ${sensor.status === 'Online' ? 'rgb(23, 231, 23)' : 'rgb(238, 63, 57)'};">${sensor.status}</span></p>
  `).join('');
  
  const activityLog = document.getElementById('activityLog');
  activityLog.innerHTML = `
    <h4>${new Date().toLocaleString()}</h4>
    <p>Sensor statuses updated:</p>
    ${sensors.map(sensor => `<p>${sensor.type} (ID: ${sensor.id}): ${sensor.status}</p>`).join('')}
  `;
}

// Function to update the sensors display
function updateSensors() {
  const totalSensors = sensors.length;
  const activeSensors = sensors.filter(s => s.status === 'Online' || s.status === 'Calibrated').length;
  const inactiveSensors = totalSensors - activeSensors;
  
  document.getElementById('totalSensors').textContent = totalSensors;
  document.getElementById('activeSensors').textContent = activeSensors;
  document.getElementById('inactiveSensors').textContent = inactiveSensors;
  
  // Update sensor list display
  const sensorList = document.getElementById('sensorList') || document.createElement('div');
  sensorList.id = 'sensorList';
  sensorList.innerHTML = `
    <h3>Sensor List</h3>
    ${sensors.map(sensor => `
      <p>ID: ${sensor.id}, Type: ${sensor.type}, Status: ${sensor.status}, Delay: ${sensor.delay}s</p>
    `).join('')}
  `;
  
  const mainContent = document.querySelector('.main-content');
  if (!document.getElementById('sensorList')) {
    mainContent.appendChild(sensorList);
  }
}

// Function to update the logs display
function updateLogs() {
  const systemLogs = document.getElementById('systemLogs');
  systemLogs.innerHTML = `
    <p>${new Date().toLocaleString()} - System logs updated</p>
    ${sensors.map(sensor => `
      <p>Sensor ${sensor.id} (${sensor.type}): Status - ${sensor.status}, Delay - ${sensor.delay}s</p>
    `).join('')}
  `;
}

// Function to update the settings display
function updateSettingsDisplay() {
  const email = document.getElementById('notificationEmail').textContent;
  const threshold = document.getElementById('alertThreshold').textContent;
  const maintenance = document.getElementById('maintenanceMode').textContent;

  document.getElementById('notificationEmail').textContent = email;
  document.getElementById('alertThreshold').textContent = threshold;
  document.getElementById('maintenanceMode').textContent = maintenance;
}

// Function to handle button clicks
function handleButtonClick(e) {
  const buttonId = e.target.id;
  switch (buttonId) {
    case 'restartSensors':
      restartSensors();
      break;
    case 'resetServer':
      resetServer();
      break;
    case 'addSensor':
      addSensor();
      break;
    case 'calibrateSensors':
      calibrateSensors();
      break;
    case 'exportLogs':
      exportLogs();
      break;
    case 'clearLogs':
      clearLogs();
      break;
    case 'updateSettings':
      updateSettings();
      break;
    case 'restoreDefaults':
      restoreDefaults();
      break;
  }
}

// Function to update content when switching sections
function updateContent(section) {
  const navigation = createNavigation(section);
  contentArea.innerHTML = `
    <div class="container">
      ${navigation}
      <div class="content">
        ${sections[section]}
      </div>
    </div>
  `;
  attachEventListeners();
  updateSectionContent(section);
}

// Function to update section-specific content
function updateSectionContent(section) {
  switch (section) {
    case 'Dashboard':
      updateDashboard();
      break;
    case 'Sensors':
      updateSensors();
      break;
    case 'Logs':
      updateLogs();
      break;
    case 'Settings':
      updateSettingsDisplay();
      break;
  }
}

  // Initialize with Dashboard content
  updateContent('Dashboard');
});