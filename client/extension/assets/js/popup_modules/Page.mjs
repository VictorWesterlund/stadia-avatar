export class Page {

	constructor(title = "") {
		this.body = null;
		this.style = getComputedStyle(document.body);

		this.pageDepth = () => {
			return parseInt(this.style.getPropertyValue("--page-depth"));
		}

		this.create(title);
	}

	create(title) {
		// Create elements
		const wrapper = document.createElement("div");
		this.body = document.createElement("div");
		const header = document.createElement("div");
		const backButton = document.createElement("div");

		const pageDepth = (this.pageDepth() + 1) * 100;

		// Add element attributes
		wrapper.classList.add("page");
		wrapper.style.setProperty("left",pageDepth + "%");
		this.body.classList.add("body");
		header.classList.add("header");
		backButton.classList.add("back");
		backButton.setAttribute("title",chrome.i18n.getMessage("page_return"));

		// Attach interfaces
		wrapper.close = () => this.close(); // Attach public interface to close this page
		backButton.addEventListener("click",() => this.close());

		// Append document subtree
		header.appendChild(backButton);
		header.insertAdjacentHTML("beforeend",`<p>${title}</p>`);
		wrapper.appendChild(header);
		wrapper.appendChild(this.body);
		document.body.appendChild(wrapper);
	}

	destroy() {
		const wrapper = this.body.closest(".page");

		while(wrapper.firstChild) {
			wrapper.removeChild(wrapper.lastChild);
		}
		wrapper.remove();
	}

	appendHTML(HTML) {
		this.body.insertAdjacentHTML("beforeend",HTML);
	}

	// ----

	close() {
		const delay = parseInt(this.style.getPropertyValue("--animation-speed"));
		document.body.style.setProperty("--page-depth",this.pageDepth() - 1);

		setTimeout(() => {
			this.destroy();
		},delay);
	}

	open() {
		document.body.style.setProperty("--page-depth",this.pageDepth() + 1);
	}

}
