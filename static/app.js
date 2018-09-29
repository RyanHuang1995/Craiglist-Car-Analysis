//checkbox:

function accordFunction() {
}
function civicFunction() {
}
function camryFunction() {
}
function priusFunction() {
}
function corollaFunction() {
}
function camryFunction() {
}



//creating svg
// create svg element's dimensions
var svgWidth = 900;
var svgHeight = 700;


var widthScale = 1;
var heightScale = 1;
//setting margins for the chart
var chartMargin = {
    top: 30,
    bottom: 30, 
    left: 30,
    right: 30
};

    //append svg element to the body element
var svg = d3.select(".scatter").append("svg")
    .style("border", "2px black solid")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("viewBox", "0 0 30 30");
//check if svg element is created
console.log(svg);

//append g element to transform and create chart within svg element
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`).append("svg");

// load data 



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

    var xData = data.map( x => x.odometer)
    var yData = data.map( x => x.price)
    

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(yData)])
        .range([chartHeight, 0]);




    var xScale = d3.scaleLinear()
        .domain([0, d3.max(xData)])
        .range([d3.min(xData), chartWidth])


    //create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);


    chartGroup.append("g")
        .call(yAxis);

    // text label for the y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (chartMargin.left/1.5))
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Price ($)");          



    // move xAxis to the bottom of the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("text")             
        .attr("transform",
                "translate(" + (chartWidth/2) + " ," + 
                                (chartHeight + chartMargin.top-25) + ")")
        .style("text-anchor", "middle")
        .text("Odometer");
    


    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(function(data) {
        return (`<p>Price:<span style="color:yellow">&nbsp;&nbsp;${data.price}%</span></p>Odometer:<span style="color:yellow">&nbsp;&nbsp;${data.odometer}%</span></p>`);
    });

    var groups = chartGroup.selectAll("g .markers")
        .data(data)
        .enter()
        .append("g")
        .classed("markers",true)
        // .attr("id", function(data){return data.id})
        .attr("transform", function(data) {
            return `translate(${xScale(data.price)}, ${yScale(data.odometer)})`;
        });
    
    // var markerText = groups.append("text").text(function(data) {return data.abbr}).attr("class", "abbr").attr("text-anchor","middle").attr("alignment-baseline","central");
    // var markerText = groups.append("text").text(function(data) {return data.abbr}).attr("class", "abbr");

    
    var circles = groups.append("circle")
        .attr("class", "points")
        .attr("r", "15")
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





