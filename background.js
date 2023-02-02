chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.buttonID == "pet-feed"){
        pet_feed();
    }
    if (request.buttonID == "pet-drink"){
        pet_drink();
    }
    if (request.buttonID == "pet-exercise"){
        pet_exercise();
    }
    if (request.buttonID == "pet-sleep"){
        pet_sleep();
    }
});

var hunger;
var thirst;
var happiness;
var energy;
var age;
var time;
var stats = true;
var alerted = false;
var save = {};

function saveStats(){
    save["hunger"] = hunger;
    save["thirst"] = thirst;
    save["happiness"] = happiness;
    save["energy"] = energy;
    save["age"] = Math.trunc(age);
    save["time"] = time;
    save["alerted"] = alerted;
    save["stats"] = stats;
    chrome.storage.sync.set(save, function() {
        console.log('Pet is saved!');
    });
}

function loadStats(){
    chrome.storage.sync.get(save, function(result) {
        if (typeof result["hunger"] == 'undefined' || ""){
            console.log("No previous stats, starting new pet")
        }
        else{
            hunger = result["hunger"];
            thirst = result["thirst"];
            happiness = result["happiness"];
            energy = result["energy"];
            age = result["age"];
            time = result["time"];
            alerted = result["alerted"];
            stats= result["stats"];
            console.log("Stats loaded");
        }
    });
}
function petStatus(){
    if (hunger > 0 && thirst > 0 && energy > 0 && happiness <= 100){
        if (hunger <= 20 && alerted == false){
            alerted = true;
            alert("Your pet is hungry. Please eat something!");
        }
        else if (thirst <= 20 && alerted == false){
            alerted = true;
            alert("Your pet is thirsty. Please drink some water!");
        }
        else if (happiness <= 20 && alerted == false){
            alerted = true;
            alert("Your pet is bored. Time to take a break!");
        }
        else if (energy <= 20 && alerted == false){
            alerted = true;
            alert("Your pet is tired. It's time to sleep!");
        }
        return true;
    }
    else{
        chrome.storage.local.clear(function(){
            var error = chrome.runtime.lastError;
            if (error){
                console.error(error);
            }
        });
        stats = false;
        return alert("You forgot about your pet. Your pet died!")
    }
}

function starving(){
    petStatus();
    hunger -= 1;
}

function thirsty(){
    petStatus();
    thirst -= 1;
}

function aging(){
    petStatus();
    age += 1;
}
window.setTimeout(aging, 86400000);

function bored(){
    happiness -= 1;
    if (happiness < 0){
        happiness = 0;
    }
}

function tired(){
    energy -= 1;
    if (energy < 0){
        energy = 0;
    }
}
window.setTimeout(loop,500);

function loop(){
    if (typeof save["hunger"] == "undefined"){
        hunger = 100;
        thirst = 100;
        happiness = 100;
        energy = 100;
        age = 1;
        time = 0;
        pastTime = 0;
        stats = true;
        console.log("Pet has been loaded");
    }
    else{
        loadStats();
    }
    starving();
    thirsty();
    bored();
    tired();
    aging();
    time += 1;
    saveStats();
    if (petStatus()){
        window.setTimeout(loop,500);
    }
}

function pet_feed(){
    if (stats == true){
        petStatus();
        hunger += 50;
        happiness += 10;
        alerted = false;
    
        if (hunger >= 100){
            hunger = 100;
        }
        if (happiness >= 100){
            happiness = 100;
        }
        saveStats();
    }
}
function pet_drink(){
    if (stats == true){
        petStatus();
    thirst += 40;
    alerted = false;
    if (thirst >= 100){
        thirst = 100;
    }
    saveStats();
    }
}

function pet_exercise(){
    if (stats == true){
        petStatus();
        happiness += 30;
        alerted = false;
        if (happiness >= 100){
            happiness = 100;
        }
        saveStats();
    }
}


function pet_sleep(){
    if (stats == true){
        petStatus();
        energy += 100;
        alerted = false;
        if (energy >= 100){
            energy = 100;
        }
        saveStats();
    }
}
