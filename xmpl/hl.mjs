
import Scenarist from 'cnr.ist';

const hello = new Scenarist ( {

greeting: 'Hello',
name: 'World',
$_greet: ( $, ... name ) => `${ $ ( 'greeting' ) } ${ name .join ( ' ' ) || $ ( 'name' ) }!`

} );

console .log ( hello .$ ( 'greet', ... process .argv .slice ( 2 ) ) );
