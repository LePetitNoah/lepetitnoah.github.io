window.addEventListener("load", async () => {

    let loader = document.getElementById("loader");
    loader.addEventListener("click", () => {

        fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Seri%20Iskandar?unitGroup=us&key=YOUR_API_KEY&contentType=json")
        .then(response => response.json())
        .then(json => {
            console.log(json);
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