export default class ModalWin {
	constructor(modalId) {
		this.modal      = typeof modalId === "string" ? document.getElementById(modalId) : null;
		this.openClass  = "open";
		this.closeClass = "close";
		
		if (this.modal instanceof HTMLElement) {
			let openClass = this.openClass;
			let closeClass = this.closeClass;
			
			this.modal.addEventListener("click", function(event) {
				event = event || window.event;
				var target = event.target;
				
				if (target === this || (target instanceof HTMLElement && target.classList.contains(closeClass)))
					this.classList.remove(openClass);
			});
		}
	}

	open(btnClassName = "__js-mod-btn") {
		if (this.modal instanceof HTMLElement) {
			let modal = this.modal;
			let openClass = this.openClass;
			
			document.addEventListener("click", function(event) {
				event = event || window.event;
				var target = event.target;
				
				if (target instanceof HTMLElement && target.classList.contains(btnClassName)) {
					event.preventDefault();
					modal.classList.add(openClass);
				}
			});
		}
	}
}
