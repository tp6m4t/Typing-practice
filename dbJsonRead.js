let url = "https://chkeybrjsonserverfinalproject.azurewebsites.net/keybr";
let db;
$.getJSON(url)
.dene(function(msg){
    db.level=msg.level;
    db.range=msg.range;
    db.taskTime=msg.taskTime;
    db.lastTaskTime=msg.lastTaskTime;
})
