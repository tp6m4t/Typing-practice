let url = "https://chkeybrjsonserverfinalproject.azurewebsites.net/keybr";
let db;
$.getJSON(url)
.done(function(msg){
    console.log("資料庫連結成功");
    console.log(msg);
    db.level=msg["level"];
    db.range=msg.range;
    db.taskTime=msg.taskTime;
    db.lastTaskTime=msg.lastTaskTime;
})
.fail(function(msg){
    console.log("Fail!");
})
let today=new Date().getDay;
if(db.lastTaskTime!=today){
    db.taskTime=0;
}