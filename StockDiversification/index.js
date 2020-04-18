// document.getElementById("AddStockButton").onclick = function() {SpawnInputStockText()};

// function SpawnInputStockText() {
    
// }

$(document).ready(function()) {
    $("PlayButton").click(function(){
        var canvas = document.getElementById("TheCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "FF0000";
        ctx.fillRect(0, 0, 150, 75);
    })
}

