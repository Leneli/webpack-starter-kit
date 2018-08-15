export default function(isFix) {
	var html = document.querySelector("html");
	var main = document.querySelector("main.main");
	
	if (isFix === true) {
		html.style.overflow = "hidden";
		html.style.height   = "100%";
		
		if (main) main.style.filter = "blur(2px)";
	} else if (isFix === false) {
		html.style.overflow = "";
		html.style.height   = "";
		
		if (main) main.style.filter = "";
	}
}
