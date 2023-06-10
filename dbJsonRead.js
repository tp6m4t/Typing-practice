let url = "https://chkeybrjsonserverfinalproject.azurewebsites.net/keybr";
let db;
$.getJSON(url)
.dene(function(msg){
    console.log("資料庫連結成功");
    db.level=msg.level;
    db.range=msg.range;
    db.taskTime=msg.taskTime;
    db.lastTaskTime=msg.lastTaskTime;
})
.fail(function(msg){
    console.log("Fail!");
})
