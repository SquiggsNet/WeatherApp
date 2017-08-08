// var person = {
//     firstName:"John",
//     lastName:"Doe",
//     age:50,
//     eyeColor:"blue",
//     fullName: function(){
//         return this.firstName + " " +this.lastName;
//     }
// }

// var person = new Object();
// person.firstName = "John";
// person.lastName = "Doe";
// person.age = 50;
// person.eyeColor = "blue";

// console.log('Person ' + person.fullName());

// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//     this.fullName = function(){
//         return this.firstName + " " + this.lastName;
//     }
// }
// var myFather = new Person("John", "Doe", 50, "blue");
// myFather.nationality = "Canadian";
// Person.prototype.nationality = "Canadian";
// var myMother = new Person("Sally", "Rally", 48, "green");
// Person.prototype.surName = function() {
//     return this.firstName + " " + this.lastName;
// };

// console.log('Father\'s eyer color: ' + myFather.eyeColor);
// console.log('Mother\'s age: ' + myMother.fullName());

// function test(){
    // for(key in myMother){
    //     console.log('The type of ' + key + ' is ' + typeof(myMother[key]));
    //     console.log('Value of ' + key + ' is ' + myMother[key]);
    // }

    // debugger;

    // console.log('My father\'s Nationality is ' + myFather.nationality);
    // console.log('My Mother\'s Nationality is ' + myMother.nationality);

//     console.log('My father\'s full name is ' + myFather.surName());
//     console.log('My Mother\'s full name is ' + myMother.surName());
// }

// test();

// var x = function (a, b) {return a * b};
// var z = x(4, 3);

// console.log(z);

// console.log(myFunction(5));

// function myFunction(y) {
//     return y * y;
// }

// function plus(a, b){
//     if (arguments.length == 2 && typeof(a) == 'number' && typeof(b) == 'number'){
//         return a+b;
//     }else{
//         return "Invalid";
//     }
// }

// console.log(plus(2,2));
// console.log(plus('2','2'));
// console.log(plus());
// console.log(plus(3));

var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

add();
add();
add();


console.log(add());

function displayWeather() {
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var error = document.getElementById("error");
    var spinner = document.getElementById("loader");
    error.innerHTML = "";

    if(!city.checkValidity()){
        error.innerHTML = "Error: City Field  " + icity.validationMessage;
        return;
    }
     if(!state.checkValidity()){
        error.innerHTML = "Error: State Field  " + state.validationMessage;
        return;
    }

    city=city.state;
    state=state.value

    var xhttp = new XMLHttpRequest();
    xhttp.onloadstart = function(){
        spinner.style.display= "block";
    };
    xhttp.onloadend = function(){
        spinner.style.display= "none";
    };
    xhttp.onload = function() {
        if (this.status == 200) {
			console.log(this.response);
            loadData(this);
        }
    };
    xhttp.onerror = function(err) {
        alert("Error loading weather data" + err);
    }
    // Could display progress bar as data is loading.
    var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from" +
        "%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20" +
        "geo.places(1)%20where%20text%3D%22" + city + "%2C%20" + state + 
        "%22)&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    xhttp.open("GET", yql, true);
    xhttp.send();
}

function loadData(response) {
    var xmlDoc = response.responseXML;
    if (xmlDoc == null) {
        alert('Invalid response from server.');
        return;
    }
    var forecasts = xmlDoc.getElementsByTagName("forecast");
    if (forecasts.length == 0) {
        alert("No Weather Data.");
    }
    for (var i = 0; i < 3; i++) {
        var fcast = forecasts[i];
        if (fcast != null) {
            displayDay(fcast, i);
        }
    }
}

function displayDay(fcast, num) {
    var day = fcast.getAttribute("day");
    var high = fcast.getAttribute("high");
    var low = fcast.getAttribute("low");
    var text = fcast.getAttribute("text");
    if (day != null && text != null && day != "" && text != "") {
        var text = getWeatherImage(text);
        var panel = document.getElementById("day" + num);
        var html = '<div class="w3-card-4 w3-container w3-blue' +
                        ' w3-margin-bottom weather-card">' +
            '<p><header class="w3-container">' +
            '<h2>' + day + '</h2>' +
            '</header>' +
            '<h5><i class="wi wi-day-' + text +'"></i></h5>' +
            '<h5>Low</h5>' +
            '<h5>' + low + '</h5>' +
            '<h5>High</h5>' +
            '<h5>' + high + '</h5>'
            '</p>' +
            '</div>';
        panel.innerHTML = html;
        panel.style.display = "inline";
    }
}

function getWeatherImage(text) {
    if (text.match(/sun/i)) {
        return "sunny";
    } else if (text.match(/fog/i)) {
        return "fog";
    } else if (text.match(/rain/i)) {
        return "rain";
    } else if (text.match(/snow/i)) {
        return "snow";
    } else if (text.match(/cloud/i)) {
        return "cloudy";
    } else if (text.match(/shower/i)) {
        return "showers";
    }
    return text;
}