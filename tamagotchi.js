

    function updatestats()
    {
        var BgPage = chrome.extension.getBackgroundPage();
        var save = BgPage.save;

        document.getElementById("hunger").innerHTML = save["hunger"];
        document.getElementById("thirst").innerHTML = save["thirst"];
        document.getElementById("energy").innerHTML = save["energy"];
        document.getElementById("happiness").innerHTML = save["happiness"];
        document.getElementById("age").innerHTML = save["age"];
        
        //check if alive
        if (save["hunger"] > 0 && save["thirst"] > 0 && save["happiness"] > 0 && save["energy"] > 0) {
            //check if happy
            if (save["happiness"] >= 81)
            {
                document.getElementById("happy-panda").style.visibility = "visible";
                document.getElementById("normal-panda").style.visibility = "hidden";
                document.getElementById("dead-panda").style.visibility = "hidden";
                document.getElementById("crying-panda").style.visibility = "hidden";
            }
            else if ((save["happiness"] >= 1 && save["happiness"]<=20) || (save["thirst"] >= 1 && save["thirst"]<=20) || (save["hunger"] >= 1 && save["hunger"]<=20)){
                document.getElementById("happy-panda").style.visibility = "hidden";
                document.getElementById("normal-panda").style.visibility = "hidden";
                document.getElementById("dead-panda").style.visibility = "hidden";
                document.getElementById("crying-panda").style.visibility = "visible";
            }
            else
            {
                document.getElementById("happy-panda").style.visibility = "hidden";
                document.getElementById("normal-panda").style.visibility = "visible";
                document.getElementById("dead-panda").style.visibility = "hidden";
                document.getElementById("crying-panda").style.visibility = "hidden";
            }
        }
        else
        {
            document.getElementById("happy-panda").style.visibility = "hidden";
            document.getElementById("normal-panda").style.visibility = "hidden";
            document.getElementById("dead-panda").style.visibility = "visible";
            document.getElementById("crying-panda").style.visibility = "hidden";
        }
        
        window.setTimeout(updatestats, 1000);
    }
    updatestats();

    //user input
    function temp_dis(button_id)
    {
        document.getElementById(button_id).disabled = true;
        window.setTimeout(function()
        {
            document.getElementById(button_id).disabled = false;
        }, 2000);

    }
    document.getElementById('pet-feed').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "pet-feed"});
        temp_dis('pet-feed');
    };
    document.getElementById('pet-drink').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "pet-drink"});
        temp_dis('pet-drink');
    };
    document.getElementById('pet-exercise').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "pet-exercise"});
        temp_dis('pet-exercise');
    };
    document.getElementById('pet-sleep').onclick = function()
    {
        chrome.runtime.sendMessage({buttonID: "pet-sleep"});
        temp_dis('pet-sleep');
    };