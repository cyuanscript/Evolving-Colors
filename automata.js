class Automata {
    constructor() {
        this.world = [];
        for (let i = 0; i < PARAMS.dimension; i++) {
            this.world.push([]);
            for (let j = 0; j < PARAMS.dimension; j++) {
                this.world[i].push(null);
            }
        }
    }

    addPlant() {
        const i = randomInt(PARAMS.dimension);
        const j = randomInt(PARAMS.dimension);
        this.world[i][j] = new Plant({hue: randomInt(360), x: i, y: j}, this)
    }

    clearPlants() {
        for (let i = 0; i < PARAMS.dimension; i++) {
            for (let j = 0; j < PARAMS.dimension; j++) {
                this.world[i][j] = null;
            }
        }
    }

    update() {
        for (let i = 0; i < PARAMS.dimension; i++) {
            for (let j = 0; j < PARAMS.dimension; j++) {
                if (this.world[i][j]) this.world[i][j].update()
                if (randomInt(100) == 99) this.world[i][j] = null;
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < PARAMS.dimension; i++) {
            for (let j = 0; j < PARAMS.dimension; j++) {
                if (this.world[i][j]) this.world[i][j].draw(ctx)
            }
        }
    }

}