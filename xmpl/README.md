# Scenarist Examples

?# cat - > hl.mjs

//+==

import Scenarist from 'cnr.ist';

const hello = new Scenarist ( {

greeting: 'Hello',
name: 'World',
$_greet: ( $, ... name ) => `${ $ ( 'greeting' ) } ${ name .join ( ' ' ) || $ ( 'name' ) }!`

} );

console .log ( hello .$ ( 'greet', ... process .argv .slice ( 2 ) ) );

//-==

?# cat - > mth.mjs

//+==

import Scenarist from 'cnr.ist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const { $ } = new Scenarist ( [] );

createInterface ( { input, output, prompt: ': ' } )
.on ( 'line', function calculate ( argv ) {

try {

console .log ( $ ( ... argv .trim () .split ( /\s+/ ) ) );

} catch ( error ) {

console .error ( error ?.message || error );

} finally {

this .prompt ();

}

} ) .prompt ();

//-==

?# $ =0 node mth.mjs
