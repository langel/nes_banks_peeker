

let frame_next = () => { return new Promise(resolve => requestAnimationFrame(resolve)); }
let tohex = (x) => x.toString(16).padStart(2, '0'); 

const theme = themes.plumstard;
const br = "<br>";
let output;

const process = async (file, data) => {
	let div;
	// display file info
	div = document.createElement('div');
	div.innerHTML = file.name + ' ' + file.size + ' bytes';
	output.appendChild(div);
	// read header info
	console.log(data);
	let header_info = '';
	for (let i = 0; i < 16; i++) header_info += tohex(data[i]) + ' ';
	if (data[0] == 0x4e && data[1] == 0x45 && data[2] == 0x53 && data[3] == 0x1a) {
		let mapper = (data[6] >> 4) + (data[7] & 0x0f);
		header_info += 'Mapper ' + mapper;
		header_info += ' ' + (data[4] * 16) + 'KB PRG ';
		header_info += ' ' + (data[5] * 8) + 'KB CHR ';
		output.innerHTML += header_info;
	}
	else return output.innerHTML += 'ROM FAIL';
	output.appendChild(document.createElement('br'));
	// draw some prg banks
	for (let i = 0; i < data[4]; i++) {
		let can = document.createElement("canvas");
		can.width = 64;
		can.height = 256;
		let con = can.getContext("2d", { willReadFrequently: true });
		let offset = 16 + i * 16384;
		for (let j = 0; j < 16384; j++) {
			con.fillStyle = theme[data[offset + j]];
			con.fillRect(j % 64, j >> 6, 1, 1);
		}
		output.appendChild(can);
		await frame_next();
	}
}
