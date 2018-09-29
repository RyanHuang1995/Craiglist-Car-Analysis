
url = "../Car Price data/altima_data.csv"

d3.csv(url).then(function(data){

    console.log(data);
    data.forEach(function (data) {
        
        data.odometer = +data.odometer;
        data.price = +data.Price;
        if (data.cylinders != NaN){
        data.cylinders = +(data.cylinders.substring(0));
        }
    });

    var scatterSVG = d3.select(".scatter").append("svg");

});