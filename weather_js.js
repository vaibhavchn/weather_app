window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
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

                    const icon_class = document.querySelector('.icon');
                    setIcons(icon, icon_class);
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