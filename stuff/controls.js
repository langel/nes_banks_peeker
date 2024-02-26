
let theme;

let options = document.getElementById('options');

// if uninitialized setup default control settings
if (localget('nbp_init') == undefined) {
	localset('nbp_init', true);
	localset('nbp_theme', 'cool');
}

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
options.appendChild(theme_select);

theme = themes[theme];

console.log(theme);

