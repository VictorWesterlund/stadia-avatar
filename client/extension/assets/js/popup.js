import { AvatarURL } from "./popup_modules/ChangeAvatar.mjs";

// Localize by replacing __MSG_***__ strings in DOM
function localizePage() {
    for (var i = 0; i < document.body.children.length; i++) {
        const element = document.body.children[i];

        let valStrH = element.innerHTML.toString();
        const valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match,key)  => {
            return key ? chrome.i18n.getMessage(key) : "";
        });

        if(valNewH != valStrH) {
            element.innerHTML = valNewH;
        }
    }
}

function eventHandler(event) {
	const target = event.target.closest("[button]");
	switch(target.getAttribute("button")) {
		case "avatar:url": new AvatarURL(); break;
	}
}

document.addEventListener("DOMContentLoaded", function () {
    // Bind click listeners to all button attributes
	for(const button of document.querySelectorAll("[button]")) {
		button.addEventListener("click",event => eventHandler(event));
	}
});

localizePage();