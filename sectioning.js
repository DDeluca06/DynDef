document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.querySelector('.content');
  
    // Content for different sections
    const sections = {
      Dashboard: `
        <div class="main-content">
          <div class="info-box">
            <h3>Sensor Status</h3>
            <p>Smoke: <span style="color: rgb(238, 63, 57);">Tripped!</span></p>
            <p>Fire: <span style="color: rgb(238, 63, 57);">Disabled</span></p>
            <p>Heat: <span style="color: rgb(23, 231, 23);">Online</span></p>
          </div>
          <div class="info-box">
            <h3 id="recentact">Recent Activity</h3>
            <h4>10:11 AM - 10/24</h4>
            <p>Smoke Sensor was <span style="color: rgb(238, 63, 57);">tripped</span> on floor 7!</p>
            <h4>5:36 AM - 10/24</h4>
            <p>Heat Sensor was <span style="color: rgb(23, 231, 23);">activated</span> on floor 3.</p>
            <h4>9:15 PM - 10/23</h4>
            <p>Fire Sensor was <span style="color: rgb(238, 63, 57);">disabled</span> on ground floor!</p>
          </div>
        </div>
        <div class="sidebar">
          <div class="info-box">
            <h3>Quick Actions</h3>
            <button>Restart Sensors</button>
            <button>Reset Server</button>
          </div>
        </div>
      `,
      Sensors: `
        <div class="main-content">
          <div class="info-box">
            <h3>Sensor Details</h3>
            <p>Total Sensors: 15</p>
            <p>Active Sensors: 14</p>
            <p>Inactive Sensors: 1</p>
          </div>
        </div>
        <div class="sidebar">
          <div class="info-box">
            <h3>Sensor Actions</h3>
            <button>Add New Sensor</button>
            <button>Calibrate Sensors</button>
          </div>
        </div>
      `,
      Logs: `
        <div class="main-content">
          <div class="info-box">
            <h3>System Logs</h3>
            <p>10:11 AM - Smoke sensor triggered on floor 7</p>
            <p>5:36 AM - Heat sensor activated on floor 3</p>
            <p>9:15 PM - Fire sensor disabled on ground floor</p>
          </div>
        </div>
        <div class="sidebar">
          <div class="info-box">
            <h3>Log Actions</h3>
            <button>Export Logs</button>
            <button>Clear Logs</button>
          </div>
        </div>
      `,
      Settings: `
        <div class="main-content">
          <div class="info-box">
            <h3>System Settings</h3>
            <p>Notification Email: admin@dynastydefense.com</p>
            <p>Alert Threshold: High</p>
            <p>Maintenance Mode: Off</p>
          </div>
        </div>
        <div class="sidebar">
          <div class="info-box">
            <h3>Setting Actions</h3>
            <button>Update Settings</button>
            <button>Restore Defaults</button>
          </div>
        </div>
      `
    };
  
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
    }
  
    function attachEventListeners() {
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const section = e.target.getAttribute('data-section');
          updateContent(section);
        });
      });
    }
  
    // Initialize with Dashboard content
    updateContent('Dashboard');
  });