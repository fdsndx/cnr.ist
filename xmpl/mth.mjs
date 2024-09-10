
import Scenarist from 'cnr.ist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const { $ } = new Scenarist ( Object .assign ( [], {

undefined: 'Oops'

} ) );

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
