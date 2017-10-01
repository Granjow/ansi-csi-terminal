ES6 library for controlling/animating a terminal with ANSI CSI escape codes.

# ansi-csi-terminal

[ANSI CSI](https://en.wikipedia.org/wiki/ANSI_escape_code) defines escape codes for manipulating terminal screens
by moving around, setting colours, erasing lines/screens etc. which are supported on most terminals.

For a demo, run

    npm run test

Example: Write text, go back and overwrite “rainy“ with a yellow “sunny”.

```javascript
const csi = require( 'csi' );

csi.w( 'It is rainy' )
    .left( 5 )
    .format( csi.color.fg.yellow, csi.color.bg.black )
    .w( 'sunny' );
```

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
* `downHome(n)` – Move cursor `n` lines down and go to beginning of the line
* `upHome(n)` – Dito, but `n` lines up
* `xy(r,c)` – Go to row `r` and column `c` (counting starts at 1)
* `clearScreen()` – Clear content of entire screen
* `clearToEos()` – Clear from cursor to end of screen
* `clearToBos()` – Clear from cursor to beginning of screen
* `clearScreenWithBuffer()` – Clear screen and buffer
* `clearLine()` – Clear entire line (cursor position remains unchanged)
* `clearToEnd()` – Clear from cursor to end of the line (cursor position remains unchanged)
* `clearToHome()` – Dito, but clear to beginning of line 
* `scrollUp(n)` – Scroll `n` lines up (i.e. text moves up, cursor position stays)
* `scrollDown(n)` – Dito, but `n` lines down
* `saveCursorPos()` – Save current cursor position
* `restoreCursorPos()` – Return to previously saved cursor position
* `hideCursor()` – Hide cursor
* `showCursor()` – Show cursor
* `format(f1, f2, ...)` – Set formattings
* `reset()` – Reset terminal (like when entering `reset`), clears formatting and buffer and stuff. Good for un-breaking broken terminals.
* `color` – See below
* `height` – Get terminal height
* `width` – Get terminal width

### Colors

Color definitions can be passed to `csi.format(...args)`.

#### 4-bit Colors

The following 4-bit colors are available: `black` `red` `green` `yellow` `blue` `magenta` `cyan` `white`

They can be made bright (on some terminals) and they can be used as background or foreground color. 

Example:

    csi.format( csi.color.bg.red.bright )

#### RGB Colors

Less widespread. But fun.

    csi.color.rgb( 232, 211, 23 ); // Gives a nice orange