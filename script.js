$(document).ready(function () {
    $("#search-button").click(function () {
        var city = $("#city-search").val();
        if (city != "") {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" +
                    "&APPID=0992f28cfa1bfbde223a7da7175e9ee0",
                method: "GET",
                success: function (data) {
                    var showDisplay = show(data)
                    $("#search-list").prepend($("<br><button class='searched-city' data-name='" + city + "'>" + city + "</button>"));
                    $("#forecast").html(showDisplay);
                    $("#city-search").val("");
                }
            })
        }
    })

    $(document).on("click", ".searched-city", function () {
        var savedCity = $(this).attr("data-name")
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + savedCity + "&units=imperial" +
                "&APPID=0992f28cfa1bfbde223a7da7175e9ee0",
            method: "GET",
            success: function (data) {
                var showDisplay = show(data)
                $("#forecast").html(showDisplay);
            }

        })
    })
})



function show(data) {
    return " <br> <br> <h3 id='contentheader'><strong>" + data.name + ", " + data.sys.country + "</h3>" +

        "<h3><img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'><br> " + data.weather[0].description + "</h3>" +
        "<h3 id='temp'>" + data.main.temp + " &deg;F </h3>" +
        "<p><strong>Humidity</strong>: " + data.main.humidity + " %</p>" +
        "<p><strong>Wind Speed</strong>: " + data.wind.deg + " m/s </p>"

}