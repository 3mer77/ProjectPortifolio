class RocketLine {
    constructor() {
        this.canvas = document.querySelector('.rocket-line canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 100;
        this.mousePos = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.updateMousePosition(e));
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    updateMousePosition(e) {
        this.mousePos = {
            x: e.clientX,
            y: e.clientY
        };
    }

    createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 5 + 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            opacity: 1,
            color: '#2563eb' // Rocket flame-like color (red-orange)
        };
        this.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity -= 0.02; // Gradual fade
            p.size -= 0.05; // Shrink over time
            if (p.opacity <= 0 || p.size <= 0) {
                this.particles.splice(i, 1); // Remove expired particles
            }
        }
    }

    drawParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1; // Reset global alpha
    }

    update() {
        this.createParticle(this.mousePos.x, this.mousePos.y); // Create a particle at mouse position
        this.updateParticles();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
        this.drawParticles(); // Draw all particles
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rocketLine = new RocketLine();
});