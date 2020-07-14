async function fill(){
    $('#ContentPlaceHolder1_rblNode_0').attr('checked',true); //塔塔加
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$rblNode$0','');"; //塔塔加trigger

    //確認塔塔加觸發完成
    while($('#ContentPlaceHolder1_rblNode input').length == 1) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    $('#ContentPlaceHolder1_rblNode_0').attr('checked',true); //排雲山莊
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$rblNode$0','');"; //排雲山莊trigger
    
    //確認排雲山莊觸發完成
    while($('#ContentPlaceHolder1_rblNode input').length == 6) {
      await new Promise(r => setTimeout(r, 100));
    }
  
    $('#ContentPlaceHolder1_btnover').click(); //確認今日路線
    
    //確認今日路線觸發完成
    while($('#ContentPlaceHolder1_lblSchedule a').length == 2) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    
    $('#ContentPlaceHolder1_rblNode_2').attr('checked',true); //玉山主峰
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$rblNode$2','');"; //玉山主峰trigger
    
    //確認玉山主峰觸發完成
    while($('#ContentPlaceHolder1_rblNode input').length == 8) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    $('#ContentPlaceHolder1_rblNode_4').attr('checked',true); //塔塔加
    location.href="javascript:__doPostBack('ctl00$ContentPlaceHolder1$rblNode$4','');"; //塔塔加trigger
    
    
    //確認塔塔加觸發完成
    while($('#ContentPlaceHolder1_rblNode input').length == 5) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    $('#ContentPlaceHolder1_btnover').click(); //確認今日路線
}   

fill();

