const pomo = (60 * 25 * 1000);
const shortbreak = (60 * 5 * 1000);
const longbreak = (60 * 20 * 1000);
const week = (7*24*60*60*1000);
const hrs = (60 * 60 * 1000);
const mins = (60 * 1000);
const secs = 1000;


var start;
var timer_set = Date.parse(getCookie("target"));

function setTimer(value,str) {
    const d = new Date();
    const t = new Date();
    d.setTime(d.getTime() + week);
    t.setTime(t.getTime() + value);
    let expires = "expires=" + d.toUTCString();
    let timer_target = "target=" + t.toUTCString();
    let timer_name = "name=" + str;
    document.cookie = timer_target + ";" + getCookie("task") + ";" + expires + ";path=/;SameSIte=Lax";
    document.cookie = timer_name + ";" + getCookie("task") + ";" + expires + ";path=/;SameSIte=Lax";
    location.reload();
}

function refresh() {
    location.reload();
}

let x = setInterval(function(){
    var format = (t) => {
        return t < 10 ? '0' + t : t;
    };
    var now = new Date().getTime();
    let timeleft = timer_set - now
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);  
    document.getElementById("tname").innerHTML = getCookie("name");
    document.getElementById("min").innerHTML = format(minutes) + ":";
    document.getElementById("sec").innerHTML = format(seconds);
    if (timeleft < 0) {
        var alert = new Audio('alert.mp3');
        clearInterval(x);
        alert.play();
        document.getElementById("min").innerHTML = ""
        document.getElementById("sec").innerHTML = ""
        document.getElementById("end").innerHTML = "Time's up!"
    } elif (timeleft == Null) {
        document.getElementById("min").innerHTML = ""
        document.getElementById("sec").innerHTML = ""
        document.getElementById("end").innerHTML = "Welcome to PomoTask!"
    }
}, 1000);

var doing = '';

function myTask() {
    const d = new Date();
    d.setTime(d.getTime() + week);
    let expires = "expires="+ d.toUTCString();
    let task = document.getElementById('current_task').value;
    document.cookie = "task=" + task + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = document.cookie;
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function onLoad() {
    doing = getCookie("task");
    if (doing !== "") {
        document.getElementById("now_doing").innerHTML = getCookie("task");
    } else {
        return "";
    }
}

onLoad();
