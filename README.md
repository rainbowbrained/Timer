# Timer
Electron-based gamification  system for drive-trhough restaurants to improve perfomance.

 
## Technologies
- [Electron](https://electronjs.org/)
- [Electron-Forge](https://www.electronforge.io/) 
- [MYQTT](https://www.npmjs.com/package/mqtt/)
- [MySQL](https://www.npmjs.com/package/mysql/) 
    
## Features
- :cloud: Getting data about cars from MQTT server.
- :file: Storing dashboard configuration and data locally in MySQL database.
- :key: HTML templates for settings.
- :keyboard: Convenient onscreen keyboard.
- :bookmark_tabs: Reports for cars, settings and trends.
- :clipboard: Save Report as PDF and CSV.
- :car: Changing colors depending on goals!
- :sparkles: Friendly UI & UX and Has nice looking window. 
 

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


## Why
Mainly designed for small-to-medium companies, Storaji is a modern and very intuitive inventory management application built with some of the trendiest web technologies.
Right off the bat, it's worth pointing out that this is by no means a professional software for inventory management. Be that as it may, it can still prove itself fairly useful as it boasts an interesting set of primary features.

I believe there are many people who needs a simple tool to manage everything from product inventories to orders and of course it's free to use.

## Development

#### System Requirements
- NodeJS ^8.
- PHP ^7.
- PHP Composer.

#### Backend
- Clone the project from [IndomaximTechID/storaji](https://github.com/rainbowbrained/Timer) to your local machine.
- Open terminal and `cd` into the cloned folder, usually `cd Timer`.
- Run `npm install` to install dependencies. Or run `npm install --include=dev` to install dependencies.
- Run `cp .env.example .env` to copy the original environtment variables.
- Modify `.env` file, find `DATABASE_` prefix and change it to your database configuration, you can see documentation about this on [Laravel Site](https://laravel.com/docs/configuration#environment-configuration).
- Run `php artisan key:generate` to generate application key.
- Run `php artisan migrate` to create default database schema of storaji.
- Run `php artisan passport:install` to install default OAuth access token.
- Run `php artisan serve` to run PHP Built-in web server.
- Now your backend is ready to listen request from frontend at `https://localhost:8000/api`.

#### Frontend
- Clone the project from [IndomaximTechID/storaji-ui](https://github.com/IndomaximTechID/storaji-ui/) to your local machine.
- Open terminal and `cd` into the cloned folder, usually `cd storaji-ui`.
- Modify `app.ts` under `src/app/shared/classes/` directory, and change value of `api` to your local api server, usually `api: 'https://localhost:8000/api'`.
- Run `npm install` to install dependencies.
- Run `npm run ng:serve` to serve the app as web-based at `https://localhost:4200`.
- Now it's ready to use for development.

**When you have make changes and everything works on angular, and wanna check on desktop app.**
- Run `npm start` to build the app from source and run the app as desktop app.

**For linting and testing**
- Run `npm test` to check if the source code is passing from linting and testing.

> This is still in beta and it's far from perfect so feedbacks, issues or PRs are greatly appreciated! :)

Note that on Linux you will need additional dependencies to provide the `icns2png` and `gm` commands. Ubuntu/Debian users can run: `sudo apt install -y icnsutils graphicsmagick`.

## License
MIT License © 2017-Present [Indomaxim Technology](https://github.com/IndomaximTechID). All rights reserved.

## End User License Agreement (EULA)
- You will not use this repository for malicious activity.
- We / You will not support anyone who is violating this EULA conditions.
- Repository is just for learning / personal purposes thus should not be part of any service available on the Internet that is trying to do any malicious activity.

## Legal
This is a free and open source app. Use it at your own risk.
