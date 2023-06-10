let url = "https://chkeybrjsonserverfinalproject.azurewebsites.net/keybr";
let db={};
$.getJSON(url)
.done(function(msg){
    console.log("資料庫連結成功");
    console.log(msg);
    db.level=msg["level"];
    db.range=msg.range;
    db.taskTime=msg.taskTime;
    db.lastTaskDay=msg.lastTaskDay;
})
.fail(function(msg){
    console.log("Fail!");
})
let today=new Date().getDay;
if(db.lastTaskDay!=today){
    db.taskTime=0;
}


function dbUpdataLevel(level){
    $.ajax({
        url:url,
        type:'PUT',
        data:`level=${level}`
    })

}
function Inputrange(range){
    $.ajax({
        url:url,
        type:'PUT',
        data:`range=${range}`
    })

}


function dbUpdata(day,taskTime){
    let xmlHttpRequest;
    if(window.XMLHttpRequest){
        xmlHttpRequest=new XMLHttpRequest();
    }else{
        alert("No XMLHttpRequest!");
        return;
    }

    xmlHttpRequest.open("PUT",url,true);
    xmlHttpRequest.setRequestHeader("Content-type",'application/json');
    xmlHttpRequest.send(`lastTaskDay=${day}`);
    xmlHttpRequest.send(`taskTime=${taskTime}`);

}


