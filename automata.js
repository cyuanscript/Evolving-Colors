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

    update() {

    }

    draw(ctx) {
        for (let i = 0; i < PARAMS.dimension; i++) {
            for (let j = 0; j < PARAMS.dimension; j++) {
                if (this.world[i][j]) this.world[i][j].draw(ctx)
            }
        }
    }

}