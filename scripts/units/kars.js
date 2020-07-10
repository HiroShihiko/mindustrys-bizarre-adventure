const kars = extendContent(UnitType, "kars", {});
esidisi.create(prov(() => {
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