class Animat {
	constructor(other, automata) {
		this.automata = automata;
		this.hue = other.hue;
		this.x = other.x;
		this.y = other.y;
        this.baseEnergy = parseInt(document.getElementById("animatenergy").value);
		this.energy = this.baseEnergy;
	}	

	normalize(value, max) { 
		// return value >= max ? max-1 : value < 0 ? 0 : value; // no wrap
		return (value + max) % max; // wrap
	}

	move() {
		let x = this.x;
		let y = this.y;

		let best = Infinity;

		const empty = [];
		for(var i = -1; i <= 1; i++) { // find cell to move to
			const newX = this.normalize(this.x + i, PARAMS.dimension);
			for(var j = -1; j <= 1; j++) {
				const newY = this.normalize(this.y + j, PARAMS.dimension);
				const plant = this.automata.world[newX][newY];
				
				if (!plant) {
					empty.push({x:newX,y:newY});
				}

				const diff = Math.abs(this.hue - (plant ? plant.hue : Infinity));
				
				if (diff < best) {
					best = diff;
					x = newX;
					y = newY;
				}
			}
		}

		this.x = x;
		this.y = y;
	}

	hueDifference (plant) {
		let diff = plant ? Math.abs(this.hue - plant.hue) : 180;
		if (diff > 180) diff = 360 - diff;
		return (90 - diff) / 90;
	}

	eat() {
		const plant = this.automata.world[this.x][this.y];
		const diff = this.hueDifference(plant);
	
		if(plant && diff >= 0) {
			this.automata.world[this.x][this.y] = null;
			this.energy += 80 / 20 * diff;
		}
	}

	reproduce() {
		if(this.energy > 80) {
            const childAmount = parseInt(document.getElementById("animatchildren").value);
			this.energy -= 80;
            for (let i = 0; i < childAmount; i++) {
                gameEngine.addEntity(new Animat(this.mutate(),this.automata));
            }
		}
	}

	mutate() {
		const newX = this.normalize(this.x - 1 + randomInt(3), PARAMS.dimension);
		const newY = this.normalize(this.y - 1 + randomInt(3), PARAMS.dimension);
		const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
		return{hue: hue, x: newX, y: newY};
	}

	update() {
		this.move();
		this.eat();
		this.reproduce();
		if(this.energy < 1 || randomInt(100) == 99) this.removeFromWorld = true;
	}

	draw(ctx) {
		ctx.fillStyle = hsl(this.hue,75,50);
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.arc((this.x + 0.5) * PARAMS.size, (this.y + 0.5) * PARAMS.size,
        PARAMS.size / 2 - 1, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
};