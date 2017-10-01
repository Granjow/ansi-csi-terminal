const csi = require( '../lib/csi' );

csi.w( 'It is rainy' )
    .left( 5 )
    .format( csi.color.fg.yellow, csi.color.bg.black )
    .w( 'sunny' );