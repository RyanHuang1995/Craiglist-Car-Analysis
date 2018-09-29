//checkbox:

function myFunction() {
    // Get the checkbox
    var checkBox = document.getElementById("myCheck");
    // Get the output text
    var text = document.getElementById("text");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }






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



