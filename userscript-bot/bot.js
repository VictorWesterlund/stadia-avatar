(function() {
	'use strict';

	const targetJSName = "FhFdCc";
	let observer = null;

	const receivedMessage = (mutations,observer) => {
		const mutation = mutations[3].addedNodes[0];
		console.log(mutations);
	}

	function attachObserver() {
		const target = document.querySelector(`[jsname="${targetJSName}"]`);

		observer = new MutationObserver(receivedMessage);
		observer.observe(target,{
			subtree: true,
			childList: true,
			attributes: true,
			characterData: true
		});
	}

	// Start the StadiaAvatar bot with 'window._StadiaAvatar()'
    window._StadiaAvatar = () => {
		attachObserver();
		console.log("StadiaAvatar bot started.");
	}
})();