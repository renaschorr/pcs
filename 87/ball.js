class Ball {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move(canvas) {
        this.x += this.dx;
        this.y += this.dy;

       
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const balls = [];

function addBall(color, radius) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;

    const ball = new Ball(x, y, radius, dx, dy, color);
    balls.push(ball);
}

function drawBalls() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ball.draw(context);
        ball.move(canvas);
    });
    requestAnimationFrame(drawBalls);
}


document.getElementById('addBallBtn').addEventListener('click', () => {
    const color = document.getElementById('colorInput').value;
    const radius = parseInt(document.getElementById('radiusInput').value, 10);
    addBall(color, radius);
});

drawBalls();
