window.addEventListener("load", async () => {

    setInterval(fetchTime, 10000);
    fetchWeather();

      document.getElementById('hide').addEventListener('change', function() {
        if (this.checked) {
          document.getElementById('anecdotes').style.display = 'none';
          document.getElementById('image').src = '/img/blog/show.png';
        } else {
          document.getElementById('anecdotes').style.display = 'block';
          document.getElementById('image').src = '/img/blog/hide.png';
        }
      });
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

    day1.innerHTML = "Aujourd'hui : " + days[0].feelslike + "C°";
    day2.innerHTML = "Demain : " + days[1].feelslike + "C°";
    day3.innerHTML = "Après-demain : " + days[2].feelslike + "C°";
}