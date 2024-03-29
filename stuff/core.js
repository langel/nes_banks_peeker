let file, data, output;

window.addEventListener("DOMContentLoaded", () => {
	const droptarg = document;
	const cont = document.body;
	const domp = new DOMParser();
	output = document.getElementById("output");
	// drop handler
	droptarg.addEventListener("drop", (e) => {
		e.preventDefault();
		cont.classList.remove("dragover");
		output.innerHTML = '';
		[...e.dataTransfer.items].forEach((item, i) => {
			if (item.kind === 'file') {
				file = item.getAsFile();
				const r = new FileReader();
				r.readAsArrayBuffer(file);
				r.onload = () => {
					data = new Uint8Array(r.result);
					processor_engine_go();
				};
			}
		});
	});
	// drag hover
	droptarg.addEventListener("dragover", (e) => {
		e.preventDefault();
		cont.classList.add("dragover");
	});
	// drag end
	droptarg.addEventListener("dragleave", (e) => {
		e.preventDefault();
		cont.classList.remove("dragover");
	});
	console.log('core intiialized');
});
