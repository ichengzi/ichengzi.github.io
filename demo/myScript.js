const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(50, 50, 50, 0, 1.5 * Math.PI);
ctx.closePath()
ctx.lineWidth = 1;
ctx.fillStyle = "#42b983";
ctx.fill();

// move context to position (100, 100)
ctx.moveTo(100, 100);

// draw a line from current position of context to (500, 500)
ctx.lineTo(500, 500);

// all above was not executed util calling stroke or fill method
ctx.stroke();