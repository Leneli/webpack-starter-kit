export default function() {
	var isMobile = {
		Android() {
			return navigator.userAgent.match(/Android/i);
		},
		
		BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		
		iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		
		Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		
		Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		
		any() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	return {
		touch() {
			return isMobile.any();
		},
		
		android() {
			return isMobile.Android();
		},
		
		windows() {
			return isMobile.Windows();
		},
		
		ios() {
			return isMobile.iOS();
		},
		
		bb() {
			return isMobile.BlackBerry();
		},
		
		opera() {
			return isMobile.Opera();
		}
	}
}
