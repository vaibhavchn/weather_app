window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const getForC = document.querySelector('.degree-section span');
    const getTempArea= document.querySelector('.degree-section');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy =  "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/90f5209f5c0c2bcf99ffa5b5a78a9eab/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const { temperature, summary, icon} = data.currently;

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary.toUpperCase();
                    locationTimezone.textContent = data.timezone;

                    const tempCelsius = (temperature - 32)*(5/9);

                    const icon_class = document.querySelector('.icon');
                    setIcons(icon, icon_class);

                    getTempArea.addEventListener('click', () => {

                        if (getForC.textContent === "F"){
                            getForC.textContent = "C";
                            temperatureDegree.textContent = Math.floor(tempCelsius);
                        }
                        else {
                            getForC.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }

                    });

                });
        });
    }
    
    function setIcons(icon, iconId){

        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,  Skycons[currentIcon]);
    }




});














