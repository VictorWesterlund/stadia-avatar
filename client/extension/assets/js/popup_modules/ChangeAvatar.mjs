import { Page } from "./Page.mjs";

export class AvatarURL extends Page {

	constructor() {
		super(chrome.i18n.getMessage("avatar_set") + " URL");

		this.appendHTML(`<p>${chrome.i18n.getMessage("avatar_set_url_support")}</p>`);
		this.open();
	}

}
