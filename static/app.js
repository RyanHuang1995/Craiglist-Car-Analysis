

//creating svg
// create svg element's dimensions
// var svgWidth = $("#scatter-row").width();
// var svgHeight = $("#scatter-row").height();
var svgWidth = 1200;
var svgHeight = 500;

var widthScale = 1;
var heightScale = 1;
//setting margins for the chart
var chartMargin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
};

// chart area minus margins
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

    //append svg element to the body element
var svg = d3.select(".scatter").append("svg")
    .style("border", "2px black solid")
    .attr("height", svgHeight)
    .attr("width", svgWidth)


//append g element to transform and create chart within svg element
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`).append("svg");

console.log("svg")

// load data 




function getData(route) {
        d3.json(`/api/${route}`).then(function(data) {
            console.log(data);
            data.forEach(function (data) {
                console.log("running foreach");
                data.odometer = +data.Odometer;
                data.price = +data.Price.substring(1);
                
            });

            console.log("passed for each part");
            var xData = data.map( x => x.price)
            var yData = data.map( x => x.odometer)
            
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
                .text("Odometer (miles)");          

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
                .text("Price ($)");
            
            console.log("append xaxis text");


            // Step 1: Initialize Tooltip
            var toolTip = d3.tip()
            .attr("class", `tooltip ${route}`)
            .offset([-10, 0])
            .html(function(data) {
                return (`<p>Odometer:<span style="color:yellow">&nbsp;&nbsp;${data.odometer}%</span></p>Price:<span style="color:yellow">&nbsp;&nbsp;${data.price}%</span></p>`);
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
            

            
            var circles = groups.append("circle")
                .attr("class", `${route}`)
                .attr("r", "4")
                .attr("cy", 0)
                .attr("cx", 0)
                .attr("cy", function(data) {return yScale(data.price)})
                .attr("cx", function(data) {return xScale(data.odometer)})
                .attr("fill", "gold")
                .attr("stroke", "black")
                .attr("stroke-width",1)
                .attr("opacity", 1);
            

            groups.on("mouseover", toolTip.show).on("mouseout", toolTip.hide);



            circles.call(toolTip);
 

        
        }); 
}





