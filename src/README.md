### Project sructure 
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
        │   │   │   ├── car_green.png
        │   │   │   ├── car_green.png~
        │   │   │   ├── car_orange.png
        │   │   │   ├── car_orange.png~
        │   │   │   ├── car_red.png
        │   │   │   ├── logo.jpg
        │   │   │   └── logo.png
        │   │   ├── keyboardstyle.css
        │   │   ├── style.css
        │   │   └── style.css.map
        │   ├── js
        │   │   ├── dashboard_handler.js
        │   │   ├── dashboard.js
        │   │   ├── dashboard_settings.js
        │   │   ├── init-scripts
        │   │   │   ├── data-table
        │   │   │   │   └── datatables-init.js
        │   │   │   ├── flot-chart
        │   │   │   │   ├── curvedLines.js
        │   │   │   │   ├── flot-chart-init.js
        │   │   │   │   └── flot-tooltip
        │   │   │   │       └── jquery.flot.tooltip.min.js
        │   │   │   └── peitychart
        │   │   │       └── peitychart.init.js
        │   │   ├── keyboard.js
        │   │   ├── main.js
        │   │   ├── reports_handler.js
        │   │   ├── script_cars.js
        │   │   └── widgets.js
        │   └── scss
        │       ├── _gauge.scss
        │       ├── _socials.scss
        │       ├── style.scss
        │       ├── _switches.scss
        │       ├── _variables.scss
        │       └── _widgets.scss
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
            ├── chosen 
            ├── datatables.net 
            ├── datatables.net-bs4 
            ├── datatables.net-buttons 
            ├── datatables.net-buttons-bs4 
            ├── flot 
            ├── font-awesome 
            ├── jquery 
            ├── jquery-validation 
            ├── jquery-validation-unobtrusive 
            ├── pdfmake 
            ├── popper.js 
            ├── selectFX 
            └── themify-icons 
```
- `node_modules` appears after installing dependecies.
- `out` appears after packaging an app.
- `package-lock.json` and `package.json` - default files, see how to use them here [here](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).
- `src` - main folder with html, css and js files.
    - `main.js` - the entry point of application. This script controls the main process: **connects and communicates with the server**, creates a webpage, **connects to data base** and **sends emails**. 
    - `preload.js` - this script is used to provide secure communication between other scripts, main and the whole Node.js APIs by using [ContextBridge](https://www.electronjs.org/docs/latest/api/context-bridge) and [IPC](https://www.electronjs.org/docs/latest/tutorial/ipc). It has the same sandbox as a Chrome extension. Reaad more about preload [here](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload).


## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish


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
