

let element_new = (t) => document.createElement(t);
let frame_next = () => { return new Promise(resolve => requestAnimationFrame(resolve)); }
let localget = (key) => localStorage.getItem(key);
let localset = (key, val) => localStorage.setItem(key, val);
let tobottom = () => window.scrollTo(0, document.body.scrollHeight);
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
