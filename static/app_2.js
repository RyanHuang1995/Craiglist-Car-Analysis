//-----------------------------------------
//functions 
//-----------------------------------------

// When the browser window is resized, responsify() is called.
var window = ".scatter"
d3.select(window).on("resize", scatterPlot);


// create scatterPlot 
function scatterPlot(route) {
    // create svg element's dimensions
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
      svgArea.remove();
    }

    var svgWidth = window.innerWidth * 0.8;
    var svgHeight = window.innerHeight * 0.5;

    var widthScale = 1;
    var heightScale = 1;

    //setting margins for the chart
    var chartMargin = {
        top: 50,
        bottom: 50, 
        left: 50,
        right: 50
    };

    // chart area minus margins
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

    //append svg element to the body element
    var svg = d3.select(".scatter")
        .append("svg")
        .style("border", "2px black solid")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        // .attr("viewBox", "0 0 30 30");
    //check if svg element is created

    //append g element to transform and create chart within svg element
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`).append("svg");




    d3.json(`/api/${route}`).then(function(data) {
        console.log(data);
        data.forEach(function (data) {
            console.log("running foreach");
            data.odometer = +data.Odometer;
            data.price = +data.Price.substring(1);
            
        });

        console.log("passed for each part");
        var xData = data.map( x => x.odometer)
        var yData = data.map( x => x.price)
        
        console.log("xdata worked");

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(yData)])
            .range([chartHeight, 0]);


        console.log("yScale worked");

        var xScale = d3.scaleLinear()
            .domain([0, d3.max(xData)])
            .range([d3.min(xData), chartWidth])

        console.log("xScale worked")
        //create axes
        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);


        chartGroup.append("g")
            .call(yAxis);

        console.log("appen yaxis worked");

        // text label for the y axis
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", 0)
            .style("text-anchor", "middle")
            .text("Price ($)");          

        console.log("appen yaxis text");


        // move xAxis to the bottom of the chart
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);


        console.log("appen xaxis ");

        chartGroup.append("text")             
            .attr("transform",
                    "translate(" + (chartWidth/2) + " ," + 
                                    (chartHeight + chartMargin.top-25) + ")")
            .style("text-anchor", "middle")
            .text("Odometer");
        
        console.log("append xaxis text");


        // Step 1: Initialize Tooltip
        var toolTip = d3.tip()
        .attr("class", `tooltip ${route}`)
        .offset([-10, 0])
        .html(function(data) {
            return (`<p>Price:<span style="color:yellow">&nbsp;&nbsp;$${data.price}</span></p>Odometer:<span style="color:yellow">&nbsp;&nbsp;${data.odometer}%</span></p>`);
        });
        console.log("tooltip append");


        var groups = chartGroup.selectAll("g .markers")
            .data(data)
            .enter()
            .append("g")
            .classed("markers",true)
            .attr("id", `${route}`)
            // .attr("id", function(data){return data.id})
            .attr("transform", function(data) {
                return `translate(${xScale(data.odometer)}, ${yScale(data.price)})`;
            });
        
        // var markerText = groups.append("text").text(function(data) {return data.abbr}).attr("class", "abbr").attr("text-anchor","middle").attr("alignment-baseline","central");
        // var markerText = groups.append("text").text(function(data) {return data.abbr}).attr("class", "abbr");

        
        var circles = groups.append("circle")
            .attr("class", `${route}`)
            .attr("r", "5")
            .attr("cy", 0)
            .attr("cx", 0)
            // .attr("cy", function(data) {return yScale(data.healthcare)})
            // .attr("cx", function(data) {return xScale(data.poverty)})
            .attr("fill", "gold")
            .attr("stroke", "black")
            .attr("stroke-width",0.5)
            .attr("opacity", 0.5);
        

        groups.on("mouseover", toolTip.show).on("mouseout", toolTip.hide);



        circles.call(toolTip);


    
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
    console.log('Before D3 CSV');
    // For loop
    d3.json(`/api/${route}`).then( function(data) {

        data.forEach(function (data) {
            console.log("running bar chart foreach");
            data.price = +data.Price.substring(1);
            
        });
        console.log('This is data: ', data)


        data.forEach(function (data) {
            numbers.push(data.price)
            console.log(typeof parseInt(data['Price']));

            if (data.price >= 0 && data.price <= 3000) {
            console.log('Inside condition 1')
            range1++
            } else if (data.price >= 3001 && data.price <= 6000) {
            console.log('Inside condition 2')
            range2++
            } else if (data.price >= 6001 && data.price <= 9000 ) {
            console.log('Inside condition 3')
            range3++
            } else if (data.price >= 9001 && data.price <= 12000 ) {
            console.log('Inside condition 4')
            range4++
            }else if (data.price >= 12001 && data.price <= 15000 ) {
            console.log('Inside condition 5')
            range5++
            }else if (data.price >= 15001 && data.price <= 18000 ) {
            console.log('Inside condition 6')
            range6++
            }else if (data.price >= 18001 && data.price <= 21000 ) {
            console.log('Inside condition 7')
            range7++
            }else if (data.price >= 21001 && data.price <= 24000 ) {
            console.log('Inside condition 8')
            range8++  
            };
        });

        console.log('range1: ', range1)
        console.log('range2: ', range2)
        console.log('range3: ', range3)
        console.log('range4: ', range4)
        console.log('range5: ', range5)
        console.log('range6: ', range6)
        console.log('range7: ', range7)
        console.log('range8: ', range8)

        console.log(numbers)

        
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

// // create gaugeChart
// function gaugeChart(route) {

// }






//-----------------------------------------
// rendering default dashboard   
//-----------------------------------------

var defaultURL = "accord"

function initialize(defaultURL) {

    scatterPlot(defaultURL);
    barChart(defaultURL);
    // tableChart(defaultURL);
    // gaugeChart(defaultURL);

}





//-----------------------------------------
// update dashboard  
//-----------------------------------------
function getData(value) {
    
    //remove charts 
    d3.select(".scatter").html("");
    d3.select(".gauge").html("");
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