window.addEventListener("load", async () => {

    let loader = document.getElementById("loader");
    loader.addEventListener("click", () => {

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
    time.innerHTML = elem.time;
}