  /*
alert(JSON.parse(window.dashboard_data.getData("./settings_data/dashboard.json") ).lane_type)
alert(JSON.parse(window.dashboard_data.getData("./settings_data/dashboard.json") ))
window.dashboard_data.setData("./settings_data/tmp.json", "{1 : 2 }") */
//alert(window.dashboard_data.d)


function open_section(section_id) { 
  var x = document.querySelectorAll(".sectiontab");
  for (const mytab of x) {
    mytab.classList.remove( 'show', 'active');
  } 
  document.getElementById(section_id).classList.add('show');  
  document.getElementById(section_id).classList.add('active');  
}


function settings_panel () {
  const mydash = document.querySelector('#dashboard_form '); 
  mydash.querySelector('#show_pulloff').addEventListener('change', (event) => {
    let selected_elems = mydash.querySelectorAll('#num_pulloff');
    selected_elems[0].hidden = !(event.currentTarget.checked); 
    selected_elems[1].hidden = !(event.currentTarget.checked); 
    selected_elems[2].hidden = !(event.currentTarget.checked); 
  }) 
  mydash.querySelector('#show_mobilepickup').addEventListener('change', (event) => {
    let selected_elems = mydash.querySelectorAll('#num_mobilepickup');
    selected_elems[0].hidden = !(event.currentTarget.checked); 
    selected_elems[1].hidden = !(event.currentTarget.checked); 
    selected_elems[2].hidden = !(event.currentTarget.checked);  
  })  
}

settings_panel()

function generate_dashboard_settings(dashboard_settings1, road_settings1) { 
  var dashboard_settings = JSON.parse(window.dashboard_data.getData("./settings_data/dashboard_elements.json"));  
  var road_settings  = JSON.parse(window.dashboard_data.getData("./settings_data/dashboard.json"));  
  const mydash = document.querySelector('.dashboard_set '); 
  let sectionnum = 0;
  for (const el of dashboard_settings.elements) {  
    sectionnum++; 
    if (el.disp) {
      var newelement = document.createElement('a'); 
      newelement.setAttribute('class', 'dashelement_set'); 
      newelement.style.gridRow = String(el.row);
      
      if (!el.hasOwnProperty('relative_size')) {
        // small element
        newelement.style.gridColumn = String(el.col) + ' / span 2';
      } else if (el.relative_size == 'medium') {
        newelement.style.gridColumn = String(el.col) + ' / span 3';
      } else if (el.relative_size == 'large') {
        newelement.style.gridColumn = String(el.col) + ' / span 4';
      } 
 
      var newtitle = document.createElement('div'); 
      newtitle.className = "timertitle_set"  
      newtitle.value = el.elem_title;
      newtitle.innerHTML = el.elem_title; 
      newelement.appendChild(newtitle); 
      
      var newmeasure = document.createElement('div');
      newmeasure.setAttribute('id', el.info_id);
      newmeasure.setAttribute('class', 'element_measure_set'); 
      if (el.measure_type == 'time') { 
        newmeasure.innerHTML = '0:00';
      } else if (el.measure_type == 'carnumber') { 
        newmeasure.innerHTML = '0';
      } else if (el.measure_type == '%goal') { 
        newmeasure.innerHTML = '0%';
      }
      newelement.appendChild(newmeasure);   

      if (el.hasOwnProperty('disp_average')) { 
        if (el.disp_average) {
          var avg = document.createElement('div');
          avg.setAttribute('class', 'undermeasure_set'); 
          if (el.measure_type == 'time') {
            avg.innerHTML = 'среднее время: <span class="undermeasure_val_set"> 0:00 </span>';
          } else if (el.measure_type == 'carnumber') { 
            avg.innerHTML = 'среднее количество: <span class="undermeasure_val_set"> 0 </span>';
          } else if (el.measure_type == '%goal') { 
            avg.innerHTML = 'средний процент: <span class="undermeasure_val_set"> 0% </span>'; 
          }
          newelement.appendChild(avg); 
        }
      } 

      if (el.hasOwnProperty('disp_goal')) {
        if (el.disp_goal) 
        {  var avg = document.createElement('div');
          avg.setAttribute('class', 'undermeasure_set');

          if (el.disp_average) {
            if (el.measure_type == 'time') {
              avg.innerHTML = 'норматив: <span class="undermeasure_val_set"> 0:00 </span>';
            } else if (el.measure_type == 'carnumber') { 
              avg.innerHTML = 'норматив: <span class="undermeasure_val_set"> 0 </span>';
            }
            newelement.appendChild(avg);}
        } 
      } 
      newelement.setAttribute('id',"section" +sectionnum+ "-tab"); 
      newelement.style.color = 'rgb(238, 238, 236)'; 
      newelement.setAttribute('data-bs-target', "section" + sectionnum); 
      newelement.onclick = function() {open_section(this.getAttribute('data-bs-target'))}; 
      mydash.appendChild(newelement); 
    } 
  }

  // setting roads
  const mycontainer = document.querySelector('.dashboard_container '); 
  var newroad = document.createElement('div'); 
  newroad.className = "road_top_set"  
  mycontainer.appendChild(newroad); 
  newroad = document.createElement('div'); 
  newroad.className = "road_right_set"  
  mycontainer.appendChild(newroad);   
    if ( road_settings.lane_type ==  '2-lane') { 
      newroad = document.createElement('div'); 
      newroad.className = "road_top_set"  
      newroad.classList.add("road_top_set_2")
      mycontainer.appendChild(newroad);   
      newroad = document.createElement('div');  
      newroad.className = "road_right_set"  
      newroad.classList.add("road_right_set_2")
      mycontainer.appendChild(newroad);    
    }
    else if ( road_settings.lane_type ==  'y-lane') { 
      newroad = document.createElement('div');  
      newroad.className = "road_right_set"  ;
      newroad.classList.add("road_right_set_y");
      mycontainer.appendChild(newroad);   
    }   

    //setting parking 
    if ( road_settings.disp_pull_forward) { 
      newroad = document.createElement('div');  
      newroad.className = "wait_area_set"  ;
      newroad.style.gridRow ="5"  ;
      for (let i = 0; i < road_settings.pull_forward_places; i++) {
        newroad.innerHTML += ' <div class="wait_area_item_set">  съезд №' + (1 +i)+ ' </div>  ';  
      }   
      mycontainer.appendChild(newroad);    
    }
    if ( road_settings.disp_mobileparking) { 
      newroad = document.createElement('div'); ;
      newroad.className = "wait_area_set"  ;
      newroad.style.gridRow = "6"  ;
      for (let i = 0; i < road_settings.mobileparking_places; i++) {
        newroad.innerHTML += ' <div class="wait_area_item_set"> заказ в приложении №' + (1+ i)+ ' </div>  ';  
      }   
      mycontainer.appendChild(newroad);    
    }

    let mydash_settings = document.querySelector('#section_setting_card');  
    for (let i = 1; i< 7; i++) { 

      let cur_tab =  document.querySelector('#section'+i);   
      let p_prime = mydash_settings.cloneNode(true);
      p_prime.id += i; 
      
      p_prime.setAttribute("display","block");
      p_prime.querySelector('#section_card_title').innerHTML += i; 
      p_prime.querySelector('#sectionname-input').value = dashboard_settings.elements[i-1].elem_title ; 
      
      p_prime.querySelector('#disp_average').checked = dashboard_settings.elements[i-1].disp_average ;  
      p_prime.querySelector('#avg_period').value = dashboard_settings.elements[i-1].avg_period ; 
      p_prime.querySelector('#avg_period').hidden = !dashboard_settings.elements[i-1].disp_average;
      p_prime.querySelector('#avg_period_label').hidden = !dashboard_settings.elements[i-1].disp_average; 

      p_prime.querySelector('#disp_average').addEventListener('change', (event) => {
        p_prime.querySelector('#avg_period').hidden = !(event.currentTarget.checked);
        p_prime.querySelector('#avg_period_label').hidden = !(event.currentTarget.checked);
      }) 

      p_prime.querySelector('#disp_prev').addEventListener('change', (event) => {
        p_prime.querySelector('#prev_period').hidden = !(event.currentTarget.checked);
        p_prime.querySelector('#prev_period_label').hidden = !(event.currentTarget.checked);
      }) 

      p_prime.querySelector('#disp_best').addEventListener('change', (event) => {
        p_prime.querySelector('#best_period').hidden = !(event.currentTarget.checked);
        p_prime.querySelector('#best_period_label').hidden = !(event.currentTarget.checked);
      }) 
      
      let but_submt = p_prime.querySelector('#submit'); 
      but_submt.onclick = function(event) {
        //event.preventDefault();
        if (confirm("Вы уверены, что хотите изменить ячейку №" + i + "?"  )) { 
          setDataSubmit(p_prime.querySelector('.form-horizontal'), i)
        }  
       };  
      cur_tab.appendChild(p_prime);    
    } 
}  
  
function setDataSubmit(form_obj, j) {
  var my_elements = JSON.parse(window.dashboard_data.getData("./settings_data/dashboard_elements.json"));  
  
  var elements = form_obj.elements;
  var obj = my_elements.elements[j-1]; 
  for(var i = 0 ; i < elements.length ; i++){
      var item = elements.item(i);
      alert(item.value )
      if (item.value == "on") {
        obj[item.id] = true;
      } else if (item.value == "off") {
        obj[item.id] = false;
      } else
      obj[item.id] = item.value;
  } 
  my_elements.elements[j-1] = obj;  
  window.dashboard_data.setData("./settings_data/dashboard_elements.json", my_elements)   
} 

  var el1 = {
    disp: true,
    row: 1,
    col: 1,
    info_id: 'id_menu',
    elem_title: 'Прием заказа',
    measure_type: 'time',
    disp_average: false,
    avg_period: 'day',
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
    relative_size: 'medium',
  };
  var el6 = {
    disp: false,
    row: 2,
    col: 1,
    info_id: 'id_carstotal',
    elem_title: 'Количество машин в час',
    measure_type: 'time',  //
    disp_average: 1,
    avg_period: 'hour',
    disp_goal: 1,
    goal_type: 'a',
    disp_best: 0,
    best_period: 'day',
    disp_pace: 0,
    relative_size: 'medium',
  };
  
  var dashboard_settings = {
    elements: [el1, el2, el3, el4, el5, el6],
    one: 1,
    1: 'some value',
  }; 
  
  var dashboard_config = {  
    lane_type :  'y-lane',
    disp_mobileparking : true,
    mobileparking_places:3,
    disp_pull_forward: true, // 2-e оккно выдачи
    pull_forward_places: 2,
    show_dp: true,
    time_format24: true, 
    max_queue_menu :10,
    max_queue_serv:10,
    max_queue_cash :10 
  };
   
  generate_dashboard_settings(dashboard_settings, dashboard_config);