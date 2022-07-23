const text = 'old school sine scroller    another cool javascript tutorial';
const fontWidth = 54;
const fontHeight = 71;
const letters = 12;
const letterEntryXpos = (letters - 1) * fontWidth;

let x = [];
let char = [];
let wiggle = 0;
let counter = 0;
let position = letters;
let bitmap = new Image();
bitmap.src = 'font.png';
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');

for (let n = 0; n < letters; n++) {
    char[n] = text.charCodeAt(n) - 97;
    x[n] = n * fontWidth;
    console.log(`n=${n} alphabet character at index: ${text.charCodeAt(n)-97} ${String.fromCharCode(char[n]+97)}`);
}
window.requestAnimationFrame(scroll);


function scroll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let n = 0; n < letters; n++) {
        console.log(`${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}: n=${n} position for character: ${String.fromCharCode(char[n]+97)} = ${x[n]}`);	  	  
	let y = 100; //+ wiggle * Math.sin(n + counter / 6.28);
        context.drawImage(bitmap, char[n] * fontWidth, 0, fontWidth, fontHeight, x[n], y, fontWidth, fontHeight);
         x[n]--;
         if (x[n] < -fontWidth) {
             x[n] = letterEntryXpos;
             char[n] = text.charCodeAt(position) - 97;
             position++;
             if (position > text.length) position = 0;
         }
    }
    if (counter > 200 && wiggle < 30) wiggle = wiggle + .1;
    counter++;
    window.requestAnimationFrame(scroll);
}                                                                   
