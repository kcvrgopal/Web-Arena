/**
 * Created by rajagopalan on 10/18/14.
 */
function visualize(data1) {
    google.load('visualization', '1.0',{ callback: function() { drawChart(data1)} , 'packages':['piechart','corechart']});    //google.setOnLoadCallback(drawChart);
}

function drawChart(data) {
    var oldData = data;
    var newData = [];
    newData.push(['Task', 'Hours per Day']);
    for(d in oldData)
    {
        newData.push(oldData[d]);
    }
    var data1 = google.visualization.arrayToDataTable(
        newData);

    var options = {
        title: 'Your Pizza Constituents',
        is3D: true,
        backgroundColor: "#FAF0E6"
    };

    var optionsDonut = {
        title: 'Your Pizza Constituents',
        pieHole: 0.4,
        backgroundColor: "#FAF0E6"
    };


    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    var donutChart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data1, options);
    donutChart.draw(data1, optionsDonut);
    var oldToppings = window.localStorage.getItem("oldToppings");
    if(oldToppings!=null)
    {
        var diffChart = new google.visualization.PieChart(document.getElementById('diffchart'));
        var old1 = google.visualization.arrayToDataTable(JSON.parse(oldToppings));
        var diffData = diffChart.computeDiff(old1, data1);
        var options = {
            title: 'Your Pizza Constituents',
            is3D: true,
            backgroundColor: "#FAF0E6",
            opacity: 0.8,
            borderFactor: 0.05
        };
        diffChart.draw(diffData, options);
    }
    window.localStorage.setItem("oldToppings", JSON.stringify(newData));
}