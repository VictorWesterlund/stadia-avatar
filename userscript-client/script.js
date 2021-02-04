(function() {
    'use strict';

    function getElementByJSname(name) {
        return document.querySelector(`[jsname="${name}"]`);
    }

    const myID = () => {
        let element = getElementByJSname("HiaYvf");
        return element.getAttribute("data-player-id");
    }

    function locationChanged() {
        switch(window.location.pathname) {
            case "/home": console.log("home"); break;
            case "/settings": console.log("settings"); break;
            default: break;
        }
    }

    let currentLocation = window.location.href;

    // Poll window.location.href for changes
    let poll = setInterval(() => {
        if(window.location.href != currentLocation) {
            currentLocation = window.location.href;
            locationChanged();
        }
    },500);

    locationChanged();
})();