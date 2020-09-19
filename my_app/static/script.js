states = []; // holds list of states not yet complete
populateStates = () => {
    // states = ["Texas", "Alaska", "California"];
    for (let state in usMap) {
        if (state === "dc")
            continue;
        states.push(state);
    }
};

getRandomState = () => {
    let rand = Math.floor(Math.random() * states.length);
    if(states.length > 0){
        document.getElementById("current-state").innerHTML = "Click on " + states[rand];
    }
    else{
        document.getElementById("progress").setAttribute("style", "width: " + 100 + "%;")
        document.getElementById("current-state").innerHTML = "You Win!";
        pause();
    }
    return states[rand];
};

// Timer Stuff
let ms = 0, s = 0, m = 0;
let timer;
let stopwatchEl = document.querySelector('.stopwatch');

function start() {
    timer = setInterval(run, 10);
}

function run() {
    stopwatchEl.textContent = (m < 10 ? "0" + m : m)+ ":" + (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms);
    ms++;
    if(ms == 100){
        ms = 0;
        s++;
    }

    if(s == 60) {
        s = 0;
        m++;
    }
} 

function pause() {
    clearInterval(timer);
}

window.onload = function () {
    populateStates();
    let currentState = getRandomState();
    

    let R = Raphael("container", 1000, 900),
        attr = {
        "fill": "#d3d3d3",
        "stroke": "#fff",
        "stroke-opacity": "1",
        "stroke-linejoin": "round",
        "stroke-miterlimit": "4",
        "stroke-width": "0.75",
        "stroke-dasharray": "none"
    },
    usRaphael = {};

    //Draw Map and store Raphael paths
    for (let state in usMap) {
        usRaphael[state] = R.path(usMap[state]).attr(attr);
    }
    
    //Do Work on Map
    for (let state in usRaphael) {
        usRaphael[state].color = Raphael.getColor();
        
        function doSomething(st, state) {

            st[0].style.cursor = "pointer";

            st[0].onmousedown = function () {
                console.log(state);
                if (currentState === state) {
                    //removing a state from array
                    var index = states.indexOf(state);
                    if (index > -1) {
                        states.splice(index, 1);
                    }
                    st.animate({fill: "green"}, 100000000000);
                    console.log('congratulations!');
                    currentState = getRandomState();
                    
                    document.getElementById("progress").setAttribute("style", "width: " + (50 - states.length) * 2 + "%;")

                    // start timer
                    if(states.length == 49){
                        start();
                    }
                }
                else{
                    st.animate({fill: "red"});
                    st.toFront();
                    R.safari();
                }
                
            }
            st[0].onmouseover = function () {
                st.animate({fill: st.color}, 500);
                st.toFront();
                R.safari();
            };
      
              st[0].onmouseout = function () {
                st.animate({fill: "#d3d3d3"}, 500);
                st.toFront();
                R.safari();
              };
        }
        doSomething(usRaphael[state], state);
    }

};

