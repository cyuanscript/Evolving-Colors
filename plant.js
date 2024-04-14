class Plant {
    constructor(other, automata) {
        this.automata = automata;
        this.hue = other.hue;
        this.x = other.x;
        this.y = other.y;
        this.growth = 0;
    }

    normalize(value, max) {
        return (value + max) % max;
    }

    mutate() {
        const newX = this.normalize(this.x - 1 + randomInt(3), PARAMS.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), PARAMS.dimension);
        const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
        return {hue: hue, x: newX, y: newY};
    }

    update() {
        const childAmount = parseInt(document.getElementById("plantchildren").value);

        if (this.growth < 80) {
            this.growth += 1;
        } else if (this.growth >= 80) {
            for (let i = 0; i < childAmount; i++) {
                const other = this.mutate();

                if (!this.automata.world[other.x][other.y]) {
                    this.automata.world[other.x][other.y] = new Plant (other, this.automata)
                    this.growth -= 80;
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = hsl(this.hue, 20 + this.growth, 50);
        ctx.strokeStyle = "white";
        ctx.fillRect(this.x * PARAMS.size, this.y * PARAMS.size, PARAMS.size, PARAMS.size);
        ctx.strokeRect(this.x * PARAMS.size, this.y * PARAMS.size, PARAMS.size, PARAMS.size);
    }
}