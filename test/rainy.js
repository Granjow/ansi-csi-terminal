const csi = require( '../lib/csi' );

csi.w( 'It is rainy' )
    .left( 5 )
    .format( csi.color.yellow.bg, csi.color.black )
    .w( 'sunny' );