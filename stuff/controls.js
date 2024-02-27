
let theme, scale, prg_as_chr, prg_x2_chr;

let options = document.getElementById('options');
let themes_con = document.getElementById('themes');

// if uninitialized setup default control settings
if (localget('nbp_init') == undefined) {
	localset('nbp_init', true);
	localset('nbp_theme', 'cool');
	localset('nbp_scale', 2);
	localset('prg_as_chr', false);
	localset('prg_2x_chr', true);
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
const scale_set = () => {
	localset('nbp_scale', scale);
	css.insertRule('canvas { width: ' + scale + '00%; height ' + scale + '00%; }', 0);
}
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
	scale_set();
}
div = document.getElementById('moption_scale');
div.appendChild(scale_select);
scale_set();
