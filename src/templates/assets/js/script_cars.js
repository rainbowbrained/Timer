
// signals about cars
window.dashboard_data.ipc.on("get_server_data", (event, data) => {
  console.log(data.topic, data.msg);
  var paragraph = data.topic;
  if (paragraph.search(/line/) > -1) {
    if (paragraph.search(/premenu/) > -1) {
      // ...
    } else if (paragraph.search(/order1/) > -1) {
      // car_isordering(1) 
    } else if (paragraph.search(/order2/) > -1) {
      // car_isordering(1.1)  
    } else if (paragraph.search(/cashier/) > -1) {
      // car_ispaying(3) 
    } else if (paragraph.search(/service/) > -1) {
      // car_inservice(5) 
    } else if (paragraph.search(/danger/) > -1) {

    } else {
      // other messages
    }
  } else if (paragraph.search(/queue/) > -1) {
    if (paragraph.search(/premenu/) > -1) {
      // ...
    } else if (paragraph.search(/order/) > -1) {
      // car_arrived() 
    } else if (paragraph.search(/cashier/) > -1) {
      // car_ordered(); 
    } else if (paragraph.search(/service/) > -1) {
      // car_payed();
    } else {
      // other messages
    }

  } else if (paragraph.search(/uptime/) > -1) {
    // do something

  } else {
    // other messages
  }
});

var dashboard_goals = JSON.parse(window.dashboard_data.getData("./settings_data/goals.json"));

var CarsArrayInfo = new Array(); // array of objects Car
var CarDatabase = new Array();
var carnum = 0;
var timerId = {
  menu: 0,
  menu2: 0,
  menu3: 0,
  cashier: 0,
  cashier2: 0,
  cashier3: 0,
  service: 0,
  service2: 0,
  service3: 0,
  lanetotal1: 0,
  lanetotal2: 0
}

// init of car object 
class Car {
  constructor(id) {
    this.goalA = dashboard_goals.cars_goalA; //seconds
    this.goalB = dashboard_goals.cars_goalB; //seconds

    let date = new Date();
    this.id = id;
    this.timestart = date.getTime();
    this.totaltime = '';
    this.orderqueue_time = '';
    this.ordertime = '';
    this.cashqueue_time = '';
    this.cashtime = '';
    this.servicequeue_time = '';
    this.service_time = '';
    this.mode = 0;
    // 0 = arrived
    // 1 = menu
    // optional: 1.5 = menu2
    // 2 = between menu and cashier
    // 3 = cashier
    // optional: 3.5 = cashier2
    // 4 = between cashier and service
    // 5 = service
    // optional: 5.5 = service2
    // 6 = pull off
    // 7 = mobile pickup
  }

  // cange color depending on a goal
  render() {
    let date = new Date();
    date = date.getTime() - this.timestart + 1;
    date = Math.floor(date / 1000); //seconds

    var car_img = document
      .getElementById(this.id)
      .querySelector('.car_object img');

    var holder = document
      .getElementById(this.id)
      .querySelector('.car_object_timer');

    if (date > this.goalB) {
      holder.style.color = 'red';
      car_img.classList.remove('img_orange');
      car_img.classList.add('img_red')

    } else if (date > this.goalA) {
      holder.style.color = 'orange';
      car_img.classList.remove('img_green');
      car_img.classList.add('img_orange');
    }

    let mins = Math.floor(date / 60);
    let secs = date % 60;
    if (secs < 10) {
      secs = '0' + secs;
    }
    this.totaltime = mins + ':' + secs;
    document.getElementById(this.id).querySelector('.car_object_timer').innerText = this.totaltime;
  }

  stop() {
    clearInterval(this.timer);
    this.totaltime = '';
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

function car_arrived() {
  //window.dashboard_data.ipc.send("publish_request", {topic:"algs/drivethru/counter/68C3C2286F24", msg: "1234#"})   

  var newcar = document.createElement('div');
  newcar.setAttribute('class', 'car_object');
  newcar.setAttribute('id', 'car' + carnum);
  newcar.style.zIndex = String(999 - carnum);
  const compStyles_menu = window.getComputedStyle(
    document.querySelector('.roadmenu')
  );

  let i = 0;
  let tmp_style_bot = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode >= 2 || CarsArrayInfo[i].mode == 0)
  ) {
    if (CarsArrayInfo[i].mode == 0)
      tmp_style_bot = parseInt(document.getElementById(CarsArrayInfo[i].id).style.bottom);
    i += 1;
  }

  // this car is the first to order
  if (tmp_style_bot == 0)
    tmp_style_bot = parseInt(compStyles_menu.getPropertyValue('bottom'));
  else if (tmp_style_bot > 250) tmp_style_bot = tmp_style_bot - 110;
  else tmp_style_bot = tmp_style_bot - 25;

  var holder = document.createElement('div');
  holder.setAttribute('class', 'car_object_timer');
  newcar.appendChild(holder);

  var myarr = document.createElement('div');
  myarr.setAttribute('class', 'arrow-right');
  newcar.appendChild(myarr);

  var car_image = document.createElement('img');
  car_image.classList.add('img_green');
  newcar.appendChild(car_image);
  document.body.appendChild(newcar);

  let newcarinfo = new Car('car' + carnum);
  newcarinfo.start();
  CarsArrayInfo.push(newcarinfo);
  carnum += 1;
  car_move_straight(newcar.id, '3px', '0px', '3px', tmp_style_bot + 'px');
}

function car_isordering(order_window) {
  // starting timers on panel
  if (order_window == 1) {
    timerId.menu = setInterval(generateTimePanels, 1000, 'id_menu');
  } else if (order_window == 1.1) {
    timerId.menu2 = setInterval(generateTimePanels, 1000, 'id_menu2');
  } else {
    timerId.menu3 = setInterval(generateTimePanels, 1000, 'id_menu3');
  }

  let i = 0;
  while (i < CarsArrayInfo.length && CarsArrayInfo[i].mode != 0) {
    i += 1;
  }
  if (i == CarsArrayInfo.length) {
    //there is no greet window
    car_arrived();
  }
  i = 0;
  while (i < CarsArrayInfo.length && CarsArrayInfo[i].mode >= 1) {
    i += 1;
  }

  let date = new Date();
  CarsArrayInfo[i].ordertime = date.getTime();
  const compStyles_menu = window.getComputedStyle(document.querySelector('.roadmenu'));

  let tmp_style_bot = parseInt(compStyles_menu.getPropertyValue('bottom')) + 80 + 'px';
  let tmp_style_right = document.getElementById(CarsArrayInfo[i].id).style.right;
  CarsArrayInfo[i].orderqueue_time = date.getTime();
  if (
    (i + 1 < CarsArrayInfo.length &&
      CarsArrayInfo[i + 1].mode < 2 &&
      CarsArrayInfo[i + 1].mode > 0) ||
    (i - 1 >= 0 &&
      CarsArrayInfo[i - 1].mode < 2 &&
      CarsArrayInfo[i - 1].mode > 0)
  ) {
    alert('Ошибка датчика: 2 машины на одном окне заказа.');
    //считаем что датчик выезда  не сработал
    car_ordered();
  }
  CarsArrayInfo[i].mode = order_window;
  car_move_straight(
    CarsArrayInfo[i].id,
    tmp_style_right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
    tmp_style_right,
    tmp_style_bot
  );
  i = 0;
  var tmp_style_bot_prev = parseInt(tmp_style_bot);
  while (i < CarsArrayInfo.length) {
    if (CarsArrayInfo[i].mode == 0) {
      tmp_style_bot = parseInt(document.getElementById(CarsArrayInfo[i].id).style.bottom);
      // alert(tmp_style_bot, tmp_style_bot_prev)

      if (tmp_style_bot_prev > 250) tmp_style_bot = tmp_style_bot_prev - 110;
      else tmp_style_bot = tmp_style_bot_prev - 25;

      tmp_style_bot_prev = tmp_style_bot;
      /*
      if (tmp_style_bot > 200) tmp_style_bot = tmp_style_bot + 110;
      else tmp_style_bot = tmp_style_bot + 25;
      */
      car_move_straight(
        CarsArrayInfo[i].id,
        document.getElementById(CarsArrayInfo[i].id).style.rights,
        document.getElementById(CarsArrayInfo[i].id).style.bottom,
        tmp_style_right,
        tmp_style_bot + 'px'
      );
    }
    i += 1;
  }
}

function car_ordered(order_window) {
  if (order_window == 1) {
    stopTimePanels('id_menu', timerId.menu);
  } else if (order_window == 1.1) {
    stopTimePanels('id_menu2', timerId.menu2);
  } else {
    stopTimePanels('id_menu3', timerId.menu3);
  }
  let i = 0;
  let tmp_style_right = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode >= 2 || CarsArrayInfo[i].mode < 1)
  ) {
    if (CarsArrayInfo[i].mode == 2)
      tmp_style_right = parseInt(
        document.getElementById(CarsArrayInfo[i].id).style.right
      );
    i += 1;
  }
  CarsArrayInfo[i].mode = 2;
  let date = new Date();
  CarsArrayInfo[i].ordertime = date.getTime();
  const compStyles_cash = window.getComputedStyle(
    document.querySelector('.roadcash')
  );
  var tmp_bottom = parseInt(compStyles_cash.getPropertyValue('bottom'));

  if (tmp_style_right == 0)
    tmp_style_right = parseInt(compStyles_cash.getPropertyValue('right')) - 150;
  else if (tmp_style_right > 250) tmp_style_right = tmp_style_right - 110;
  else tmp_style_right = tmp_style_right - 50;
  car_move_upright_corner(
    CarsArrayInfo[i].id,
    '3px', document.getElementById(CarsArrayInfo[i].id).style.bottom,
    tmp_style_right, tmp_bottom + 105 + 'px'
  );
}

function car_ispaying(cash_window) {
  // starting timers on panel
  if (cash_window == 3) {
    timerId.cashier = setInterval(generateTimePanels, 1000, 'id_cash');
  } else if (cash_window == 3.1) {
    timerId.cashier2 = setInterval(generateTimePanels, 1000, 'id_cash2');
  } else {
    timerId.cashier3 = setInterval(generateTimePanels, 1000, 'id_cash3');
  }

  // 3 = cashier
  // optional: 3.1 = cashier2, 3.2 = cashier2
  let date = new Date();
  let i = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode < 2 || CarsArrayInfo[i].mode >= 3)
  )
    i += 1;

  if (
    (i + 1 < CarsArrayInfo.length &&
      CarsArrayInfo[i + 1].mode < 4 &&
      CarsArrayInfo[i + 1].mode > 2) ||
    (i - 1 >= 0 &&
      CarsArrayInfo[i - 1].mode < 4 &&
      CarsArrayInfo[i - 1].mode > 2)
  ) {
    alert('Ошибка датчика: 2 машины на одном окне оплаты.');
    //считаем что датчик выезда  не сработал
    car_payed();
  }
  CarsArrayInfo[i].mode = cash_window;
  CarsArrayInfo[i].cashqueue_time = date.getTime();

  const compStyles_cash = window.getComputedStyle(
    document.querySelector('.roadcash')
  );
  let tmp_style_right = parseInt(compStyles_cash.getPropertyValue('right'));
  car_move_straight(
    CarsArrayInfo[i].id,
    document.getElementById(CarsArrayInfo[i].id).style.right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
    tmp_style_right - 30 + 'px',
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
  );
  i = 0;
  var tmp_style_right_prev = tmp_style_right;
  while (i < CarsArrayInfo.length) {
    if (CarsArrayInfo[i].mode == 2) {
      tmp_style_right = parseInt(document.getElementById(CarsArrayInfo[i].id).style.right);
      if (tmp_style_right_prev > 250) tmp_style_right = tmp_style_right_prev - 110;
      else tmp_style_right = tmp_style_right_prev - 25;

      tmp_style_right_prev = tmp_style_right;
      car_move_straight(
        CarsArrayInfo[i].id,
        document.getElementById(CarsArrayInfo[i].id).style.right,
        document.getElementById(CarsArrayInfo[i].id).style.bottom,
        tmp_style_right + 'px',
        document.getElementById(CarsArrayInfo[i].id).style.bottom,
      );
    }
    i += 1;
  }
}

function car_payed(cash_window) {
  if (cash_window == 3) {
    stopTimePanels('id_cash', timerId.cashier);
  } else if (cash_window == 3.1) {
    stopTimePanels('id_cash2', timerId.cashier2);
  } else {
    stopTimePanels('id_cash3', timerId.cashier3);
  }
  // 4 = between cashier and service
  let date = new Date();
  let tmp_style_right = 0;
  let i = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode < 3 || CarsArrayInfo[i].mode >= 4)
  ) {
    if (CarsArrayInfo[i].mode == 4)
      tmp_style_right = parseInt(
        document.getElementById(CarsArrayInfo[i].id).style.right
      );
    i += 1;
  }
  CarsArrayInfo[i].mode = 4;
  CarsArrayInfo[i].cashtime = date.getTime();

  const compStyles_serv = window.getComputedStyle(
    document.querySelector('.roadserv')
  );
  if (tmp_style_right == 0)
    tmp_style_right = parseInt(compStyles_serv.getPropertyValue('right')) - 120;
  else if (
    tmp_style_right >
    parseInt(compStyles_serv.getPropertyValue('right')) - 150
  )
    tmp_style_right = tmp_style_right - 80;
  else tmp_style_right = tmp_style_right - 15;

  car_move_upright_corner(
    CarsArrayInfo[i].id,
    document.getElementById(CarsArrayInfo[i].id).style.right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
    tmp_style_right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
  );
  //document.getElementById(CarsArrayInfo[i].id).style.left = '30%';
}

function car_inservice(service_window) {
  if (service_window == 5) {
    timerId.service = setInterval(generateTimePanels, 1000, 'id_serv');
  } else if (service_window == 5.1) {
    timerId.service2 = setInterval(generateTimePanels, 1000, 'id_serv2');
  } else {
    timerId.service3 = setInterval(generateTimePanels, 1000, 'id_serv3');
  }
  // 5 = service
  // optional: 5.1 = service2, 5.2 = service2
  let date = new Date();
  let i = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode < 4 || CarsArrayInfo[i].mode >= 5)
  )
    i += 1;
  if (
    (i + 1 < CarsArrayInfo.length && CarsArrayInfo[i + 1].mode > 4 && CarsArrayInfo[i + 1].mode < 6) ||
    (i - 1 >= 0 && CarsArrayInfo[i - 1].mode > 4 && CarsArrayInfo[i - 1].mode < 6)
  ) {
    alert('Ошибка датчика: 2 машины на одном окне выдачи.' + i);
    //считаем что датчик выезда  не сработал
    car_depart();
  }
  CarsArrayInfo[i].mode = 5;
  CarsArrayInfo[i].servicequeue_time = date.getTime();
  const compStyles_serv = window.getComputedStyle(
    document.querySelector('.roadserv')
  );
  car_move_straight(
    CarsArrayInfo[i].id,
    document.getElementById(CarsArrayInfo[i].id).style.right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
    parseInt(compStyles_serv.getPropertyValue('right')) - 30 + 'px',
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
  );

  i = 0;
  var tmp_style_right = parseInt(compStyles_serv.getPropertyValue('right')) - 30;
  var tmp_style_right_prev = tmp_style_right;
  while (i < CarsArrayInfo.length) {
    if (CarsArrayInfo[i].mode == 4) {
      tmp_style_right = tmp_style_right_prev - 50;
      tmp_style_right_prev = tmp_style_right;
      car_move_straight(
        CarsArrayInfo[i].id,
        document.getElementById(CarsArrayInfo[i].id).style.right,
        document.getElementById(CarsArrayInfo[i].id).style.bottom,
        tmp_style_right + 'px',
        document.getElementById(CarsArrayInfo[i].id).style.bottom,
      );
    }
    i += 1;
  }

}

function car_depart(service_window) {
  if (service_window == 5) {
    stopTimePanels('id_serv', timerId.service);
  } else if (service_window == 5.1) {
    stopTimePanels('id_serv2', timerId.service2);
  } else {
    stopTimePanels('id_serv3', timerId.service3);
  }
  let date_depart = new Date(); // time of depart
  CarsArrayInfo[0].service_time = date_depart.getTime();

  let time_arr = [
    CarsArrayInfo[0].timestart, //0
    CarsArrayInfo[0].orderqueue_time, //1
    CarsArrayInfo[0].ordertime,
    CarsArrayInfo[0].cashqueue_time, // 3
    CarsArrayInfo[0].cashtime,
    CarsArrayInfo[0].servicequeue_time, //5
    CarsArrayInfo[0].service_time, //6
    CarsArrayInfo[0].totaltime,
  ];

  let tmpdate = '';
  let today = date_depart.getTime() - time_arr[0];
  let mins = Math.floor(today / 60000);
  let secs = Math.floor(today / 1000) % 60;
  if (mins < 10) {
    tmpdate = tmpdate + '0' + mins;
  } else {
    tmpdate = mins;
  }
  if (secs < 10) {
    tmpdate = tmpdate + ':0' + secs;
  } else {
    tmpdate = tmpdate + ':' + secs;
  }
  CarsArrayInfo[0].totaltime = tmpdate;

  for (let i = 6; i > 0; i--) {
    tmpdate = '';
    today = time_arr[i] - time_arr[i - 1] + 1;
    mins = Math.floor(today / 60000);
    secs = Math.floor(today / 1000) % 60;
    if (mins < 10) {
      tmpdate = tmpdate + '0' + mins;
    } else {
      tmpdate = mins;
    }
    if (secs < 10) {
      tmpdate = tmpdate + ':0' + secs;
    } else {
      tmpdate = tmpdate + ':' + secs;
    }
    time_arr[i] = tmpdate;
  }

  //tmpdate =  time_arr[0].toLocaleString();
  let tmpdate2 = new Date(time_arr[0]);

  tmpdate =
    tmpdate2.getDate() +
    '/' +
    (tmpdate2.getMonth() + 1) +
    '/' +
    tmpdate2.getFullYear() +
    ' ' +
    tmpdate2.getHours() +
    ':';

  mins = tmpdate2.getMinutes();
  secs = tmpdate2.getSeconds();
  if (mins < 10) {
    tmpdate = tmpdate + '0' + mins;
  } else {
    tmpdate = tmpdate + mins;
  }
  if (secs < 10) {
    tmpdate = tmpdate + ':0' + secs;
  } else {
    tmpdate = tmpdate + ':' + secs;
  }

  CarsArrayInfo[0].timestart = tmpdate;
  CarsArrayInfo[0].orderqueue_time = time_arr[1];
  CarsArrayInfo[0].ordertime = time_arr[2];
  CarsArrayInfo[0].cashqueue_time = time_arr[3];
  CarsArrayInfo[0].cashtime = time_arr[4];
  CarsArrayInfo[0].servicequeue_time = time_arr[5];
  CarsArrayInfo[0].service_time = time_arr[6];

  const compStyles_body = window.getComputedStyle(document.body);
  let bodywidth = parseInt(compStyles_body.getPropertyValue('width')) + 200 + 'px';
  car_move_delete(
    CarsArrayInfo[0].id,
    document.getElementById(CarsArrayInfo[0].id).style.right,
    document.getElementById(CarsArrayInfo[0].id).style.bottom,
    bodywidth,
    document.getElementById(CarsArrayInfo[0].id).style.bottom
  );
}

function show_table1() {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement('table');
  const tblBody = document.createElement('tbody');
  const row1 = document.createElement('tr');
  for (let attr of [
    'id',
    'время приезда',
    'очередь на заказ',
    'время заказа',
    'очередь на оплату',
    'время оплаты',
    'очередь на выдачу',
    'выдача',
    'итого',
  ]) {
    const cell = document.createElement('td');
    const cellText = document.createTextNode(attr);
    cell.appendChild(cellText);
    row1.appendChild(cell);
  }
  tblBody.appendChild(row1);

  // creating all cells
  for (let i = 0; i < CarDatabase.length; i++) {
    // creates a table row
    const row = document.createElement('tr');
    for (let attr of [
      CarDatabase[i].id,
      CarDatabase[i].timestart,
      CarDatabase[i].orderqueue_time,
      CarDatabase[i].ordertime,
      CarDatabase[i].cashqueue_time,
      CarDatabase[i].cashtime,
      CarDatabase[i].servicequeue_time,
      CarDatabase[i].service_time,
      CarDatabase[i].totaltime,
    ]) {
      const cell = document.createElement('td');
      const cellText = document.createTextNode(attr);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute('border', '2');
}

function animate(options) {
  var start = performance.now();
  var reqId;

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;
    // текущее состояние анимации
    var progress = options.timing(timeFraction);
    options.draw(progress);
    if (timeFraction < 1) {
      reqId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(reqId);
    }
  });
}

function car_move_straight(car_id, pos1x, pos1y, pos2x, pos2y) {
  let animating_obj = document.getElementById(car_id);
  function makeEaseOut(timing) {
    return function (timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  }
  function quad(timeFraction) {
    return Math.pow(timeFraction, 3);
  }
  animating_obj.style.right = pos1x;
  animating_obj.style.bottom = pos1y;
  let quadEaseOut = makeEaseOut(quad);
  animate({
    duration: 2000,
    timing: quadEaseOut,
    draw: function (progress) {
      animating_obj.style.bottom =
        progress * (parseInt(pos2y) - parseInt(pos1y)) + parseInt(pos1y) + 'px';
      animating_obj.style.right =
        progress * (parseInt(pos2x) - parseInt(pos1x)) + parseInt(pos1x) + 'px';
      if (progress > 0.98) {
        return;
      }
    },
  });
}

function car_move_delete(car_id, pos1x, pos1y, pos2x, pos2y) {
  car_move_straight(car_id, pos1x, pos1y, pos2x, pos2y);

  setTimeout(() => {
    let departingcar = CarsArrayInfo.shift();
    CarDatabase.push(departingcar);
  }, 3000);
}

function car_move_upright_corner(car_id, pos1x, pos1y, pos2x, pos2y) {
  let animating_obj = document.getElementById(car_id);
  function makeEaseOut(timing) {
    return function (timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  }
  function quad(timeFraction) {
    return Math.pow(timeFraction, 3);
  }
  let quadEaseOut = makeEaseOut(quad);
  animating_obj.style.right = pos1x;
  animating_obj.style.bottom = pos1y;
  animate({
    duration: 3000,
    timing: quadEaseOut,
    draw: function (progress) {
      if (progress < 0.5) {
        animating_obj.style.right = pos1x;
        animating_obj.style.bottom =
          progress * 2 * (parseInt(pos2y) - parseInt(pos1y)) +
          parseInt(pos1y) + 'px';
      } else {
        if (!animating_obj.querySelector('.arrow-down')) {
          change_car_orientation_left(car_id);
        }
        animating_obj.style.right =
          (progress - 0.5) * 2 * (parseInt(pos2x) - parseInt(pos1x)) +
          parseInt(pos1x) +
          'px';
      }
      if (progress > 0.98) {
        animating_obj.style.bottom = pos2y;
        return;
      }
    },
  });
}

function car_move_parking_corner(car_id, pos1x, pos1y, pos2x, pos2y) {
  let animating_obj = document.getElementById(car_id);
  function makeEaseOut(timing) {
    return function (timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  }
  function quad(timeFraction) {
    return Math.pow(timeFraction, 3);
  }
  let quadEaseOut = makeEaseOut(quad);
  animating_obj.style.right = pos1x;
  animating_obj.style.bottom = pos1y;
  animate({
    duration: 3000,
    timing: quadEaseOut,
    draw: function (progress) {
      if (progress < 0.5) {
        if (!animating_obj.querySelector('.arrow-right')) {
          change_car_orientation_down(car_id);
        }
        animating_obj.style.right = pos1x;
        animating_obj.style.bottom =
          progress * 2 * (parseInt(pos2y) - parseInt(pos1y)) +
          parseInt(pos1y) +
          'px';
      } else {
        if (animating_obj.querySelector('.car_object img').style.left != '-30px') {
          change_car_orientation_parking(car_id);
        }
        animating_obj.style.right =
          (progress - 0.5) * 2 * (parseInt(pos2x) - parseInt(pos1x)) +
          parseInt(pos1x) +
          'px';
      }
      if (progress > 0.98) {
        animating_obj.style.bottom = pos2y;
        return;
      }
    },
  });
}

function change_car_orientation_left(car_id) {
  var imgChildNode = document
    .getElementById(car_id)
    .querySelector('.car_object img');

  imgChildNode.style.transform = 'rotate(270deg)';
  imgChildNode.style.top = '15px';
  //document.getElementById(car_id).style.top = '85px'; 

  var holder = document
    .getElementById(car_id)
    .querySelector('.car_object_timer');
  holder.style.top = '0';
  holder.style.left = '-20px';

  var myarr = document.getElementById(car_id).querySelector('.arrow-right');
  myarr.className = 'arrow-down';
}

function change_car_orientation_down(car_id) {
  var imgChildNode = document
    .getElementById(car_id)
    .querySelector('.car_object img');

  imgChildNode.style.transform = 'rotate(180deg)';
  imgChildNode.style.top = 'auto';
  //document.getElementById(car_id).style.top = '85px'; 

  var holder = document
    .getElementById(car_id)
    .querySelector('.car_object_timer');
  holder.style.top = '30px';
  holder.style.left = 'auto';
  holder.style.right = '0';

  var myarr = document.getElementById(car_id).querySelector('.arrow-down');
  myarr.className = 'arrow-right';
}

function change_car_orientation_parking(car_id) {
  var imgChildNode = document
    .getElementById(car_id)
    .querySelector('.car_object img');
  imgChildNode.style.transform = 'rotate(270deg)';
  imgChildNode.style.top = '-15px';
  imgChildNode.style.left = '-30px';
}

function car_onpullof() {
  let date = new Date();
  let tmp_style_right = 0;
  let i = 0;
  while (
    i < CarsArrayInfo.length &&
    (CarsArrayInfo[i].mode < 5 || CarsArrayInfo[i].mode == 7)
  ) {
    i += 1;
  }
  CarsArrayInfo[i].mode = 6;
  let place = document.querySelector('#pullof_dash');


  //const compStyles_place = window.getComputedStyle(place.querySelector('.wait_area_item_space'));
  const compStyles_place = window.getComputedStyle(place);
  const compStyles_place_elem = window.getComputedStyle(place.querySelectorAll('.wait_area_item')[2]);
  const compStyles_car = window.getComputedStyle(document.getElementById(CarsArrayInfo[i].id).querySelector('.car_object img'));
  //let place_center =  parseInt(compStyles_place.getPropertyValue('height'))/2;
  let place_center = parseInt(compStyles_car.getPropertyValue('height'));
  place_center -= parseInt(compStyles_place_elem.getPropertyValue('height')) / 4;

  car_move_parking_corner(
    CarsArrayInfo[i].id,
    document.getElementById(CarsArrayInfo[i].id).style.right,
    document.getElementById(CarsArrayInfo[i].id).style.bottom,
    parseInt(compStyles_place.getPropertyValue('right')) + 15 + 'px',
    parseInt(compStyles_place.getPropertyValue('bottom')) + place_center + 'px'
  );

  //document.getElementById(CarsArrayInfo[i].id).style.left = '30%';
}




// handle timers  on the dashboard elements
function generateTimePanels(stringid) {
  if (!document.getElementById(stringid)) {
    //there is no such element
    return
  };
  let second = document.getElementById(stringid).querySelector('.second');
  let minute = document.getElementById(stringid).querySelector('.minute');
  let goalA = 0;
  let goalB = 0;

  if (stringid.search(/menu/) > -1) {
    goalA = dashboard_goals.menu_goalA;
    goalB = dashboard_goals.menu_goalB;
  } else if (stringid.search(/cash/) > -1) {
    goalA = dashboard_goals.cash_goalA;
    goalB = dashboard_goals.cash_goalB;
  } else if (stringid.search(/serv/) > -1) {
    goalA = dashboard_goals.serv_goalA;
    goalB = dashboard_goals.serv_goalB;
  }

  if (!second || !minute) {
    if (document.getElementById(stringid).innerText.search(/%/) > -1) {
      let cur_percentage = parseInt(document.getElementById(stringid).innerText);
      document.getElementById(stringid).innerText = cur_percentage + 100/goalA  + '%';
      if (cur_percentage + 100/goalA > 100*goalB/goalA) {
        document.getElementById(stringid).style.color = 'red'; 
      } else if (cur_percentage + 100/goalA > 100) {
        document.getElementById(stringid).style.color = 'orange'; 
      } 
    }
    return
  }

  let second_num = +second.textContent + 1;
  let minute_num = +minute.textContent;

  if (second_num == 60) {
    second.textContent = '00';
    minute.textContent = minute_num + 1;
  } else {
    second.textContent = second_num < 10 ? '0' + second_num : second_num;
    minute.textContent = minute_num;
  }

  var total_seconds = minute_num * 60 + second_num;
  if (goalB > total_seconds) {
    document.getElementById(stringid).style.color = 'green';
  } else if (goalA > total_seconds) {
    document.getElementById(stringid).style.color = 'orange';
  } else {
    document.getElementById(stringid).style.color = 'red';
  } 
}

function stopTimePanels(stringid, timerId) {
  document.getElementById(stringid).style.color = 'green';
  clearInterval(timerId);

  let second = document.getElementById(stringid).querySelector('.second');
  let minute = document.getElementById(stringid).querySelector('.minute');
  if (!second || !minute) {
    if (document.getElementById(stringid).innerText.search(/%/) > -1) { 
      document.getElementById(stringid) =   '0%';
    }
    return
  }
  second.textContent = '00';
  minute.textContent = '0';
}
