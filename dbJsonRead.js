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
    if(db.lastTaskDay!=today){
        db.taskTime=0;
    }
    app.mount('#app')
})
.fail(function(msg){
    console.log("Fail!");
})
let today=Math.floor(new Date().getTime()/1000/60/60/24);






let settings ={
    enableHighAccuracy: true
};
navigator.geolocation.getCurrentPosition(result, error, settings);
function result(position){
    let thisCoords=position.coords;
    if(thisCoords.latitude<20 || thisCoords.latitude>26 
        || thisCoords.longitude >124 || thisCoords.longitude<116){
            alert("This website is used to practice the phonetic system of traditional Chinese characters in Taiwan. It is currently detected that you are not located here. Please continue after confirmation")
        }
    console.log(`Location:${thisCoords.latitude},${thisCoords.longitude}`);
}
function error(err){
    console.log(`Location:err`);
}














function dbUpdataLevel(level){
    $.ajax({
        url:url,
        type:'PATCH',
        data:`level=${level}`
    })

}
function dbUpdataRange(range){
    $.ajax({
        url:url,
        type:'PATCH',
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

    xmlHttpRequest.open("PATCH",url,true);
    xmlHttpRequest.setRequestHeader("Content-type",'application/json');
    const data = JSON.stringify({
        lastTaskDay: day,
        taskTime: taskTime
    });
    
    xmlHttpRequest.send(data);
}


