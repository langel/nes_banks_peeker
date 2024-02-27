
const process_canvas_from_chr_bank = async (data, offset, size) => {
}
const process_canvas_from_prg_bank = async (data, offset, size) => {
}

const processor_engine_go = async () => {
	if (typeof file == 'undefined') return;

	let div, box;
	output.innerHTML = '';

	// read header info
	let mapper_id, prg_size, chr_size;
	if (data[0] == 0x4e && data[1] == 0x45 && data[2] == 0x53 && data[3] == 0x1a) {
		mapper_id = (data[6] >> 4) + (data[7] & 0xf0);
		prg_size = data[4] * 16;
		chr_size = data[5] * 8;
	}
	else return output.innerHTML += 'ROM FAIL :: ' + file.name;

	// get bank info
	let mapper_type = 'undefined';
	let prg_bank_kb_size = 16;
	let chr_bank_kb_size = 8;
	if (mapper_id < mapnick.length) {
		mapper_type = mapnick[mapper_id];
		prg_bank_kb_size = mapprg[mapper_id];
		chr_bank_kb_size = mapchr[mapper_id];
	}
	let prg_banks = prg_size / prg_bank_kb_size;
	let chr_banks = 0;
	if (chr_size > 0) chr_banks = chr_size / chr_bank_kb_size;
	prg_size *= 1024;
	chr_size *= 1024;
	let prg_bank_size = prg_bank_kb_size * 1024;
	let chr_bank_size = chr_bank_kb_size * 1024;

	// show rom stats in header
	div = document.getElementById('stats');
	div.innerHTML = '';
	box = element_new('div');
	box.innerHTML = file.name + '<br>' + ((file.size - 16) >> 10) + 'kb';
	div.appendChild(box);
	box = element_new('div');
	box.innerHTML = 'Mapper ' + mapper_id + '<br>' + mapper_type;
	div.appendChild(box);
	box = element_new('div');
	box.innerHTML = 'PRG ' + data[4] * 16 + 'kb<br>' + prg_bank_kb_size + 'kb &times; ' + prg_banks + ' banks';
	div.appendChild(box);
	box = element_new('div');
	box.innerHTML = 'CHR ' + data[5] * 8 + 'kb<br>' + chr_bank_kb_size + 'kb &times; ' + chr_banks + ' banks';
	div.appendChild(box);

	// draw some chr banks
	div = element_new('div');
	div.classList.add("flex");
	output.appendChild(div);
	let bitcolors = [ 0, 85, 170, 255 ]
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
					val = bitcolors[val];
					con.fillStyle = theme[val];
					con.fillRect(x + 7 - l, y + k, 1, 1);
				}
			}
		}

		can.style.width = (can.width * scale) + 'px';
		can.style.height = (can.height * scale) + 'px';
		bank.appendChild(can);
		div.appendChild(bank);
		await frame_next();
		tobottom();
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
		tobottom();
	}

}
