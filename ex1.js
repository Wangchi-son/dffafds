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
function stopWatch(){

    seconds++;

    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }
    }

    //If seconds/minutes/hours are only one digit, add a leading 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}


//재생 일시정지 버튼
function startStop(){

    //재생 일시정지 버튼 효과
    const buttons = document.getElementById("startStop");
    buttons.addEventListener('click', e => {

        let x = e.clientX - ((screen.width/2)-e.target.offsetLeft);
        let y = e.clientY - ((screen.height/2)-e.target.offsetTop);

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        e.target.appendChild(ripples);

         setTimeout(() => {
             ripples.remove()
         },500);
    })
    if(status === "stopped"){

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        status = "started";
    }
    else if(status === "started"){
        window.clearInterval(interval);
        status = "stopped";
    }

}

//End 버튼
function end(){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00"
    status = "stopped"
}


//가림막
function coverNonecover(){
    if(coverstatus === "nonecover"){
        document.getElementById("lockcover").style.display = 'block';
        document.getElementById("startStop").style.display = 'none';
        document.getElementById("endbutton").style.display = 'none';
        coverstatus = "cover";
    }
    else if(coverstatus === "cover"){
        document.getElementById("lockcover").style.display = 'none';
        document.getElementById("startStop").style.display = 'block';
        document.getElementById("endbutton").style.display = 'block';
        coverstatus = "nonecover";
    }
}