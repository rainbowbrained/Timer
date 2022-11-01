const { contextBridge, ipcRenderer } = require('electron')
const path = require('path'); 
const fs = require('fs');
  
function read_from_json(filepath) {  
    return fs.readFileSync( path.join(__dirname, filepath) ,'utf8') 
};


function write_to_json(filepath, newinfo) { 
    var jsonString = JSON.stringify(newinfo, null, 2) 
    fs.writeFile( path.join(__dirname, filepath) , jsonString, err => {
        if (err) {
            alert('Error writing file', err)
        } else { 
        }
    }) 
};


//const d =  read_from_json(filepath);

contextBridge.exposeInMainWorld(
    'dashboard_data',
    { 
        getData:  (filepath) => read_from_json(filepath), 
        setData:  (filepath, newinfo) => write_to_json(filepath, newinfo), 
        sendToServer: ( topic, newinfo) =>  ipcRenderer.send("publish_request", {topic:topic, msg:newinfo}), 
        ipc: {
            on: (channel , event_callback ) => ipcRenderer.on(channel, event_callback),
            send: (channel , data   ) => ipcRenderer.send(channel, data),  
            removeListener: (channel) =>
              ipcRenderer.removeListener(channel ),
            removeListeners: (channel ) =>
              ipcRenderer.removeAllListeners(channel)
          },
        //mydata: d
    }
)
 

ipcRenderer.on("publish_confirm", (event, data) => {
    console.log(data.success);
  });

  ipcRenderer.on("get_server_data", (event, data) => {
   // ipcRenderer.send("publish_request", {topic:"algs/drivethru/counter/68C3C2286F24", msg: "1234#"})  
    //console.log(data.topic, data.msg);
  });
