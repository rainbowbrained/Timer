


let child_process = require("child_process");
const { app, dialog, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');
let mainWindow;

if (require('electron-squirrel-startup')) return app.quit();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'templates/dashboard.html'),
    protocol: 'file',
    slashes: true
  }))
  mainWindow.maximize();
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})

console.log(`Hello from Electron 👋`);



// ------- MQTT SERVER HANDLING ------- //
const mqtt = require('mqtt');
var connection_opts = JSON.parse(fs.readFileSync(path.join(__dirname, "./server_config.json"), 'utf8'));
var client = mqtt.connect(connection_opts);
var Topic = '#'; //subscribe to all topics 

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
  console.log("Connecting MQTT");
  client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
  console.log("Subscribed to " + Topic);
  if (err) { console.log(err); }
}

function mqtt_reconnect(err) {
  console.log("Reconnect MQTT");
  if (err) { console.log(err); }
  client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
  console.log("Error!");
  if (err) { console.log(err); }
}

function after_publish() {
  //do nothing
}

function mqtt_messsageReceived(topic, message, packet) {
  console.log('Topic=' + topic + '  Message=' + message);
  mainWindow.webContents.send("get_server_data", {topic: String(topic), msg:String(message)});
}

function mqtt_close() {
  console.log("Close MQTT");
}


//publish
function publish(publish_topic, msg, options) {
  console.log("publishing", msg);
  if (client.connected == true) {
    client.publish(publish_topic, msg, options);
  }
}

// subscribe and publish
var publish_topic = "algs/drivethru/counter/68C3C2286F24";
var message = "test message";
console.log("subscribing to topics");
client.subscribe(publish_topic, { qos: 1 }); //single topic 



// ------- DATABASE HANDLING ------- //
const mysql = require('mysql');
var db_opts = JSON.parse(fs.readFileSync(path.join(__dirname, "./database_config.json"), 'utf8'));
var db_connection = mysql.createConnection(db_opts);

db_connection.connect(function (err) {
  if (err) return console.error('error: ' + err.message);
  console.log("Database Connected!");
});

//insert a row into the tbl_messages table
function insert_message(topic, message_str, packet) {
  var message_arr = extract_string(message_str); //split a string into an array
  var clientID = message_arr[0];
  var message = message_arr[1];
  var sql = "INSERT INTO ?? (??,??,??) VALUES (?,?,?)";
  var params = ['tbl_messages', 'clientID', 'topic', 'message', clientID, topic, message];
  sql = mysql.format(sql, params);

  connection.query(sql, function (error, results) {
    if (error) throw error;
    console.log("Message added: " + message_str);
  });
};

//split a string into an array of substrings
function extract_string(message_str) {
  var message_arr = message_str.split(","); //convert to array	
  return message_arr;
};

//count number of delimiters in a string
var delimiter = ",";
function countInstances(message_str) {
  var substrings = message_str.split(delimiter);
  return substrings.length - 1;
};






// --------- SEND EMAILS ---------- //

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

/*
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); */



ipcMain.on("publish_request", (event, data) => {
  // Send result back to renderer process
  console.log(1);
  publish(data.topic, data.msg );

  // Send result back to renderer process
  mainWindow.webContents.send("publish_confirm", { success: true });
});

