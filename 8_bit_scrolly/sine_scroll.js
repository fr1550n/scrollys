const text            = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. old school sine scroller another cool javascript tutorial';
const fontWidth       = 54;
const fontHeight      = 71;
const letters 	      = parseInt(window.innerWidth / fontWidth);
const letterEntryXpos = (letters - 1) * fontWidth;
const xScrollSpeed    = 5;

const debug = true;

let x        = [];
let char     = [];
let wiggle   = 0;
let counter  = 0;
let position = letters;
let bitmap   = new Image();
bitmap.src   = 'font.png';
let canvas   = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
let context  = canvas.getContext('2d');

function log(s) {
    if (debug) {
        console.log(s);		    
    }
}

log(`initialising the x${letters} slots: `);
for (let n = 0; n < letters; n++) {
    char[n] = text.charCodeAt(n) - 97;
    x[n] = n * fontWidth;
    log(`slot: ${n} will hold alphabetic character at index: ${text.charCodeAt(n)-97} which is: ${String.fromCharCode(char[n]+97)}`);
}
window.requestAnimationFrame(scroll);


function scroll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let n = 0; n < letters; n++) {
        log(`${new Date().toLocaleString('en-GB', { timeZone: 'UTC' })}: n=${n} position for character: ${String.fromCharCode(char[n]+97)} = ${x[n]}`);	  	  
	let y = 100 + wiggle * Math.sin(n + counter / 6.28);
        context.drawImage(bitmap, char[n] * fontWidth, 0, fontWidth, fontHeight, x[n], y, fontWidth, fontHeight);
         x[n]-=xScrollSpeed;
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
