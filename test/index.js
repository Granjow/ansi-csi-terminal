const csi = require( '../lib/csi' );

const functions = [
    () => csi.w( 'cSI test' ),
    () => csi.down().w( 'Next line' ),
    () => csi.up().w( 'Up again' ),
    () => csi.lineDown( 2 ).w( 'Line 3 at home. ' ),
    () => csi.w( '2 +' ).right( 1 ).w( '2 =' ).right( 1 ).w( '22' ),
    () => csi.left( 2 ).w( '4' ).right( 1 ),
    () => csi.lineUp( 2 ).w( 'C' ).x( 'CSI test'.length + 1 ).w( '!' ).lineDown( 3 ),
    () => csi.saveCursorPos().w( '12345' ).lineDown().w( '-----' ),
    () => csi.restoreCursorPos().w( 'Hello' ),
    () => csi.scrollUp( 2 ).w( 'Scrolled up.' ),
    () => csi.scrollDown( 1 ).w( 'Scrolled down.' ),
    () => csi.lineDown( 2 ).w( new Array( csi.width() ).fill( '-' ).join( '' ) ).lineDown( 1 ),
    () => csi.format( csi.color.cyan.bg, csi.color.black ).w( 'black-on-cyan' ),
    () => csi.format( csi.color.cyan.bg.bright, csi.color.black.bright ).w( 'bright' ),
    () => csi.format( csi.color.green.bg, csi.color.blue ).w( 'blue-on-green' ),
    () => csi.format( csi.color.green.bg.bright, csi.color.blue.bright ).w( 'bright' ),
    () => csi.format( csi.color.default ).w( 'default' ),
    () => csi.format( csi.color.rgb( 213, 211, 32 ).bg, csi.color.rgb( 213, 82, 150 ) ).w( 'rgb pink on yellow' ),
    () => csi.down( 1 ).format( csi.color.white, csi.color.rgb( 213, 82, 77 ).bg ).w( 'Nothing relevant on this line' ).left( ' on this line'.length ),
    () => csi.clearToHome(),
    () => csi.w( 'see' ),
    () => csi.clearToEnd(),
    () => csi.w( ' this text go away' ),
    () => csi.clearLine(),
    () => {
        const W = csi.width();
        csi.lineDown();
        new Array( csi.width() ).fill( 0 ).forEach( ( el, ix ) => {
            csi.format( csi.color.rgb( Math.floor( ix / W * 255 ), Math.floor( ix / W * 128 ), 128 - Math.floor( ix / W * 128 ) ).bg ).w( ' ' );
        } );
    }
];

let ix = 0;
let interval;
let nextFunc = () => {
    if ( ix < functions.length ) {
        functions[ ix++ ]();
    } else {
        clearInterval( interval );
    }
};

if ( false ) {
    csi.getPos().then( pos => {
        console.log( 'Position received.', pos );
    } );
}

interval = setInterval( nextFunc, 5 );