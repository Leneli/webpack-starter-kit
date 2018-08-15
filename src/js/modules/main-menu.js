import FixPagePosition from "./fix-page";
import isMobile from "./is-mobile";

export default function() {
	var __private = {
		menuId: "mainMenuSection",
		hamburgId: "mobileMenuControl",
		subBtnClass: "nav__arr",

		openClass: "open",
		closeClass: "close",
		submenuTagName: "UL",

		listener() {
			document.addEventListener("click", function(event) {
				event = event || window.event;
				var target = event.target;

				if (target instanceof HTMLElement) {
					if (target.id === __private.hamburgId) __private.mobilemenu(target);
					
					if (target.id === __private.menuId && target.classList.contains(__private.openClass))
						__private.mobileMenuClose(target);
					
					if (target.classList.contains(__private.subBtnClass)) __private.submenu(target);
					
					if (!target.classList.contains(__private.subBtnClass) && target.tagName !== "A") __private.outside();
				}
			});
			
			/* if (isMobile().ios() !== null) {
				let modileMenu = document.getElementById(this.menuId);
				
				if (modileMenu instanceof HTMLElement) {
					modileMenu.addEventListener("touchend", function() {
						if (this.classList.contains(__private.openClass)) __private.mobileMenuClose(this);
					});
				}
			} */
		},
		
		mobilemenu(target) {
			var menu = document.getElementById(this.menuId);
			
			if (!target.classList.contains(this.closeClass)) {
				target.classList.add(this.closeClass);
				if (menu) menu.classList.add(this.openClass);
				
				FixPagePosition(true);
			} else {
				target.classList.remove(this.closeClass);
				if (menu) menu.classList.remove(this.openClass);
				
				FixPagePosition(false);
			}
		},
		
		mobileMenuClose(target) {
			var button = document.getElementById(this.hamburgId);
			
			target.classList.remove(this.openClass);
			if (button) button.classList.remove(this.closeClass);
			
			FixPagePosition(false);
		},
		
		submenu(target) {
			var ul = target instanceof HTMLElement && target.nextElementSibling && target.nextElementSibling.tagName === this.submenuTagName ? target.nextElementSibling : null;
			
			if (target.classList.contains(this.openClass)) {
				target.classList.remove(this.openClass);
				if (ul) ul.classList.remove(this.openClass);
			} else {
				target.classList.add(this.openClass);
				if (ul) ul.classList.add(this.openClass);
			}
		},
		
		outside() {
			var arrow = document.querySelector(`#${this.menuId} .${this.subBtnClass}`);
			var submenu = arrow instanceof HTMLElement && arrow.nextElementSibling && arrow.nextElementSibling.tagName === this.submenuTagName ? arrow.nextElementSibling : null;

			if ((arrow && arrow.classList.contains(this.openClass)) && (submenu && submenu.classList.contains(this.openClass))) {
				arrow.classList.remove(this.openClass);
				submenu.classList.remove(this.openClass);
			}
		}
	};
	
	return {
		init() {
			__private.listener();
		}
	};
};
