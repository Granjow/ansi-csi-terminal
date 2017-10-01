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

class Bit4Color {
    constructor( id ) {
        /** @type {number} */
        this._id = id;
        this._bright = false;
        this._bg = false;
    }

    get bright() {
        this._bright = true;
        return this;
    }

    get bg() {
        this._bg = true;
        return this;
    }

    get colorNumber() {
        return this._id + (this._bg ? 40 : 30);
    }

    toString() {
        return this.colorNumber.toString( 10 ) + (this._bright ? ';1' : '');
    }
}

class RgbColor {
    constructor( r, g, b ) {
        this.r = r;
        this.g = g;
        this.b = b;
        this._bg = false;
    }

    get bg() {
        this._bg = true;
        return this;
    }

    toString() {
        return `${this._bg ? '48;2' : '38;2'};${this.r};${this.g};${this.b}`
    }
}

const color = {
    default: '39;49',
    rgb: ( r, g, b ) => new RgbColor( r, g, b ),
    black: new Bit4Color( 0 ),
    red: new Bit4Color( 1 ),
    green: new Bit4Color( 2 ),
    yellow: new Bit4Color( 3 ),
    blue: new Bit4Color( 4 ),
    magenta: new Bit4Color( 5 ),
    cyan: new Bit4Color( 6 ),
    white: new Bit4Color( 7 ),
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
    lineDown: ( n ) => raw( (n || '1') + 'E' ),
    lineUp: ( n ) => raw( (n || '1') + 'F' ),
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
