ES6 library for controlling/animating a terminal with ANSI CSI escape codes.

# ansi-csi-terminal

[ANSI CSI](https://en.wikipedia.org/wiki/ANSI_escape_code) defines escape codes for manipulating terminal screens
by moving around, setting colours, erasing lines/screens etc. which are supported on most terminals.

This library also contains some [VT220](https://vt100.net/docs/vt220-rm/chapter4.html) commands.

For a demo, including a half rainbow, run `test/index.js` in this repository:

    npm run test

Example: Write text, go back and overwrite “rainy“ with a yellow “sunny”.

```javascript
const csi = require( 'ansi-csi-terminal' );

csi.w( 'It is rainy' )
    .left( 5 )
    .format( csi.color.yellow.bg, csi.color.black )
    .w( 'sunny' );
```

CSI sequences can be run manually in terminals e.g. with `echo -e`. The following line prints text
with green background colour:

    echo -e "\033[42mHello"

## Other libraries

Please also check some other libraries with CSI support to see if they better fit your needs:

* [ansi-escape-sequences](https://www.npmjs.com/package/ansi-escape-sequences) is widespread and nicely documented
* [node-csi](https://www.npmjs.com/package/node-csi) provides more features and lots of formatting options
* [node-ansi](https://www.npmjs.com/package/node-ansi) is very small and simple to use 

## API


* `w(text)` – Write text
* `up(n)` – Move cursor up
* `down(n)` – Move cursor down
* `right(n)` – Move cursor right
* `left(n)` – Move cursor left
* `lineDown(n)` – Move cursor `n` lines down and go to beginning of the line
* `lineUp(n)` – Dito, but `n` lines up
* `x(r)` – Go to row `r` (counting starts at 1)
* `xy(r,c)` – Go to row `r` and column `c` (counting starts at 1)
* `clearToEos()` – Clear from cursor to end of screen
* `clearToBos()` – Clear from cursor to beginning of screen
* `clearScreen()` – Clear content of entire screen
* `clearScreenWithBuffer()` – Clear screen and buffer
* `clearToEnd()` – Clear from cursor to end of the line (cursor position remains unchanged)
* `clearToHome()` – Dito, but clear to beginning of line 
* `clearLine()` – Clear entire line (cursor position remains unchanged)
* `scrollUp(n)` – Scroll `n` lines up (i.e. text moves up, cursor position stays)
* `scrollDown(n)` – Dito, but `n` lines down
* `saveCursorPos()` – Save current cursor position
* `restoreCursorPos()` – Return to previously saved cursor position
* `showCursor(show)` – Show cursor if `show` is `true` (DECTCEM)
* `hideCursor()` – Hide cursor (DECTCEM)
* `invertScreen(b)` – Invert screen colours if `b` is `true` (DECSCNM)
* `format(f1, f2, ...)` – Set formattings
* `reset()` – Reset terminal (like when entering `reset`), clears formatting and buffer and stuff. Good for un-breaking broken terminals. (RIS)
* `color` – See below
* `height` – Get terminal height
* `width` – Get terminal width

### Colors

Color definitions can be passed to `csi.format(...args)`.

#### 4-bit Colors

The following 4-bit colors are available: `black` `red` `green` `yellow` `blue` `magenta` `cyan` `white`

They can be made bright with `.bright` (on some terminals) and they can be converted to a background color with `.bg`: 

Example:

    csi.format( csi.color.red )             # Red font color
    csi.format( csi.color.red.bg )          # Red background color
    csi.format( csi.color.red.bg.bright )   # Bright red background color

#### RGB Colors

Less widespread. But fun.

    csi.color.rgb( 232, 211, 23 );      // Gives a nice orange
    csi.color.rgb( 232, 211, 23 ).bg;   // Same, as background
