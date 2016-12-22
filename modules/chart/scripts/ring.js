    console.log("loading");
Raphael.fn.ringChart = function (cx, cy, r, values, labels, stroke) {
    console.log(this);
    var paper = this;
    var angle = {
        start: 0,
        end: 180
    };
    var start = {
        x: cx - r,
        y: cy
    };
    var end = {
        x: cx + r,
        y: cy
    };
    // var circle = paper.circle(cx, cy, r);
    // circle.attr("fill", "#ffff00")
    var path =[
        ["M", end.x, end.y ],
        ["A", r, r, 0, 1, 1, end.x, end.y],
        ["L", start.x, start.y]

    ]

    var circle = paper.path("M67,192L40,192A120,120,0,0,1,280,192L253,192A93,93,0,0,0,67,192Z");

    paper.path("M67,195L40,195");
    circle.attr("fill", "#ff0");

    //return chart;
};

$(function () {
    var values = [20,20,10,5,1,2],
        labels = ["Ruby", "JavaScript", "Shell" ,"Python" , "PHP"];

    Raphael("holder", 500, 500).ringChart(250, 250, 100, values, labels, "#fff");
});
