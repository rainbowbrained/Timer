# Timer
Electron-based gamification  system for drive-trhough restaurants to improve perfomance.


## Technologies
- [Electron](https://electronjs.org/)
- [Electron-Forge](https://www.electronforge.io/) 
- [MYQTT](https://www.npmjs.com/package/mqtt/)
- [MySQL](https://www.npmjs.com/package/mysql/) 
- [Bootstrap](https://getbootstrap.com/)  

## Features
- :cloud: Getting data about cars from MQTT server.
- :file: Storing dashboard configuration and data locally in MySQL database.
- :key: HTML templates for settings.
- :keyboard: Convenient onscreen keyboard.
- :bookmark_tabs: Reports for cars, settings and trends.
- :clipboard: Save Report as PDF and CSV.
- :car: Changing colors depending on goals!
- :sparkles: Friendly UI & UX and Has nice looking window. 

## Usage 
- Clone the project from this repo to your local machine: run `git clone https://github.com/rainbowbrained/Timer` 
- Open terminal and `cd` into the cloned folder, usually `cd Timer`. 
- Run `npm install` to install dependencies, or run `npm install --include=dev` to install dev dependencies. Now it's ready to use for development.
- Run `npm run start` to run the app as desktop app.   
- Run `npm run package` to bundle your app code together with the Electron binary.  
- Run `npm run make` to create a distributable. This script runs `electron-forge package` automatically, and then uses  packaged app folder to create a separate distributable for each configured maker.   
After the script runs, you should see an **out** folder containing both the distributable (**out/make/...**) and a folder containing the packaged application code (**out/timer3-linux-x64** or similar). [See more here]( https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)  
 
### Project sructure 


- `node_modules` appears after installing dependecies.
- `out` appears after packaging an app.
- `package-lock.json` and `package.json` - default files, see how to use them here [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).
- `src` - main folder with html, css and js files.
    - `main.js` - the entry point of application. This script controls the main process: **connects and communicates with the server**, creates a webpage, **connects to data base** and **sends emails**. 
    - `preload.js` - this script is used to provide secure communication between other scripts, main and the whole Node.js APIs by using [ContextBridge](https://www.electronjs.org/docs/latest/api/context-bridge) and [IPC](https://www.electronjs.org/docs/latest/tutorial/ipc). It has the same sandbox as a Chrome extension. Read more about preload [here](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload).
    - `server_config.json` - connection settings, contains info about MQTT server. 
    - `database_config.json` - mySQL database settings. 
    - `settings_data` - dashboard configuration. This files should be fetched from the server, but in demo version they are stored locally. 
    - `templates` - folder with most html/css/js files and packages for rendering. See more [here](https://github.com/rainbowbrained/Timer/tree/master/src/templates).


```
├── node_modules
├── out
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── database_config.json
    ├── main.js
    ├── preload.js
    ├── renderer.js
    ├── server_config.json
    ├── settings_data
    │   ├── dashboard_elements.json
    │   ├── dashboard.json
    │   └── goals.json
    └── templates
        ├── assets
        │   ├── css
        │   │   ├── dashboard_settings.css
        │   │   ├── dashboard_style.css
        │   │   ├── images 
        │   │   │   └── ...
        │   │   ├── keyboardstyle.css
        │   │   ├── style.css 
        │   ├── js
        │   │   ├── dashboard_handler.js
        │   │   ├── dashboard.js
        │   │   ├── dashboard_settings.js
        │   │   ├── keyboard.js
        │   │   ├── main.js
        │   │   ├── reports_handler.js
        │   │   ├── script_cars.js
        │   │   ├──  widgets.js
        │   │   └── init-scripts 
        │   │       └── ...
        │   └── scss 
        │       └── ...
        ├── cardetectors-settings.html
        ├── dashboard.html
        ├── dashboard-settings.html
        ├── detectors-settings.html
        ├── network-settings.html
        ├── reports-settings.html
        ├── security-settings.html
        ├── store-settings.html
        ├── system-settings.html
        └── vendors
            ├── animate.css 
            ├── bootstrap  
            ...
```


## Screenshots
<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/dashboard.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/keyboard1.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/keayboard2.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/settings1.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/settings2.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/reports.jpg?raw=true" />
</p>

<p align="center">
  <img src="https://github.com/rainbowbrained/Timer/blob/main/screenshots/security.jpg?raw=true" />
</p>

