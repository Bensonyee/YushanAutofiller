async function fill(){
    $('#ContentPlaceHolder1_climblinemain option[value="1"]').attr('selected','selected'); //主路線
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$climblinemain','');"; //主路線trigger

    //確認主路線觸發完成
    while($('#ContentPlaceHolder1_climbline option').length == 1) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    $('#ContentPlaceHolder1_climbline option[value="2"]').attr('selected','selected'); //次路線
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$climbline','');"; //次路線trigger
    
    //確認次路線觸發完成
    while($('#ContentPlaceHolder1_sumday option').length == 0) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    $('#ContentPlaceHolder1_sumday option[value="2"]').attr('selected','selected'); //登山總日數
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$sumday','');"; //登山總日數trigger
}

fill();

