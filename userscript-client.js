// ==UserScript==
// @name         Stadia Avatars
// @namespace    https://victorwesterlund.com/
// @version      1.0
// @description  victorWesterlund/stadia-avatar
// @author       VictorWesterlund
// @match        https://stadia.google.com/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    const stadiaAvatar = new URL("https://api.victorwesterlund.com/stadia-avatar/get");
    const gravatar = new URL("https://www.gravatar.com/");

    /*
        G: Suitable for display on all websites with any audience type.
        PG: May contain rude gestures, provocatively dressed individuals, the lesser swear words, or mild violence.
        R: May contain such things as harsh profanity, intense violence, nudity, or hard drug use.
        X: May contain hardcore sexual imagery or extremely disturbing violence.
    */
    gravatar.searchParams.set("rating","G");

    // Stylesheet for Stadia Avatars
    class StadiaAvatarCSS {

        constructor() {
            this.sheet = null;
            this.createStylesheet();
        }

        createStylesheet() {
            const style = document.createElement("style");
            style.setAttribute("data-stadia-avatars","");
            style.setAttribute("data-late-css","");

            document.head.appendChild(style);
            this.sheet = style.sheet;
        }

        // Serialized group of selectors based on context
        selectors(group,id = false) {
            switch(group) {
                case "me": return ".ksZYgc, .rybUIf";
                case "friends": return `.Y1rZWd[data-playerid="${id}"] .Fnd1Pd, .w2Sl7c[data-playerid="${id}"] .drvCDc`;
            }
        }

        add(selectors,avatar) {
            this.sheet.insertRule(`${selectors} { background-image: url(${avatar}) !important; }`);
            console.log(`${selectors} { background-image: url(${avatar}) !important; }`);
        }

    }

    const avatars = new StadiaAvatarCSS();

    // ----

    // Return the player ID attribute of an element
    const getID = (target) => {
        const id = target.getAttribute("data-player-id") ?? target.getAttribute("data-playerid");
        return id;
    }

    async function getStadiaAvatar(playerID) {
        stadiaAvatar.searchParams.set("userID",playerID);

        const response = await fetch(stadiaAvatar);
        return response.json();
    }

    // Fetch avatar and append to stylesheet
    function replaceWithGravatar(group,playerID) {
        getStadiaAvatar(playerID).then(response => {
            gravatar.pathname = "/avatar/" + response.avatar; // Append Gravatar hash
            avatars.add(avatars.selectors(group,playerID),gravatar); // Add style override by group
        });
    }

    // ----

    replaceWithGravatar("me",getID(document.querySelector("[jsname='HiaYvf']")));

    function updateFamily(group,wrapper) {
        for(const element of wrapper) {
            const id = getID(element);
            if(!id) {
                continue;
            }

            replaceWithGravatar(group,id);
        }
    }

    let timeout = null;

    const friendsList = (mutation,observer) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            const friends = document.querySelector("[jsname='FhFdCc']").children;
            const messages = document.querySelector("[jsname='FhFdCc']").children;

            updateFamily("friends",messages);
        },700);
    }

    const friendsMenu = document.querySelector("[jsname='TpfyL']");
    const friends = new MutationObserver(friendsList);
    friends.observe(friendsMenu,{
        childList: true,
        subtree: true
    });
    
})();