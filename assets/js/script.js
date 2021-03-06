
//Global variables for the natual disasters card
var requestUrl = 'https://api.reliefweb.int/v1/disasters'
var diatext = document.getElementById("dia-text");
var diabtn = document.getElementById("diabtn");
var diasave = document.getElementById("diasvbt");


var store;

var iter = 0;


var testfi = localStorage.getItem("Dias");
if(testfi==null){
var Favobjs=[];
}else{
var Favobjs=JSON.parse(localStorage.getItem("Dias"));
}
var jtest=JSON.parse(localStorage.getItem("jokes"));
var ctest=JSON.parse(localStorage.getItem("state"));
console.log(Favobjs);
console.log(jtest);
console.log(ctest);
function LoadFavorites(){
  console.log("loading!!")
  Cardloopdcdc(ctest);
  Cardloopdia(Favobjs);
  Cardloopjoke(jtest);}
//Global variables for the CDC/COVID card
//    <div class="col card-style" id="dia">

var statetext = document.getElementById("statetext");
var statebtn = document.getElementById("statebtn");
var saveStateBtn = document.getElementById('saveStateBtn');
if(localStorage.getItem("Dias")==null){
favState=[];
}else{var favState = JSON.parse(localStorage.getItem('state'));}

var requestUrlCovid = "https://data.cdc.gov/resource/n8mc-b4w4.json?$where=case_month between'2022-05' and '2022-05'";
var state = [{ 'name': 'AL', 'count': 0 }, { 'name': 'AK', 'count': 0 }, { 'name': 'AZ', 'count': 0 }, { 'name': 'AR', 'count': 0 }, { 'name': 'CA', 'count': 0 }, { 'name': 'CO', 'count': 0 }, { 'name': 'CT', 'count': 0 }, { 'name': 'DE', 'count': 0 }, { 'name': 'FL', 'count': 0 }, { 'name': 'GA', 'count': 0 }, { 'name': 'HI', 'count': 0 }, { 'name': 'ID', 'count': 0 }, { 'name': 'IL', 'count': 0 }, { 'name': 'IN', 'count': 0 }, { 'name': 'IA', 'count': 0 }, { 'name': 'KS', 'count': 0 }, { 'name': 'KY', 'count': 0 }, { 'name': 'LA', 'count': 0 }, { 'name': 'ME', 'count': 0 }, { 'name': 'MD', 'count': 0 }, { 'name': 'MA', 'count': 0 }, { 'name': 'MI', 'count': 0 }, { 'name': 'MN', 'count': 0 }, { 'name': 'MS', 'count': 0 }, { 'name': 'MO', 'count': 0 }, { 'name': 'MT', 'count': 0 }, { 'name': 'NE', 'count': 0 }, { 'name': 'NV', 'count': 0 }, { 'name': 'NH', 'count': 0 }, { 'name': 'NJ', 'count': 0 }, { 'name': 'NM', 'count': 0 }, { 'name': 'NY', 'count': 0 }, { 'name': 'NC', 'count': 0 }, { 'name': 'ND', 'count': 0 }, { 'name': 'OH', 'count': 0 }, { 'name': 'OK', 'count': 0 }, { 'name': 'OR', 'count': 0 }, { 'name': 'PA', 'count': 0 }, { 'name': 'RI', 'count': 0 }, { 'name': 'SC', 'count': 0 }, { 'name': 'TN', 'count': 0 }, { 'name': 'TX', 'count': 0 }, { 'name': 'UT', 'count': 0 }, { 'name': 'VT', 'count': 0 }, { 'name': 'VA', 'count': 0 }, { 'name': 'WA', 'count': 0 }, { 'name': 'WV', 'count': 0 }, { 'name': 'WI', 'count': 0 }, { 'name': 'WY', 'count': 0 }]


//Global variables for Jokes card
var button = document.querySelector('.container button');
var jokeText = document.querySelector('.container p');
document.addEventListener('DOMContentLoaded', getJoke);


//Natural Disaster section
$.ajax({
  url: requestUrl,
  method: 'GET',
}).then(function (response) {
  console.log('Ajax Reponse \n-------------');
  store = response;
});
//this button iterates through the different natural disasters
diabtn.addEventListener("click", function () {
  diatext.textContent = store.data[iter].fields.name;
  ++iter;
})
//this button saves the disaster to the local storage
diasave.addEventListener("click", function () {
  Favobjs.push(diatext.textContent);
  localStorage.setItem("Dias", JSON.stringify(Favobjs));
})
var storeName;
var storeCount;
// CDC/COVID section
$.ajax({
  url: requestUrlCovid,
  type: "GET",
  data: {
    "$limit": 90000,
  }
}).done(function (data) {
  for (var i = 0; i < data.length; i++) {
    var dataState = data[i].res_state
    var count = 0
   for (var x = 0; x < state.length; x++) {
      //this function counts the total number of covid cases for each state
      if (dataState == state[x].name) {
        state[x].count++;
      }
    }
  }
});
var stateiter=0;

  //button to save covid data to local storage
saveStateBtn.addEventListener('click', function () {
  favState.push(statetext.textContent);
  localStorage.setItem('state', JSON.stringify(favState));
})
    //button to generate positive covid cases by state
    statebtn.addEventListener("click", function () {
      storeName = state[stateiter].name;
      storeCount = state[stateiter].count;
      statetext.textContent = 'Positive COVID cases by state last month= ' + storeName + ': ' + storeCount;
      stateiter++;
      console.log(stateiter);
      console.log(state[stateiter].name);
    })

var button = document.querySelector('.joke-button');
var jokeText = document.querySelector('.joke');
document.addEventListener('DOMContentLoaded', getJoke);

async function getJoke() {
  var jokeData = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  });
  var jokeObject = await jokeData.json();
  jokeText.innerHTML = jokeObject.joke;
}
//this function saves a favorite joke to the local storage
function addToFavorites() {
  var favoriteJokes = JSON.parse(window.localStorage.getItem('jokes'))

  if (favoriteJokes && favoriteJokes.length) {
    window.localStorage.setItem('jokes', JSON.stringify([...favoriteJokes, jokeText.innerHTML]))
  } else {
    window.localStorage.setItem('jokes', JSON.stringify([jokeText.innerHTML]))
  }

  

}
