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

