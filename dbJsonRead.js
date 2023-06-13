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
    db.KeyLevel=msg.char_level;
    let today=Math.floor(new Date().getTime()/1000/60/60/24);
    if(db.lastTaskDay!=today){
        db.taskTime=0;
    }
    app.mount('#app')
})
.fail(function(msg){
    console.log("Fail!");
})




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


function dbUpdata(day,taskTime,char_level){


    const char_level_o = Array.from(char_level).reduce((obj, [key, value]) =>Object.assign(obj, { [key]: value} ), {})






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
        taskTime: taskTime,
        char_level:char_level_o
    });
    xmlHttpRequest.send(data);
}


function video(){
    let modal=document.getElementById("modal")
    modal.style.display = "block";
    modal.onclick = function () {
        modal.style.display = "none"; //将模态框属性设置为不可见
        player.stopVideo();
    }
    function onYouTubeIframeAPIReady(){
    
        player=new YT.Player("player",{
            height:"390",
            width:"640",
            videoId:"9jGocM0xr9E",
            playerVars:{
                autoplay:1,//是否自動撥放
                controls:1,//是否顯示控制項
                start:0,//開始秒數
                end:0,//結束秒數
                iv_load_policy:3
            }
        });
    }
    onYouTubeIframeAPIReady()


}


