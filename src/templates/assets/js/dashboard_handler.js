var dashboard_settings = JSON.parse(window.dashboard_data.getData("./settings_data/dashboard_elements.json"));
var dashboard_config = JSON.parse(window.dashboard_data.getData("./settings_data/dashboard.json"));


function set_curdate() {
  var today = new Date();
  var date = 0;
  document.getElementById('curdate').innerText = date;
  switch (+today.getMonth()) {
    case 0:
      date = 'января';
      break;
    case 1:
      date = 'февраля';
      break;
    case 2:
      date = 'марта';
      break;
    case 3:
      date = 'апреля';
      break;
    case 4:
      date = 'мая';
      break;
    case 5:
      date = 'июня';
      break;
    case 6:
      date = 'июля';
      break;
    case 7:
      date = 'августа';
      break;
    case 8:
      date = 'сентября';
      break;
    case 9:
      date = 'октября';
      break;
    case 10:
      date = 'ноября';
      break;
    case 10:
      date = 'декабря';
      break;

    default:
      date = 0;
  }
  date = today.getDate() + ' ' + date + ' ' + today.getFullYear() + ' г. ';
  document.getElementById('curdate').innerText = date;
}

function set_curweekday() {
  var today = new Date();
  var date = 0;
  switch (+today.getDay()) {
    case 0:
      date = 'Воскресенье';
      break;
    case 1:
      date = 'Понедельник';
      break;
    case 2:
      date = 'Вторник';
      break;
    case 3:
      date = 'Среда';
      break;
    case 4:
      date = 'Четверг';
      break;
    case 5:
      date = 'Пятница';
      break;
    case 6:
      date = 'Суббота';
      break;

    default:
      date = 0;
  }
  document.getElementById('curweekday').innerHTML = date;
}

// handle clocks  on the dashboard
function start_curtime() {
  timerInterval = setInterval(() => {
    var today = new Date();
    var date = '';
    if (today.getHours() < 10) {
      date = '0' + today.getHours();
    } else {
      date = today.getHours();
    }
    if (today.getMinutes() < 10) {
      date = date + ':0' + today.getMinutes();
    } else {
      date = date + ':' + today.getMinutes();
    }
    if (today.getSeconds() < 10) {
      date = date + ':0' + today.getSeconds();
    } else {
      date = date + ':' + today.getSeconds();
    }
    // Обновляем метку оставшегося времени
    document.getElementById('curtime').innerHTML = date;
  }, 1000);
}



function set_avg_color(stringid) {
  let avgtime = document.getElementById(stringid).nextElementSibling
    .nextElementSibling.firstElementChild;
  let goaltime = document.getElementById(stringid).nextElementSibling
    .nextElementSibling.nextElementSibling.firstElementChild;
  //avgtime.style.color = "blue";
  //document.getElementById("elem_reset").value = avgtime;
  if (avgtime.textContent < goaltime.textContent) {
    avgtime.style.color = 'green';
  } else if (avgtime.textContent >= goaltime.textContent) {
    avgtime.style.color = 'orange';
  }
}

function generate_dashboard_elements(settings) {
  const mydash = document.querySelector('.dashboard');
  for (const el of settings.elements) {
    document.getElementById('curtime').innerHTML = 123;
    if (el.disp) {
      var newelement = document.createElement('div');
      newelement.setAttribute('class', 'dashelement');
      newelement.setAttribute('id', el.info_type);
      newelement.style.gridRow = String(el.row);
      if (!el.hasOwnProperty('relative_size')) {
        // small element
        newelement.style.gridColumn = String(el.col) + ' / span 2';
      } else if (el.relative_size == 'medium') {
        newelement.style.gridColumn = String(el.col) + ' / span 3';
      } else if (el.relative_size == 'large') {
        newelement.style.gridColumn = String(el.col) + ' / span 4';
      }

      var newtitle = document.createElement('label');
      newtitle.innerText = el.elem_title;
      newelement.appendChild(newtitle);
      //newelement.appendChild(document.createElement('hr'));
      var newmeasure = document.createElement('div');
      newmeasure.setAttribute('id', el.info_id);
      newmeasure.setAttribute('class', 'element_measure');

      if (el.measure_type == 'time') {
        newmeasure.innerHTML =
          '<span class="minute">0</span>:<span class="second">00</span>';
      } else if (el.measure_type == 'carnumber') {
        newmeasure.innerHTML = '0';
      } else if (el.measure_type == '%goal') {
        newmeasure.innerHTML = '0%';
      }
      newelement.appendChild(newmeasure);
      //newelement.appendChild(document.createElement('hr'));

      if (el.hasOwnProperty('disp_average')) {
        if (el.disp_average) {
          var avg = document.createElement('div');
          if (el.measure_type == 'time') {
            avg.setAttribute('class', 'avg_time');
            avg.innerHTML =
              'среднее время: <span class="avg_time_val"> 0:00 </span>';
          } else if (el.measure_type == 'carnumber') {
            avg.setAttribute('class', 'avg_cars');
            avg.innerHTML =
              'среднее количество: <span class="avg_cars_val"> 00 </span>';
          }
          newelement.appendChild(avg);
        }
      }
      if (el.hasOwnProperty('disp_goal')) {
        if (el.disp_goal) {
          var goal = document.createElement('div');
          goal.setAttribute('class', 'goal_time');
          goal.innerHTML =
            'норматив: <span class="goal_time_val"> 0:30 </span>';
          newelement.appendChild(goal);
        }
      }
    }
    mydash.appendChild(newelement);
  }
}

function generate_dashboard(settings) {
  let mydash = document.querySelector('.dashboard');

  if (settings.disp_mobileparking | settings.disp_pull_forward) {
    mydash.style.left = '300px';
    var roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'road road_parking');
    document.body.appendChild(roadelem);
  } else {
    mydash.style.left = '50px';
  }

  document.body.innerHTML +=
    ' <p class="roadgradtop"></p>' +
    ' <p class="roadgradright"></p>' +
    ' <p class="road"></p>' +
    ' <p class="innerroad"></p>' +

    ' <p class="roadwindow roadmenu"></p>' +
    ' <p class="roadwindow roadcash"></p>' +
    ' <p class="roadwindow roadserv"></p>' +

    ' <div class="roadnames roadservname">service</div>' +
    ' <div class="roadnames roadmenuname">menu</div>' +
    ' <div class="roadnames roadcashname">cashier</div> ';

  if (settings.lane_type == '1-lane') {
    let mydash = document.querySelector('.dashboard');
    mydash.style.right = '150px';
    mydash.style.top = '210px';
  }
  else if (settings.lane_type == 'y-lane') {
    let mydash = document.querySelector('.dashboard');
    mydash.style.right = '260px';
    mydash.style.top = '210px';
    var roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'road road_y');
    var compStyles_road = window.getComputedStyle(
      document.querySelector('.road'));
    let tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);

    roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'roadgradright roadgradright_y');
    compStyles_road = window.getComputedStyle(
      document.querySelector('.roadgradright'));
    tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);

    roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'innerroad innerroad_y');
    compStyles_road = window.getComputedStyle(
      document.querySelector('.innerroad'));
    tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);
    document.body.innerHTML +=
      ' <p class="roadwindow roadmenu_2"></p>' +
      ' <div class="roadnames roadmenuname_2">menu2</div>';
  }
  else if (settings.lane_type == '2-lane') {
    let mydash = document.querySelector('.dashboard');
    mydash.style.right = '260px';
    mydash.style.top = '320px';


    var roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'road road_2');
    var compStyles_road = window.getComputedStyle(
      document.querySelector('.road'));
    let tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);


    roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'roadgradtop roadgradtop_2');
    compStyles_road = window.getComputedStyle(
      document.querySelector('.roadgradtop'));
    tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);


    roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'roadgradright roadgradright_2');
    document.body.appendChild(roadelem);

    roadelem = document.createElement('div');
    roadelem.setAttribute('class', 'innerroad innerroad_2');
    compStyles_road = window.getComputedStyle(
      document.querySelector('.innerroad'));
    tmp_style_pos = compStyles_road.getPropertyValue('top');
    document.body.appendChild(roadelem);

    document.body.innerHTML +=
      ' <p class="roadwindow roadmenu_2"></p>' +
      ' <p class="roadwindow roadcash_2"></p>' +
      ' <p class="roadwindow roadserv_2"></p>' +

      ' <div class="roadnames roadservname_2">service 2</div>' +
      ' <div class="roadnames roadmenuname_2">menu 2</div>' +
      ' <div class="roadnames roadcashname_2">cashier 2</div> ';
  }

  generate_parking((settings.lane_type == '2-lane'), settings.disp_mobileparking, settings.mobileparking_places, settings.disp_pull_forward, settings.pull_forward_places);

}

function generate_parking(movedown, dispmobile, places_num, disp_pullof, pullof_num) {
  let tmptop = '';
  if (dispmobile) {
    let el = document.createElement('div');
    el.setAttribute('class', 'wait_area');
    el.setAttribute('id', 'mobile_pickup_dash');
    if (movedown) {
      el.style.top = '320px';
      if (disp_pullof) {
        el.style.bottom = '35%';
        tmptop = '70%';
      }
    } else if (disp_pullof) {
      el.style.bottom = '45%';
      tmptop = '60%';
    }
    document.body.appendChild(el);
    for (let i = 0; i < places_num; i++) {
      el.innerHTML += ' <div class="wait_area_item"> <div class="wait_area_item_sideline">  </div> <div class="wait_area_item_space" id = "mobileparking' + i + ' "> mobile pick-up  №' + i + 1 + ' </div>  <div class="wait_area_item_sideline"> </div> </div> ';
    }
  }
  if (disp_pullof) {
    let el = document.createElement('div');
    el.setAttribute('class', 'wait_area');
    el.setAttribute('id', 'pullof_dash');
    if (tmptop) {
      el.style.top = tmptop;
    } else if (movedown) {
      el.style.top = '320px';
    }
    document.body.appendChild(el);
    for (let i = 0; i < pullof_num; i++) {
      el.innerHTML += ' <div class="wait_area_item"> <div class="wait_area_item_sideline">  </div> <div class="wait_area_item_space" id = "mobileparking' + i + ' "> pull-of place №' + i + 1 + ' </div>  <div class="wait_area_item_sideline"> </div> </div> ';
    }
  }

};


function read_from_json() {
  fs.readFile("./settings_data/dashboard.json", "utf8", (err, jsonString) => {
    if (err) {
      alert("Error reading file from disk:", err);
      return;
    }
    try {
      const dashboard_config1 = JSON.parse(jsonString);
      alert(dashboard_config1.lane_type);
      alert(dashboard_config1);
      alert(jsonString);
    } catch (err) {
      alert("Error parsing JSON string:", err);
    }
  });
  fs.readFile("./settings_data/dashboard_elements.json", "utf8", (err, jsonString) => {
    if (err) {
      alert("Error reading file from disk:", err);
      return;
    }
    try {
      alert(jsonString)
      const dashboard_settings1 = JSON.parse(jsonString);
      alert("Customer address is:", dashboard_settings1); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      alert("Error parsing JSON string:", err);
    }
  });
};

function write_to_json() {
  var jsonString = JSON.stringify(dashboard_settings, null, 2)
  //alert(jsonString);
  fs.writeFile("./settings_data/dashboard_elements.json", jsonString, err => {
    if (err) {
      alert('Error writing file', err)
    }
  })
  jsonString = JSON.stringify(dashboard_config, null, 2)
  //alert(jsonString);
  fs.writeFile("./settings_data/dashboard.json", jsonString, err => {
    if (err) {
      alert('Error writing file', err)
    }
  })

};


var el1 = {
  disp: true,
  row: 1,
  col: 1,
  info_id: 'id_menu',
  elem_title: 'Прием заказа',
  measure_type: 'time',
  disp_average: true,
  avg_period: 'hour',
  disp_goal: true,
  goal_type: 'a',
};
var el2 = {
  disp: true,
  row: 1,
  col: 3,
  info_id: 'id_cash',
  elem_title: 'Оплата заказа',
  measure_type: '%goal',
  disp_average: true,
  avg_period: 'hour',
  disp_goal: true,
  goal_type: 'a',
};
var el3 = {
  disp: true,
  row: 1,
  col: 5,
  info_id: 'id_serv',
  elem_title: 'Выдача заказа',
  measure_type: 'time',
  disp_average: true,
  avg_period: 'hour',
  disp_goal: true,
  goal_type: 'a',
};
var el4 = {
  disp: true,
  row: 2,
  col: 1,
  info_id: 'id_lanetotal',
  elem_title: 'Общее время на линии',
  measure_type: 'time',
  disp_average: 1,
  avg_period: 'hour',
  disp_goal: 1,
  goal_type: 'a'
  //relative_size: 'medium',
};
var el5 = {
  disp: true,
  row: 2,
  col: 3,
  info_id: 'id_carstotal',
  elem_title: 'Количество машин в час',
  measure_type: 'carnumber',
  disp_average: 1,
  avg_period: 'hour',
  disp_goal: 1,
  goal_type: 'a',
  disp_best: 0,
  best_period: 'day',
  disp_pace: 0,
  relative_size: 'large',
};
var el6 = {
  disp: false,
  row: 2,
  col: 1,
  info_id: 'id_carstotal',
  elem_title: 'Количество машин в час',
  measure_type: 'time',
  disp_average: 1,
  avg_period: 'hour',
  disp_goal: 1,
  goal_type: 'a',
  disp_best: 0,
  best_period: 'day',
  disp_pace: 0,
  relative_size: 'medium',
};

/*
var dashboard_settings = {
  elements: [el1, el2, el3, el4, el5, el6],
  one: 1,
  1: 'some value',
};

var dashboard_config = {
  lane_type :  '2-lane',
  disp_mobileparking : true,
  mobileparking_places:5,
  disp_pull_forward: true, // 2-e оккно выдачи
  pull_forward_places: 3,
  show_dp: true,
  time_format24: true,
  max_queue_menu :10,
  max_queue_serv:10,
  max_queue_cash :10
};
*/
//write_to_json();
//read_from_json() ;

