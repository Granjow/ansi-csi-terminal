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
    () => csi.format( csi.color.fg.cyan, csi.color.bg.black ).w( 'cyan' ),
    () => csi.format( csi.color.fg.cyan.bright, csi.color.bg.black.bright ).w( 'bright' ),
    () => csi.format( csi.color.fg.green, csi.color.bg.blue ).w( 'blue' ),
    () => csi.format( csi.color.fg.green.bright, csi.color.bg.blue.bright ).w( 'bright' ),
    () => csi.format( csi.color.default ).w( 'default' ),
    () => csi.format( csi.color.fg.rgb( 232, 211, 32 ), csi.color.bg.rgb( 232, 32, 232 ) ).w( 'rgb' ),
    () => csi.down( 1 ).w( 'Nothing relevant on this line' ).left( ' on this line'.length ),
    () => csi.clearToHome(),
    () => csi.w( 'see' ),
    () => csi.clearToEnd(),
    () => csi.w( ' this text go away' ),
    () => csi.clearLine(),
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

interval = setInterval( nextFunc, 500 );