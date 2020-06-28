require("mindustrys-bizzare-adventure/turrets/arccaster");

const initialize = function(){
	Core.assets.load("music/mindustrys-bizzare-adventure/menu.ogg", Packages.arc.audio.Music).loaded = cons(a => Musics.menu = a);
}
initialize();
