let step2_btn = document.getElementById('step2_btn');
let step4_btn = document.getElementById('step4_btn');
let step6_btn = document.getElementById('step6_btn');
let member_selector = document.getElementById('member_selector_area');
let member_number_selector = document.getElementById('member_number_selector');



step2_btn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(null, { file: "includes/jquery-3.5.1.min.js" }, function() {
      chrome.tabs.executeScript(null, {file: 'fill_table_part1.js'});
    });
  });
};

step4_btn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(null, { file: "includes/jquery-3.5.1.min.js" }, function() {
      chrome.tabs.executeScript(null, {file: 'fill_table_part2.js'});
    });
  });
};



member_number_selector.onchange = function(element){
  $('#member_selector_hint').show();
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(null, { file: "includes/jquery-3.5.1.min.js" }, function() {
      //同步選擇並trigger
      chrome.tabs.executeScript(null, {code: "$('#ContentPlaceHolder1_teams_count option[value=\""+ member_number_selector.value + "\"]').attr('selected','selected');"});
      chrome.tabs.executeScript(null, {code: "location.href=\"javascript:__doPostBack('ctl00$ContentPlaceHolder1$teams_count','');\""});
    });
  });
  
  chrome.storage.sync.get('members', function(data) {
      var members = data['members'];
      var member_option = '';
      for(i = 0; i < members.length; i++){
          var option = `<option value=${i}>${members[i].name}</option>\n`;
          member_option += option;
      }
      //console.log(member_option);
      
      member_selector.innerHTML = "";
      for(i = 1; i <= member_number_selector.value; i++){
    　  var member_id = i;
        if(i == 1) member_id += "<br>(此隊員預設為領隊、申請人)";
        var component_member_select = `
        <div class="alert alert-primary" role="alert">
          <div class="row">
          <div class="col mb-2 align-self-center">
            <div>隊員 ${member_id}:</div>
          </div>
          </div>
          <div class="row">
          <div class="col lign-self-center">
            <select class="custom-select mr-sm-2 mb-2" name="member_selector" id=${i}>
              <option selected>請選擇</option>
              ${member_option}
            </select>
          </div>
        </div> 
        `;
        member_selector.insertAdjacentHTML( 'beforeend', component_member_select );
      }
  });
}


step6_btn.onclick = function(element) {
    
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        var selected_member = [];
        for(i = 1; i <= member_number_selector.value; i++){
            var idx = parseInt($('#member_selector_area').find('#' + i).val());
            selected_member.push(members[idx]);
        }
         
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(null, { file: "includes/jquery-3.5.1.min.js" }, function() {
            chrome.tabs.executeScript(null, {
                code: 'var selected_member = ' + JSON.stringify(selected_member) + ';'
            }, function() {
                chrome.tabs.executeScript(null, {file: 'fill_table_part3.js'});
            });
          });
        });
    });
};