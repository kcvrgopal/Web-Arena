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
        is3D: true
    };

    var optionsDonut = {
        title: 'Your Pizza Constituents',
        pieHole: 0.4
    };


    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    var donutChart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data1, options);
    donutChart.draw(data1, optionsDonut);
}