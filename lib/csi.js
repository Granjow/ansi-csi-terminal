const CSI = '\033[';


const raw = ( text ) => {
    process.stdout.write( CSI + text );
    return csi;
};

/**
 * DOES NOT WORK
 * Cannot read the position report from stdin.
 */
const getPos = () => new Promise( ( resolve, reject ) => {
    const stdin = process.stdin;
    //stdin.setRawMode( true );
    //stdin.setEncoding( 'utf8' );
    let received = '';
    let handler = ( key ) => {
        // ctrl-c ( end of text )
        if ( key === '\u0003' ) {
            process.exit( 1 );
        }
        if ( key === 'R' ) {
            console.error( 'Received: ', received );
            stdin.removeListener( 'data', handler );

            let match = /([0-9]+);([0-9]+)/.exec( received );
            if ( match ) {
                resolve( [ match[ 1 ], match[ 2 ] ] );
            } else {
                reject( 'No match found' );
            }
        } else {
            received += key;
            console.log( `Received so far: >>${received}<<` );
        }
    };
    stdin.on( 'data', handler );
    stdin.resume();
    raw( '6n' );
} );

class Bit4Background {
    constructor( id ) {
        /** @type {number} */
        this._id = id;
        this._bright = false;
    }

    get bright() {
        this._bright = true;
        return this;
    }

    toString() {
        return (this._id + this._bright * 60).toString( 10 );
    }
}

class Bit4Foreground {
    constructor( id ) {
        /** @type {number} */
        this._id = id;
        this._bright = false;
    }

    get bright() {
        this._bright = true;
        return this;
    }

    toString() {
        return this._id.toString( 10 ) + (this._bright ? ';1' : '');
    }
}

const color = {
    default: '39;49',
    bg: {
        rgb: ( r, g, b ) => `48;2;${r};${g};${b}`,
        black: new Bit4Background( 30 ),
        red: new Bit4Background( 31 ),
        green: new Bit4Background( 32 ),
        yellow: new Bit4Background( 33 ),
        blue: new Bit4Background( 34 ),
        magenta: new Bit4Background( 35 ),
        cyan: new Bit4Background( 36 ),
        white: new Bit4Background( 37 ),
    },
    fg: {
        rgb: ( r, g, b ) => `38;2;${r};${g};${b}`,
        black: new Bit4Foreground( 40 ),
        red: new Bit4Foreground( 41 ),
        green: new Bit4Foreground( 42 ),
        yellow: new Bit4Foreground( 43 ),
        blue: new Bit4Foreground( 44 ),
        magenta: new Bit4Foreground( 45 ),
        cyan: new Bit4Foreground( 46 ),
        white: new Bit4Foreground( 47 ),
    }
};

const csi = {
    w: ( text ) => {
        process.stdout.write( text );
        return csi;
    },
    up: ( n ) => raw( (n || '1') + 'A' ),
    down: ( n ) => raw( (n || '1') + 'B' ),
    right: ( n ) => raw( (n || '1') + 'C' ),
    left: ( n ) => raw( (n || '1') + 'D' ),
    downHome: ( n ) => raw( (n || '1') + 'E' ),
    upHome: ( n ) => raw( (n || '1') + 'F' ),
    x: ( n ) => raw( (n || '1') + 'G' ),
    xy: ( x, y ) => raw( `${(x || '1')};${y || '1'}H` ),
    clearToEos: () => raw( '0J' ),
    clearToBos: () => raw( '1J' ),
    clearScreen: () => raw( '2J' ),
    clearScreenWithBuffer: () => raw( '3J' ),
    clearToEnd: () => raw( '0K' ),
    clearToHome: () => raw( '1K' ),
    clearLine: () => raw( '2K' ),
    scrollUp: ( n ) => raw( `${n || '1'}S` ),
    scrollDown: ( n ) => raw( `${n || '1'}T` ),
    saveCursorPos: () => raw( 's' ),
    restoreCursorPos: () => raw( 'u' ),

    hideCursor: () => raw( '?25l' ),
    showCursor: () => raw( '?25h' ),

    format: ( ...args ) => raw( `${(args && args.join( ';' )) || '0'}m` ),
    color: color,

    pos: getPos,
    height: () => process.stdout.rows,
    width: () => process.stdout.columns,

    /** Like the reset command; resets all settings, font, etc. */
    reset: () => process.stdout.write( '\033c' ),
};

module.exports = csi;
