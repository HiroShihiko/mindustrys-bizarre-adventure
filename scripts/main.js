require("mindustrys-bizarre-adventure/turrets/arccaster");

const initialize = function(){
	Core.assets.load(
		"sounds/menu.ogg",
		Packages.arc.audio.Music
	).loaded = cons(a => Musics.menu = a);
}
initialize();
