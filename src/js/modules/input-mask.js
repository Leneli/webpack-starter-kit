import Cleave from "cleave.js";
import Format from "cleave.js/dist/addons/cleave-phone.us.js";

export default function() {
	var selectors = ".__mask-input-phone";
	var count = document.querySelectorAll(selectors).length;
	var phone = count > 0 ? new Cleave(selectors, {
		phone: true,
		delimiter: ".",
		phoneRegionCode: "US"
	}) : null;
}
