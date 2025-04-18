window.addEventListener("load", async () => {

    setInterval(fetchTime, 10000);
    fetchWeather();
});

function fetchTime(){
    fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FSingapore")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.body.onload = changeTime(json);
    });
}

function fetchWeather(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Seri%20Iskandar?unitGroup=metric&include=current&key=4ULXBJL7H77CEEB28PQE8N8F2&contentType=json")
        .then(response => response.json())
        .then(json => {
            document.body.onload = changeWeather(json);
    });
}
function changeTime(elem){

    console.log("Change time called");

    const time = document.getElementById("time");
    time.innerHTML = elem.time;
}

function changeWeather(elems){

    console.log("Change weather called");

    const day1 = document.getElementById("day1");
    const day2 = document.getElementById("day2");
    const day3 = document.getElementById("day3");

    const days = [];
    for(let i=0; i<3; i++){
        days[i] = elems.days[i];
    }

    day1.innerHTML = "Température actuelle en Malaisie : " + days[0].feelslike + "C°";
    day2.innerHTML = "Température prévue demain en Malaisie : " + days[1].feelslike + "C°";
    day3.innerHTML = "Température prévue après-demain en Malaisie : " + days[2].feelslike + "C°";
}