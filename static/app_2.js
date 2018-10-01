//-----------------------------------------
//functions 
//-----------------------------------------



// create plotly scatterplot
function scatterPlot(route) {

    d3.json(`/api/${route}`).then(function(data){

        var xData = [];
        var yData = [];
        console.log(data);
        data.forEach(function (data) {
            console.log(data);

            console.log("running scatter plot foreach");
            data.Odometer = +data.Odometer;
            data.Price = +data.Price.substring(1);
            console.log(data.Price);
            console.log(data.Odometer);

            xData.push(data.Odometer);
            yData.push(data.Price);

        });

        console.log(data[0], 'print first row of route data');
        
        var scatter = document.getElementById('scatter');

        var myPlot = document.getElementById('scatter'), 
        data = [{x:xData, y:yData, hoverinfo: 'x+y', mode: 'markers', markers:{size:50,color:'green'},
        type: 'scatter', name: `${route}`.toUpperCase()}],
        layout = {
            showlegend: true,
            title: 'Car Ad Listing',
            xaxis: {
                title: 'Odometer (miles)',
                titlefont: {
                    family: 'Courier New, monospace',
                    size: 20,
    
                }
            },
            yaxis: {
                title: 'Price ($)',
                titlefont: {
                    family: 'Courier New, monospace',
                    size: 20,
                }
            },
            hovermode: 'closest'
            };
        console.log(myPlot);
        //create scatter plot
        Plotly.newPlot(scatter, data, layout, {responsive: true});



});
}



// create barChart

function barChart(route) {
    // Range 0 - 3000
    var range1 = 0;
    // Range 3000 - 6000
    var range2 = 0;
    // Range 6000 - 9000
    var range3 = 0;
    // Range 9000 - 12000
    var range4 = 0;
    // Range 12000-15000
    var range5 = 0; 
    // Range 15000-18000
    var range6 = 0;
    // Range 18000-21000
    var range7 = 0;
    //// Range 21000-24000
    var range8 = 0;

    var numbers = [];

    // Read the CSV, then compare the price to the range -> for loop
    // For loop
    d3.json(`/api/${route}`).then( function(data) {

        data.forEach(function (data) {
            console.log("running bar chart foreach");
            data.Price = +data.Price.substring(1);
        });


        data.forEach(function (data) {
            numbers.push(data.Price)

            if (data.Price >= 0 && ata.Price <= 3000) {
                range1++
            } 
            else if (data.Price >= 3001 && data.Price <= 6000) {
                range2++
            } 
            else if (data.Price >= 6001 && data.Price <= 9000 ) {
                range3++
            } 
            else if (data.Price >= 9001 && data.Price <= 12000 ) {
                range4++
            }
            else if (data.Price >= 12001 && data.Price <= 15000 ) {
                range5++
            }
            else if (data.Price >= 15001 && data.Price <= 18000 ) {
                range6++
            }
            else if (data.Price >= 18001 && data.Price <= 21000 ) {
                range7++
            }
            else if (data.Price >= 21001 && data.Price <= 24000 ) {
                range8++  
            };
        });
        console.log(range1);
        //generate c3 barchart
        var chart = c3.generate({
            bindto: '.barchart',
            data: {
                columns: [
                
                    ['0-3K', range1],
                    ['3K-6K', range2],
                    ['6K-9K', range3],
                    ['9K-12K', range4],
                    ['12k-15k',range5],
                    ['15k-18k',range6],
                    ['18k-21k',range7],
                    ['21k-24k',range8]
                ],

                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.4 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            },
            axis: {
            x: {
                categories: ['Category 1', 'Category 2']
            },

            axis: {
            x: {
                label: 'X Label'
                },
            y: {
                label: 'Y Label'
            },

                
            }
            }
        });

    });

}

// // create tableChart
// function tableChart(route) {

// }





//-----------------------------------------
// rendering default dashboard   
//-----------------------------------------

var defaultURL = "accord"

function initialize(defaultURL) {

    scatterPlot(defaultURL);
    barChart(defaultURL);
    // tableChart(defaultURL);

}





//-----------------------------------------
// update dashboard  
//-----------------------------------------
function getData(value) {
    
    //remove charts 
    d3.select(".scatter").html("");
    d3.select(".barchart").html("");
    d3.select(".table").html("");

    //update charts
    scatterPlot(value);
    barChart(value);
    // tableChart(value);
    // gaugeChart(value);
}






//-----------------------------------------
// initialize dashboard
//-----------------------------------------
initialize(defaultURL);