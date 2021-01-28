let changebut = "none"

function goalchange(){
    if (changebut === "none"){
        document.getElementById("pgoalselbox").style.display = 'block'
        changebut = "block"
    }
    else if (changebut === "block"){
        document.getElementById("pgoalselbox").style.display = 'none'
        changebut = "none"
    }
}

//타이머 스크립트

//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;


//Define var to hold setInterval() function
let interval = null;

//Define var to hold stopwatch status
let status = "stopped";

//가림막 상태
let coverstatus = "nonecover"

//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch() {

    seconds++;

    //Logic to determine when to increment next value
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }

    //If seconds/minutes/hours are only one digit, add a leading 0 to the value
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours.toString();
    }
    else {
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}

//재생 일시정지 버튼
function startStop() {

    //재생 일시정지 버튼 효과
    const buttons = document.getElementById("startStop");
    buttons.addEventListener('click', e => {

        let x = e.clientX - ((screen.width / 2) - e.target.offsetLeft);
        let y = e.clientY - ((screen.height / 2) - e.target.offsetTop);

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        e.target.appendChild(ripples);

        setTimeout(() => {
            ripples.remove()
        }, 500);
    })
    if (status === "stopped") {

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        status = "started";
    }
    else if (status === "started") {
        window.clearInterval(interval);
        status = "stopped";
    }

}

//End 버튼
function end() {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00"
    status = "stopped"
}


//가림막
function coverNonecover() {
    if (coverstatus === "nonecover") {
        document.getElementById("lockcover").style.display = 'block';
        document.getElementById("startStop").style.display = 'none';
        document.getElementById("endbutton").style.display = 'none';
        coverstatus = "cover";
    }
    else if (coverstatus === "cover") {
        document.getElementById("lockcover").style.display = 'none';
        document.getElementById("startStop").style.display = 'block';
        document.getElementById("endbutton").style.display = 'block';
        coverstatus = "nonecover";
    }
}

// 시계
var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

function getthedate() {
    var mydate = new Date()
    var year = mydate.getYear()
    if (year < 1000)
        year += 1900
    var day = mydate.getDay()
    var month = mydate.getMonth()
    var daym = mydate.getDate()
    if (daym < 10)
        daym = "0" + daym
    var hours = mydate.getHours()
    var minutes = mydate.getMinutes()
    var seconds = mydate.getSeconds()
    var dn = "AM"
    if (hours >= 12)
        dn = "PM"
    if (hours > 12) {
        hours = hours - 12
    }
    if (hours == 0)
        hours = 12
    if (minutes <= 9)
        minutes = "0" + minutes
    if (seconds <= 9)
        seconds = "0" + seconds
    //change font size here
    var cdate = "<small><font color='000000' face='Arial'><b>" + dayarray[day] + ", " + montharray[month] + " " + daym + ", " + year + " " + hours + ":" + minutes + ":" + seconds + " " + dn
        + "</b></font></small>"
    if (document.all)
        document.all.clock.innerHTML = cdate
    else if (document.getElementById)
        document.getElementById("clock").innerHTML = cdate
    else
        document.write(cdate)
}
if (!document.all && !document.getElementById)
    getthedate()
function goforit() {
    if (document.all || document.getElementById)
        setInterval("getthedate()", 1000)
}









//카테고리 입력 창 열고 닫기
let goal_status = "none"


function goal_input_quit(){
        
    if(goal_status === "display"){

        //Start the stopwatch (by calling the setInterval() function)
        document.getElementById("goal_inputbox").style.display = 'none';
        goal_status = "none";
    }

}

function goal_input_in(){

    if(goal_status === "none"){

        //Start the stopwatch (by calling the setInterval() function)
        document.getElementById("goal_inputbox").style.display = 'block';
        goal_status = "display";
    }
}
//---------------------------------------------------------------------------------------------------------------------------------

var goalList = [];

var addBtn = document.querySelector("#add");
addBtn.addEventListener("click", addList);

function addList(){
    var goal = document.querySelector("#inputgoal").value;
    if (goal != null){
        goalList.push(goal);
        document.querySelector("#inputgoal").value = "";
        document.querySelector("#inputgoal").focus();
    }
    showList();
}

function showList(){
    var list = "<ul>";
    for (var i=0; i<goalList.length; i++){
        //list += "<li class='nonsel_goal' onclick='change_sel()' id='index_list" + i + "'>" + goalList[i] + "<span class='close' id=make_" + i +">x</span></li>";
        list += `<li class='nonsel_goal' onclick='change_sel(${i})' id='index_list${i}' value='${goalList[i]}'> ${goalList[i]} <p class='close' id='make${i}'>x</p></li>`;
    }
    list += "</ul>";

    document.querySelector("#goalList").innerHTML = list;

    var remove = document.querySelectorAll(".close");

    for (var i=0; i<remove.length; i++){
        remove[i].addEventListener("click", removeList);
    }
}

function removeList(){
    var id = this.getAttribute("id");
    goalList.splice(id, 1);
    showList();
}
//---------------------------------------------------------------------------------------------------------------------------------


function change_sel(index){
    var index_list = document.getElementById(`index_list${index}`).getAttribute('value');

    document.querySelector(".sel_goal").innerHTML = index_list;

}


//---------------------------------------------------------------------------------

