
let theme, scale, prg_byte_width, prg_as_chr, prg_x2_chr;

let options = document.getElementById('options');
let themes_con = document.getElementById('themes');

// if uninitialized setup default control settings
if (localget('nbp_init') == undefined) {
	localset('nbp_init', true);
	localset('nbp_theme', 'sepia');
	localset('nbp_scale', 2);
	localset('nbp_prg_byte_width', 64);
	localset('npb_prg_as_chr', false);
	localset('npb_prg_2x_chr', false);
}

// dynamic css
const style = element_new('style');
document.head.appendChild(style);
const css = style.sheet;

// theme
theme = localget('nbp_theme');
let theme_select = element_new('select');
for (const [key, value] of Object.entries(themes)) {
	let option = element_new('option');
	option.innerHTML = key;
	option.setAttribute('value', key);
	if (key == theme) option.setAttribute('selected', true);
	theme_select.appendChild(option);
};
theme_select.onchange = () => {
	localset('nbp_theme', theme_select.value);
	theme = themes[localget('nbp_theme')];
	processor_engine_go();
}
themes_con.appendChild(theme_select);
theme = themes[theme];

// scale
scale = localget('nbp_scale');
let scale_select = element_new('select');
for (let i = 1; i < 5; i++) {
	let option = element_new('option');
	option.innerHTML = 'x' + i;
	option.setAttribute('value', i);
	if (i == scale) option.setAttribute('selected', true);
	scale_select.appendChild(option);
}
scale_select.onchange = () => {
	scale = Number(scale_select.value);
	localset('nbp_scale', scale);
	processor_engine_go();
}
div = document.getElementById('moption_scale');
div.appendChild(scale_select);
localset('nbp_scale', scale);

// prg byte width
prg_byte_width = localget('nbp_prg_byte_width');
const prg_byte_width_set = () => {
	localset('nbp_prg_byte_width', prg_byte_width);
}
let prg_byte_width_select = element_new('select');
const prg_byte_width_options = [ 32, 64, 128, 256 ];
prg_byte_width_options.forEach((val) => {
	let option = element_new('option');
	option.innerHTML = val;
	option.setAttribute('value', val);
	if (val == prg_byte_width) option.setAttribute('selected', true);
	prg_byte_width_select.appendChild(option);
});
prg_byte_width_select.onchange = () => {
	prg_byte_width = Number(prg_byte_width_select.value);
	localset('nbp_prg_byte_width', prg_byte_width);
	processor_engine_go();
}
div = document.getElementById('moption_prg_byte_width');
div.appendChild(prg_byte_width_select);

// display prg as chr
prg_as_chr = (localget('npb_prg_as_chr') == 'true') ? true : false;
let prg_as_chr_box = document.getElementById('prg_as_chr');
if (prg_as_chr == true) prg_as_chr_box.checked = true;
prg_as_chr_box.onchange = () => {
	prg_as_chr = !prg_as_chr;
	prg_as_chr_box.checked = prg_as_chr;
	localset('npb_prg_as_chr', prg_as_chr);
	processor_engine_go();
}

// display prg 2x chr
prg_2x_chr = (localget('npb_prg_2x_chr') == 'true') ? true : false;
let prg_2x_chr_box = document.getElementById('prg_2x_chr');
if (prg_2x_chr == true) prg_2x_chr_box.checked = true;
prg_2x_chr_box.onchange = () => {
	prg_2x_chr = !prg_2x_chr;
	prg_2x_chr_box.checked = prg_2x_chr;
	localset('npb_prg_2x_chr', prg_2x_chr);
	processor_engine_go();
}
