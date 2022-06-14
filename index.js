/**
 * based on the provided city, this code fetches weather info from
 * 'openweathermap.org' api and displays it in required manner. 
 */

const appId = '7e3f21edee540e6110af347b55eb1ab2';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function formattedDate( timestamp ){
    // receives the timestamp & returns date in a formatted order:
    // day date month year
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date(timestamp * 1000);
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

function loadData( data ){
    // accepting data object contains info about weather,  
    // loads into the elements to disply.
    const city_El = document.querySelector( '.city' );
    const date_El = document.querySelector( '.date' );
    const temp_El = document.querySelector( '.temp' );
    const weather_El = document.querySelector( '.weather' );
    const hilow_El = document.querySelector( '.hi-low' );

    let countryName = new Intl.DisplayNames(['en'], {type: 'region'});

    city_El.innerText = `${data.name}, ${countryName.of(data.sys.country)}`;
    temp_El.innerHTML = `${data.main.temp}<span>°c</span>`;
    weather_El.innerText = data.weather[0].main;
    hilow_El.innerText = `${data.main.temp_min}°c / ${data.main.temp_max}°c`;
    date_El.innerText = formattedDate( data.dt );
};

function getWeather( city ){
    // fetches weather info from server.
    fetch( `${baseUrl}?q=${city}&appid=${appId}&units=metric`)
    .then(response => {
        // throw error, if server returns 4xx responses.
        if ( !response.ok ){
            throw new Error( response.statusText );
        }
        return response.json();
    })
    .then( data => loadData( data ) )
    .catch(error => console.log( error.message ));
}

// while user press enter key, captures it and takes action.
const searchCity = document.querySelector( '.search-box' );
searchCity.addEventListener( 'keypress' , function(event){
    if( event.key === "Enter"){
        getWeather(searchCity.value);
    }
});

