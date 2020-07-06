const wamuuBull = extend(BasicBulletType, {
	draw(b){},
	init(b){
		if(typeof(b) !== "undefined"){
			this.super$init();
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), this.range());
			Effects.effect(this.laserEffect, b.x, b.y, b.rot(), this.range());
		}
	},
	range(){
		return 20 * Vars.tilesize;
	}
});
wamuuBull.keepVelocity = false;
wamuuBull.speed = 0.0001;
wamuuBull.hitEffect = Fx.hitLancer;
wamuuBull.despawnEffect = Fx.none;
wamuuBull.shootEffect = Fx.hitLancer;
wamuuBull.smokeEffect = Fx.none;
wamuuBull.collides = false;
wamuuBull.hitSize = 4;
wamuuBull.instantDisappear = true;
wamuuBull.pierce = true;
wamuuBull.hittable = false;
wamuuBull.damage = 50;
wamuuBull.laserEffect = newEffect(18, e => {
	Lines.stroke(e.fout() * 3.5);
	Lines.lineAngle(e.x, e.y, e.rotation, e.data);
	Lines.stroke(1);
});

const wamuuWeap = extendContent(Weapon, "wamuu-weapon", {
	load(){
		this.region = Core.atlas.find("mindustrys-bizarre-adventure-wamuu-weapon");
	}
});
wamuuWeap.reload = 30;
wamuuWeap.alternate = true;
wamuuWeap.width = 10;
wamuuWeap.shots = 1;
wamuuWeap.recoil = 5;
wamuuWeap.bullet = wamuuBull;
wamuuWeap.shootSound = Sounds.explosion;
wamuuWeap.minPlayerDist = 20;

const wamuu = extendContent(UnitType, "wamuu", {
	load(){
		this.weapon.load()
       	this.region = Core.atlas.find("mindustrys-bizarre-adventure-wamuu");
       	this.legRegion = Core.atlas.find("mindustrys-bizarre-adventure-wamuu-leg");
       	this.baseRegion = Core.atlas.find("mindustrys-bizarre-adventure-wamuu-base");
	}
}); 
wamuu.create(prov(() => {
	const base = extend(GroundUnit, {
		update(){
			this.super$update();
			if(!this.isDead() && this.timer.get(this.getHealTimer(), 60)){
				this.healBy(100);
			}
		},
		getHealTimer(){
			return this._healTimer;
		},
		setHealTimer(val){
			this._healTimer = val;
		}
	});
	base.setHealTimer(base.timerIndex++);
	return base;
}));
wamuu.weapon = wamuuWeap;