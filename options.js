import TwCitySelector from './includes/tw-city-selector/tw-city-selector.js';

let tcs = new TwCitySelector({
    el: '.city-selector-set',
    elCounty: '.county', // 在 el 裡查找 element
    elDistrict: '.district', // 在 el 裡查找 element
    except: [
        '宜蘭縣@釣魚台列嶼',
        '金門縣@烏坵鄉'
    ]
});


let user_data_modal = $("#user_data_modal");
let modal_submit_btn = user_data_modal.find('#submit');




$('#new_member').click(function(){
    clean_modal_form();
    $('#form_modal_title').text('新增成員');
    modal_submit_btn.unbind('click');
    modal_submit_btn.click(function(){
        push_new_member();
    })
});



function push_new_member(){
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        
        var member_data = {
            name: user_data_modal.find('#name').val(),
            phone: user_data_modal.find('#phone').val(),
            cellphone: user_data_modal.find('#cellphone').val(),
            county: user_data_modal.find('#county').val(),
            district: user_data_modal.find('#district').val(),
            address: user_data_modal.find('#address').val(),
            email: user_data_modal.find('#email').val(),
            identity: user_data_modal.find('#identity').val(),
            gender: user_data_modal.find('#gender').val(),
            birthday_year: parseInt(user_data_modal.find('#birthday_year').val()),
            birthday_month: parseInt(user_data_modal.find('#birthday_month').val()),
            birthday_day: parseInt(user_data_modal.find('#birthday_day').val()),
            contactname: user_data_modal.find('#contactname').val(),
            contactphone: user_data_modal.find('#contactphone').val()
        };
        
        members.push(member_data);
        
        chrome.storage.sync.set({members: members}, function() {
          console.log("The member list has been updated.");
        });
        refresh_page();
        
        //for debug
        console.log(members);
    });
}

function clean_modal_form(){
    tcs.reset();
    user_data_modal.find('#name').val('');
    user_data_modal.find('#phone').val('');
    user_data_modal.find('#cellphone').val('');
    user_data_modal.find('#address').val('');
    user_data_modal.find('#email').val('');
    user_data_modal.find('#identity').val('');
    user_data_modal.find('#gender').prop('selectedIndex',0);
    user_data_modal.find('#birthday_year').val('');
    user_data_modal.find('#birthday_month').val('');
    user_data_modal.find('#birthday_day').val('');
    user_data_modal.find('#contactname').val('');
    user_data_modal.find('#contactphone').val('');
}

function del_member(idx){
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        members.splice(idx, 1);
        chrome.storage.sync.set({members: members}, function() {
          console.log("The member list has been updated.");
        });
        
        refresh_page();
        
        //for debug
        console.log(members);
    });
}

function set_edit_form(idx){
    $('#form_modal_title').text('編輯成員');
    
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        var member = members[idx];
        tcs.reset();
        tcs.setValue(member.county, member.district);
        user_data_modal.find('#name').val(member.name);
        user_data_modal.find('#phone').val(member.phone);
        user_data_modal.find('#cellphone').val(member.cellphone);
        user_data_modal.find('#address').val(member.address);
        user_data_modal.find('#email').val(member.email);
        user_data_modal.find('#identity').val(member.identity);
        user_data_modal.find('#gender').val(member.gender);
        user_data_modal.find('#birthday_year').val(member.birthday_year);
        user_data_modal.find('#birthday_month').val(member.birthday_month);
        user_data_modal.find('#birthday_day').val(member.birthday_day);
        user_data_modal.find('#contactname').val(member.contactname);
        user_data_modal.find('#contactphone').val(member.contactphone);
    });
}

function save_edited_member(idx){
    
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        var edited_member_data = {
            name: user_data_modal.find('#name').val(),
            phone: user_data_modal.find('#phone').val(),
            cellphone: user_data_modal.find('#cellphone').val(),
            county: user_data_modal.find('#county').val(),
            district: user_data_modal.find('#district').val(),
            address: user_data_modal.find('#address').val(),
            email: user_data_modal.find('#email').val(),
            identity: user_data_modal.find('#identity').val(),
            gender: user_data_modal.find('#gender').val(),
            birthday_year: parseInt(user_data_modal.find('#birthday_year').val()),
            birthday_month: parseInt(user_data_modal.find('#birthday_month').val()),
            birthday_day: parseInt(user_data_modal.find('#birthday_day').val()),
            contactname: user_data_modal.find('#contactname').val(),
            contactphone: user_data_modal.find('#contactphone').val()
        };
        members[idx] = edited_member_data;
        chrome.storage.sync.set({members: members}, function() {
          console.log("The member list has been updated.");
        });
        
        //for debug
        console.log(members);
    });
}

function refresh_page(){
    
    document.getElementById('member_list_table').innerHTML = "";
    chrome.storage.sync.get('members', function(data) {
        var members = data['members'];
        for( let i = 0; i < members.length; i++ ){
            var id = i + 1;
            var name = members[i].name;
            var component_member_list = `
            <tr>
            <td class="text-nowrap align-middle">${id}</td>
            <td class="text-nowrap align-middle"><span>${name}</span></td>
            
            <td class="text-center align-middle">
                <div class="text-center">
                <button class="btn btn-success btn-block" type="button" id="${id}" name="edit_btn" data-toggle="modal" data-target="#user_data_modal">查看 / 編輯成員資訊</button>
                </div>
            </td>
            <td class="text-center align-middle">
                <div class="text-center">
                <button class="btn btn-danger btn-block" type="button" id="${id}" name="del_btn" data-toggle="modal" data-target="#exampleModal">刪除成員</button>
                </div>
            </td>
            </tr>
            `;
            document.getElementById('member_list_table').insertAdjacentHTML('beforeend', component_member_list);
        }
        $('button[name="del_btn"]').click(function(event){
            $('#del_confirm').unbind('click');
            $('#del_confirm').click(function(){
                del_member(parseInt(event.target.id) - 1); //start with 0 
            });
        });
        
        $('button[name="edit_btn"]').click(function(event){
            set_edit_form(parseInt(event.target.id) - 1);
            modal_submit_btn.unbind('click');
            modal_submit_btn.click(function(){
                save_edited_member(parseInt(event.target.id) - 1);
            })
        });        
    });
    
}

refresh_page();