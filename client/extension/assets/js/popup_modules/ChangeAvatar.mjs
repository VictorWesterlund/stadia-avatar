import { Page } from "./Page.mjs";

export class AvatarURL extends Page {

	constructor() {
		super(chrome.i18n.getMessage("avatar_set") + " URL");

		this.appendHTML(`<p>${chrome.i18n.getMessage("avatar_set_url_support")}</p>`);
		this.open();
	}

	content() {
		const input = document.createElement("input");
		const submit = document.createElement("button");

		this.body.appendChild(input);
		this.body.appendChild(submit);
	}

}
