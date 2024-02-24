
let element_new = (t) => document.createElement(t);
let frame_next = () => { return new Promise(resolve => requestAnimationFrame(resolve)); }
let tohex = (x) => x.toString(16).padStart(2, '0'); 

mapnick = [ 'NROM', 'MMC1', 'UNROM', 'CNROM', 'MMC3', 'MMC5', 'Super Magic Card', 'AxROM', 
            'Super Magic Card', 'MMC2', 'MMC4', 'Color Dreams', 'Gouder', 'CPROM', 'Gouder', 
				'K-1029/K-1030P', 'Bandai FCG', 'Super Magic Card', 'Jaleco SS 88006', 
				'Namco 129/163', 'FDS', 'VRC2/VRC4', 'VRC2/VRC4', 'VRC2/VRC4', 'VRC6', 'VRC2/VRC4', 
				'VRC6', 'Pir8 VRC4', 'Action 53', 'CUFROM', 'UNROM 512', 'NSF Comp' ];
mapprg = [      16,     16,     16,       32,      8,      8,         8,              32,  
                   8,             8,       16,    32,              8,          32,     8, 
                16, 16, 8, 8, 8, 16, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 4 ];
mapchr = [      8,      8,      8,       8,      1,      1,            1,            8,               
                1,                4,       4,           8,          8,        4,      1,  
                8,  1, 8, 1, 1,  8, 1, 1, 1, 1, 1, 1, 1,  8,  8,  8, 8 ];

const theme = themes.mirage;
const br = "<br>";
let output;

const process = async (file, data) => {
	let div, box;
	// read header info
	let mapper_id, prg_size, chr_size;
	if (data[0] == 0x4e && data[1] == 0x45 && data[2] == 0x53 && data[3] == 0x1a) {
		mapper_id = (data[6] >> 4) + (data[7] & 0xf0);
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

	// draw some chr banks
	div = element_new('div');
	div.classList.add("flex");
	output.appendChild(div);
	for (let i = 0; i < chr_banks; i++) {
		let bank = element_new('div');
		bank.innerHTML = "<span class='monospace'>CHR $" + tohex(i) + "</span></br>";
		let can = document.createElement("canvas");
		can.width = 128;
		can.height = chr_bank_size >> 5;
		let con = can.getContext("2d", { willReadFrequently: true });
		let ptr = 16 + prg_banks * prg_bank_size + i * chr_bank_size
		let chr_count = chr_bank_size >> 4;
		// each character pattern
		for (let j = 0; j < chr_count; j++) {
			let x = (j % 16) << 3;
			let y = (j >> 4) << 3;
			let indirect = ptr + (j << 4);
			// each row
			for (let k = 0; k < 8; k++) {
				let lo = data[indirect + k];
				let hi = data[indirect + k + 8];
				// each pixel
				for (let l = 7; l >= 0; l--) {
					let val = (lo & (1 << l)) ? 1 : 0;
					val |= (hi & (1 << l)) ? 2 : 0;
					val <<= 6;
					con.fillStyle = theme[val];
					con.fillRect(x + 7 - l, y + k, 1, 1);
				}
			}
		}

		can.style.width = (can.width * 2) + 'px';
		can.style.height = (can.height * 2) + 'px';
		bank.appendChild(can);
		div.appendChild(bank);
		await frame_next();
	}

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
		let ptr = 16 + i * prg_bank_size;
		for (let j = 0; j < prg_bank_size; j++) {
			con.fillStyle = theme[data[ptr + j]];
			con.fillRect(j % 64, j >> 6, 1, 1);
		}

		can.style.width = (can.width * 2) + 'px';
		can.style.height = (can.height * 2) + 'px';
		bank.appendChild(can);
		div.appendChild(bank);
		await frame_next();
	}

}
