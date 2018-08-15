export default class Sticky {
	constructor(elem) {
		if (elem instanceof HTMLElement) 
			document.addEventListener("scroll", function() {
				var stickyClass = "sticky";
				var line = elem.getBoundingClientRect().height * -1;

				if (document.body.getBoundingClientRect().top <= line)
					elem.classList.add(stickyClass);
				else
					elem.classList.remove(stickyClass);
			});
	}
}
