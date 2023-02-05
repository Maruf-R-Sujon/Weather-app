let userCard = document.querySelector('.user-card');
let errAlart = document.querySelector('.error');
let infoTxt = document.querySelector('#infoTxt');
let locationName = document.querySelector('#locationName');
let detectedBtn = document.querySelector('#detected-btn');
let weatherCard = document.querySelector('.weather-card');
let backArray = document.querySelector('#backArray');
let tempImg = document.querySelector('#tempImg');

// define variable
let api;

// add even listner
locationName.addEventListener('keyup', e => {
    if(e.key == 'Enter' && locationName.value != ''){
        var cityName= locationName.value;
        requestApi(cityName);
    }
    else if(locationName.value == ''){
        window.alert('Please fill the Field')
    }
});


function requestApi(city){
    apikey = '56478562bfebfb41467ad3c35cfcaac6';
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
};

detectedBtn.addEventListener('click', e =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Opps! Your Browser Doesn't Support GeoLocation");
    }
});

function onSuccess(position){
    // let {lat, lon} = position.coords;
    // console.log(position)
    let lat = position.coords.latitude;
    let lon = position.coords.longitude; 
    apikey = '56478562bfebfb41467ad3c35cfcaac6';
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}.&lon=${lon}&units=metric&appid=${apikey}`;
    fetchData();
    // console.log(api)
};

function onError(err){
    infoTxt.style.display = 'block';
    infoTxt.innerText = err.message;
    infoTxt.style.color = 'rgba(244, 72, 72, 0.95)'
};

function fetchData(){
    infoTxt.innerHTML = 'Getting Weather Details....';
    infoTxt.style.display = 'block';
    infoTxt.style.color = 'green';

    fetch(api).then(res => (res).json()).then(result => (weatherApp(result))).catch(e => {
        infoTxt.style.display = 'block';
        console.log(e.message);
        infoTxt.innerHTML = 'Something went wrong,Please try again....';
        infoTxt.style.color = 'red';
    })
};
function weatherApp(data){
    console.log(data);
    if(data.cod == 404){
        infoTxt.style.display = 'block';
        infoTxt.innerHTML= `Opps! <b>${locationName.value}</b> is not a valid city`;
        infoTxt.style.color = 'red';
    }
    else{
        const city = data.name;
        const country = data.sys.country;
        const {id,description} = data.weather[0];
        const {feels_like,humidity,temp} = data.main;
        // console.log(info.main);

        document.querySelector('.temp .numb').innerText = Math.round(temp);
        document.querySelector('.weather-title').innerText = description;
        document.querySelector('.location-details .city').innerText = city;
        document.querySelector('.location-details .country').innerText = country;
        document.querySelector('.feel-like .numb').innerText = Math.round(feels_like);
        document.querySelector('.humudity .numb').innerText = humidity;

        if(id==800){
            tempImg.src = 'assets/img/Weather-clear.svg';
        }
        else if(id >= 200 && id <= 232){
            tempImg.src = 'assets/img/storm.webp'
        }
        else if(id >= 300 && id <= 321){
            tempImg.src = 'assets/img/rain.png'
        }
        else if(id >= 500 && id <= 531){
            tempImg.src = 'assets/img/rain.png'
        }
        else if(id >= 600 && id <= 622){
            tempImg.src = 'assets/img/snow.jfif'
        }
        else if(id >= 701 && id <= 781){
            tempImg.src = 'assets/img/harze.png'
        }
        else if(id >= 800 && id <= 804){
            tempImg.src = 'assets/img/cloud.svg'
        }
        userCard.style.display = 'none';
        weatherCard.style.display = 'block';
        locationName.value = '';
        infoTxt.innerText = '';
        infoTxt.style.display = 'none';
    }
};
backArray.addEventListener('click', ()=>{
    userCard.style.display = 'block';
    weatherCard.style.display = 'none';
})