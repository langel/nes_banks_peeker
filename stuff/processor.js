
let element_new = (t) => document.createElement(t);
let frame_next = () => { return new Promise(resolve => requestAnimationFrame(resolve)); }
let tohex = (x) => x.toString(16).padStart(2, '0'); 

mapnick = [ 'NROM', 'MMC1', 'UNROM', 'CNROM', 'MMC3', 'Super Magic Card', 'AxROM', 'Super Magic Card', 'MMC2', 'MMC4', 'Color Dreams', 'Gouder', 'CPROM', 'Gouder', 'K-1029/K-1030P', 'Bandai FCG', 'Super Magic Card', 'Jaleco SS 88006', 'Namco 129/163', 'FDS', 'VRC2/VRC4', 'VRC2/VRC4', 'VRC2/VRC4', 'VRC6', 'VRC2/VRC4', 'VRC6', 'Pir8 VRC4', 'Action 53', 'CUFROM', 'UNROM 512', 'NSF Comp' ];
mapprg = [ 16, 16, 16, 32, 8, 8, 32, 8, 8, 16, 32, 8, 32, 8, 16, 16, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 4 ];
mapchr = [  8,  8,  8,  8, 1, 1,  8, 1, 4,  4,  8, 8,  4, 1,  8,  1, 8, 1, 1,  8, 1, 1, 1, 1, 1, 1, 1,  8,  8,  8, 8 ];

const theme = themes.plumstard;
const br = "<br>";
let output;

const process = async (file, data) => {
	let div, box;
	// read header info
	let mapper_id, prg_size, chr_size;
	if (data[0] == 0x4e && data[1] == 0x45 && data[2] == 0x53 && data[3] == 0x1a) {
		mapper_id = (data[6] >> 4) + (data[7] & 0x0f);
		prg_size = data[4] * 16;
		chr_size = data[5] * 8;
	}
	else return output.innerHTML += 'ROM FAIL :: ' + file.name;

	let mapper_type = 'undefined';
	let prg_bank_size = 16;
	let chr_bank_size = 8;
	if (mapper_id < mapnick.length) {
		mapper_type = mapnick[mapper_id];
		prg_bank_size = mapprg[mapper_id];
		chr_bank_size = mapchr[mapper_id];
	}
	let prg_banks = prg_size / prg_bank_size;
	let chr_banks = 0;
	if (chr_size > 0) chr_banks = chr_size / chr_bank_size;
	prg_size *= 1024;
	chr_size *= 1024;
	prg_bank_size *= 1024;
	chr_bank_size *= 1024;

	div = element_new('div');
	div.classList.add('flex');
	box = element_new('div');
	box.innerHTML = file.name;
	div.appendChild(box);
	box = element_new('div');
	box.innerHTML = 'Mapper ' + mapper_id;
	div.appendChild(box);
	box = element_new('div');
	box.innerHTML = mapper_type;
	div.appendChild(box);
	output.appendChild(div);
	box = element_new('div');
	box.innerHTML = data[4] * 16 + 'kb PRG';
	div.appendChild(box);
	output.appendChild(div);
	box = element_new('div');
	box.innerHTML = data[5] * 8 + 'kb CHR';
	div.appendChild(box);
	output.appendChild(div);

	// draw some prg banks
	div = element_new('div');
	div.classList.add("flex");
	output.appendChild(div);
	for (let i = 0; i < prg_banks; i++) {
		let bank = element_new('div');
		bank.innerHTML = "<span class='monospace'>PRG $" + tohex(i) + "</span></br>";
		let can = document.createElement("canvas");
		can.width = 64;
		can.height = prg_bank_size >> 6;
		let con = can.getContext("2d", { willReadFrequently: true });
		let offset = 16 + i * prg_bank_size;
		for (let j = 0; j < prg_bank_size; j++) {
			con.fillStyle = theme[data[offset + j]];
			con.fillRect(j % 64, j >> 6, 1, 1);
		}
		bank.appendChild(can);
		div.appendChild(bank);
		/*
		var scaleFactor = 2;
		can.width *= scaleFactor;
		can.height *= scaleFactor;
		*/
		await frame_next();
	}
}
