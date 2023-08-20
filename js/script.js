let todayday = document.getElementById("todayday");
let day = document.getElementById("day");
let month = document.getElementById("month");
let locationName = document.getElementById("location");
let todayTemp = document.getElementById("todayTemp");
let todayIcon = document.getElementById("todayIcon");
let todayCustom = document.getElementById("todayCustom");

// ========== Tomorrow =================== //
let tomorrowDay=document.getElementById("tomorrowDay");
let tomorrowIcon=document.getElementById("tomorrowIcon");
let tomorrowMax=document.getElementById("tomorrowMax");
let tomorrowMin=document.getElementById("tomorrowMin");
let tomorrowCustom=document.getElementById("tomorrowCustom");


// ========== After Tomorrow =================== //
let afterTomorrowDay=document.getElementById("afterTomorrowDay");
let afterTomorrowIcon=document.getElementById("afterTomorrowIcon");
let afterTomorrowMax=document.getElementById("afterTomorrowMax");
let afterTomorrowMin=document.getElementById("afterTomorrowMin");
let afterTomorrowCustom=document.getElementById("afterTomorrowCustom");


// ========== Search =============
var userInput="cairo";
let searchInput = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");


    searchInput.addEventListener("input",function (){
        userInput = searchInput.value;
       if(userInput == ""){
        userInput="cairo";
       }
        loadPge ();
    })
    searchBtn.addEventListener("input",function (){
        userInput = searchInput.value;
        if(userInput == ""){
            userInput="cairo";
           }
        loadPge ();
    })




const date = new Date();


let http = new XMLHttpRequest();

http.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${userInput}&days=3`);
http.send();

var data = [];
var forecast = [];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// http.addEventListener('readystatechange',function(){

//     if(http.readyState == 4 ){
//         if(http.status==200){
//             data =JSON.parse(http.response);

//             console.log(data.forecast.forecastday);
//         }else{
//             console.log("not 200");
//         }
//     }else{
//         console.log("not 4");
//     }




//     // for (var i=0 ; i<data.length ; i++){
//     //     var day = data[i].date;
//     //     var dayName= date.getDay();
//     //     console.log(days[dayName]);

//     // }
// })


async function getData(userInput) {
console.log({userInput});
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${userInput}&days=3`);
    data = await result.json();
    forecast = data.forecast.forecastday;
    console.log(data);
    console.log(forecast);
}

// getData();



async function display() {

    var today = date.getDay();
    var tomorrow = today + 1;
    var afterTomorrow = today + 2;
    if (today == 6) {
        tomorrow = 0;
        afterTomorrow = 1;

    } else if (today == 5) {
        afterTomorrow = 0;
    }
 

// ======== Today ===========
    todayday.innerHTML = days[today];
    day.innerHTML = forecast[0].date.split("-")[2];
    month.innerHTML = months[(forecast[0].date.split("-")[1]) - 1];
    locationName.innerHTML = data.location.name;
    todayTemp.innerHTML = forecast[0].day.maxtemp_c + "<sup>o</sup>C";
    todayIcon.src = forecast[0].day.condition.icon;
    todayCustom.innerHTML = forecast[0].day.condition.text;

    // ============ Tomorrow ================
    tomorrowDay.innerHTML= days[tomorrow];
    tomorrowIcon.src= forecast[1].day.condition.icon;
    tomorrowMax.innerHTML= forecast[1].day.maxtemp_c + "<sup>o</sup>C";
    tomorrowMin.innerHTML= forecast[1].day.mintemp_c + "<sup>o</sup>";
    tomorrowCustom.innerHTML = forecast[1].day.condition.text;

     // ============ After Tomorrow ================
     afterTomorrowDay.innerHTML= days[afterTomorrow];
     afterTomorrowIcon.src= forecast[2].day.condition.icon;
     afterTomorrowMax.innerHTML= forecast[2].day.maxtemp_c + "<sup>o</sup>C";
     afterTomorrowMin.innerHTML= forecast[2].day.mintemp_c + "<sup>o</sup>";
     afterTomorrowCustom.innerHTML = forecast[2].day.condition.text;

}

async function loadPge () {
    await getData(userInput);
    await display();
  
};

loadPge ();