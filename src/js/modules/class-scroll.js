export default class ScrollAnchor {
	constructor(hash, options) {
		this.hash = hash;
		this.options = options;
	}

	run() {
		var hash = this.hash;
		var options = this.options;
		var scroll = window.pageYOffset;
		var top = document.querySelector(hash).getBoundingClientRect().top;
		var start = null;

		requestAnimationFrame(step);

		function step(time) {
			var progress;
			var run;
			var speed = options.speed || 1;

			if (start === null) start = time;

			progress = time - start;
			run = (top < 0 ? Math.max(scroll - progress/speed, scroll + top) : Math.min(scroll + progress/speed, scroll + top));

			window.scrollTo(0, run);

			if (run != scroll + top) requestAnimationFrame(step);
			else {
				location.hash = hash;
			}
		}
	}
}
