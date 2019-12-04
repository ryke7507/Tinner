$(document).ready(function() {
  var url = ; //Place your DarkSky API Call Here
  $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
    document.getElementById("profile picture").src = "img/"+data.currently.icon+".png";
    document.getElementById("name").innerHTML = data.currently.icon;
    document.getElementById("age").innerHTML = data.currently.icon;
    document.getElementById("email").innerHTML = data.currently.icon;
    document.getElementById("allergy").innerHTML = data.currently.icon;
    document.getElementById("age").style.height = ""+data.currently.temperature+"%";





    /*
      Read the current weather information from the data point values [https://darksky.net/dev/docs#data-point] to
      update the webpage for today's weather:
      1. image_today : This should display an image for today's weather.
               This will use the icon data point and pair it with an appropriate .png file (located in the img directory.)

      2. icon_today : This will be set to display the current icon value.

      3. temp_today : This will be updated to match the current temperature.

      4. thermometer_inner : Modify the height of the thermometer to match the current temperature. This means if the
                   current temperature is 32 F, then the thermometer will have a height of 32%.  Please note,
                   this thermometer has a lower boundary of 0 and upper boundary of 100.

      5. precip_today : This will be updated to match the current probability for precipitation.(make sure this is
                listed as a percentage %)

      6. humidity_today : This will be updated to match the current humidity percentage (make sure this is listed as a
                percentage %)

      7. wind_today : This will be updated to match the current wind speed.

      8. summary_today: This will be updated to match the current summary for the day's weather.

    */


    /* Process the daily forecast for the next 6 days */
    /*
      For the next 6 days you'll need to add a new card listing:
        1. The image icon for the day's weather
        2. The temperature high
        3. The temperature low

      Each card should use the following format:
      <div class="col-2">
        <div class="card">
          <img class="card-img-top" src="<!-- List Icon for the Day's Weather -->" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title"><!-- List Day of the Week Here --></h5>
            <p class="card-text">High:<!--List Temperature High --> <br>
              Low: <!-- List Temperature Low --></p>
          </div>
        </div>
      </div>

      <Hint/Note> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
      be set to the innerHTML for the 6_day_forecast.

    */

    var days_in_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //This is a helper array to help convert the day of the week [0-7] to a named value [Sunday - Saturday]
    var mynewdate = new Date(data.currently.time*1000);
    var mynewday = mynewdate.getDay();
    document.getElementById("current_day").innerHTML = days_in_week[mynewday];
    console.log(days_in_week);
    var i;
    for (i = 0; i < 6; i++)
    {
      var content = document.createElement("div");
      content.className = "col-md-2 col-sm-6";
      var mydate = new Date (data.daily.data[i].time*1000);
      var myday = mydate.getDay();
      var card = '<div class="card">'+
          '<img class="card-img-top" src="img/'+data.daily.data[i].icon +'.png" alt="Card image cap">' +
          '<div class="card-body">' +
            '<h5 class="card-title"> '+ days_in_week[myday] + '</h5>' +
            '<p class="card-text">High:'+ data.daily.data[i].temperatureHigh + ' <br>' +
              'Low: '+ data.daily.data[i].temperatureLow + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
      content.innerHTML = card;
      document.getElementById("6_day_forecast").appendChild(content);
    }




  })
})
