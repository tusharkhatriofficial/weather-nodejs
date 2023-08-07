const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}

//TWILIO
// twilio.js

// function sendSMS(phoneNumber, twilioPhoneNumber, accountSid, authToken, callback) {
//     // Validate the phone number (you can add more robust validation if needed)
//     if (!phoneNumber || !phoneNumber.match(/^\+?[1-9]\d{1,14}$/)) {
//       //callback('Please enter a valid phone number.');
//       alert("Please enter a valid phone number.");
//       return;
//     }
  
//     // Send the SMS message
//     fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
//       },
//       body: new URLSearchParams({
//         From: twilioPhoneNumber,
//         To: phoneNumber,
//         Body: 'Hello from Twilio! This is a test message.'
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       alert( "Message sent successfully.");
//         callback(null, 'Message sent successfully. Message SID: ' + data.sid);
//     })
//     .catch(error => {
//         alert( "Error sending message.");
//       callback('Error sending message: ' + error.message);
//     });
//   }
// // script.js

// document.getElementById('smsForm').addEventListener('submit', function (event) {
//     event.preventDefault();
  
//     // Get the phone number from the form input
//     const phoneNumber = document.getElementById('phoneNumber').value;
  
//     // Twilio credentials
//     const accountSid = 'AC2a3cb139966d8d75610106104fed6e20';
//     const authToken = 'd0163fd12976baa18a5a0ccb0fd0bad6';
//     const twilioPhoneNumber = '+12185177579';
  
//     sendSMS(phoneNumber, twilioPhoneNumber, accountSid, authToken, function (error, result) {
//       if (error) {
//         alert(error);
//       } else {
//         alert(result);
//       }
//     });
//   });//twilio