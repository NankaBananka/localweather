
function mainFunction(json){
    var APIID = "d922cf68fa95d59385acf4d8a2a844e8",
        lat = json.loc.split(",")[0],
        lon = json.loc.split(",")[1];
        city = json.city,
        country = json.country,
        units = "metric",
        urlWeather = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&appid=" + APIID + "&units=";
        +
        $("#about").html("<b>" + json.country + ",</b>" + "<br>" + json.city);

    console.log(urlWeather);
    console.log(lat, lon); 

    $.getJSON(urlWeather + units, getWeather);
};



function getWeather(json){
    var temp = json.main.temp,
        humid = json.main.humidity,
        windSp = json.wind.speed,
        windDeg = json.wind.deg,
        weatherMain = json.weather[0].main,
        weatherDescr = json.weather[0].description,
        icon = json.weather[0].icon,
        unT = " C",
        unS = " meter/sec";

    $("#formUnit").change(function(){
        var x = $("[name='units']");
            for (i = 0; i < x.length; i++){
                if (x[i].checked === true){
                    var check = x[i].value;
                    break;
                }
            }

        if (check === "imperial"){
            temp = (json.main.temp * 1.8) + 32,
            windSp =  json.wind.speed * 2.236936;
            unT = " F";
            unS = " miles/hour"
            printWeather(temp, unT);
            printWInd(windSp, unS);
        } else{
            temp = json.main.temp,
            windSp =  json.wind.speed,
            unT = " C";
            unS = " meter/sec";
            printWeather(temp, unT);
            printWInd(windSp, unS);
        }
    });


    function printWeather (num, str){
        $("#weatherplace").html(function(){
              return "<p>" + num.toFixed(2) + str + "<br>"  
              + weatherMain + "<br>"+ weatherDescr + "<br>" + "<img src='http://openweathermap.org/img/w/" + icon + ".png' width='80'>" + "</p>";
        });
    }

    function printWInd(num, str){
        $("#wind").html(function(){
            return "<p>" + "Wind: " + degToCompass(windDeg) + "<br>" + num.toFixed(2) + str + "</p>";
        });
    }



    $("#humidity").html(function(){
        return "<p> Humidity: " + "<br>" + humid.toFixed(2) + "%" + "</p>";
    });

    printWeather(temp, unT);
    printWInd(windSp, unS);

}




function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}



$(document).ready(function() {
    $.getJSON('http://ipinfo.io/json', mainFunction);
});








