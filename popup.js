document.addEventListener('DOMContentLoaded', function () {
    function updatestats()
    {
        var BgPage = chrome.extension.getBackgroundPage();
        var save = BgPage.save;

        document.getElementById("hunger").innerHTML = save["hunger"];
        document.getElementById("thirst").innerHTML = save["thirst"];
        document.getElementById("age").innerHTML = save["age"];
        document.getElementById("energy").innerHTML = save["energy"];
        document.getElementById("happiness").innerHTML = save["happiness"];
        

        window.setTimeout(updatestats, 2000);
    }
    updatestats();
});