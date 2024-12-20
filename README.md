# DynDef
This repository hosts the web interface files for Dynasty Defense, complete with real-time monitoring, sensor integration, and robust security measures through HTML, CSS, JavaScript, and Regex-based filtering.
## Features
- **Real-time Monitoring**: Display live data from sensors and system components.
- **Regex-based Security**: Filters to block malicious inputs and potential injection attacks.
- **Interactive UI**: User-friendly interface with interactive elements to control and monitor the system.
- **Responsive Design**: Layout adapts to various screen sizes for desktop and mobile devices.
## Project Structure
- **index.html**: Login interface.
- **main.html** Main HTML template for the security system interface.
- **styles/**:
  - **style.css**: Stylesheet for the overall interface, ensuring responsive design and clear UI.
- **scripts/**:
  - **sectioning.js**: Core JavaScript for handling user interactions, notifications, and data validation.
  - **script.js**: Related code that is required, but does not fit a specific category.
  - **validation.js**: Holds all REGEX validation done client-side.
## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DDeluca06/DynDef
   cd DynDef
   ```
2. **Open the Interface**:
   - Open `index.html` in a web browser to view and test the system interface locally.
3. **Configuration**:
   - Modify `script.js` and `validation.js` to adjust filtering rules as needed.
   - Update `sectioning.js` as necessary in your specific setup.
## Security Concerns/Flaws
Hoo boy, where do we begin.
  - Everything is in `sectioning.js`. Everything. This is 400 lines long.
  - No cookie/login checking, you can go straight to main.html.
  - The logs function is so complicated it actually doesn't work.
  - It's all in local storage; easily interceptible.
  - Creating a const variable with the entire HTML setup is probably bad.
  - Why are there 6 functions to get a date?
  - Many, many more.
## Future Enhancements
  - Seperation of JavaScript
  - More manual review, much more
  - Full-width design
  - More emphesis on functionality
      - Time-budgeting
  - More user-control
## Contributing
- Contributions are welcome! Please create a pull request with detailed explanations of changes.
## Licensing
This project is licensed under the Mozilla Public License 2.0, with the addition that it may not be used for commercial purposes under any circumstance.

