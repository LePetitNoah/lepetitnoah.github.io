window.addEventListener("load", async () => {

    let loader = document.getElementById("loader");
    loader.addEventListener("click", () => {

        fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Seri%20Iskandar?unitGroup=metric&include=current&key=4ULXBJL7H77CEEB28PQE8N8F2&contentType=json")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.body.onload = changeWeather(json);
        });

        fetch("https://timeapi.io/api/time/current/zone?timeZone=Asia%2FSingapore")
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.body.onload = changeTime(json);
        });
    });
});

function changeTime(elem){
    const time = document.getElementById("time");
    time.innerHTML = "Heure actuelle en Malaisie : " + elem.time;
}

function changeWeather(elems){

    const daysElement = [];
    for(let i=0; i<3; i++){
        daysElement[i] = document.getElementById("day" + i+1);
    }

    const days = [];
    for(let i=0; i<3; i++){
        days[i] = elems.days[i];
    }

    for(let i=0; i<daysElement.length; i++){
        daysElement[i].innerHTML = "Températures actuelles en Malaisie : " + days[i].feelslike;
    }
}