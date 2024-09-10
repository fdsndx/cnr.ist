
export default class Scenarist {


#scenario;
#player;
#plot = {};


static #stamp = Symbol ( 'cnr.ist' );
static #playable = [ 'object', 'function' ];


constructor ( ... argv ) {

this .#scenario = argv .shift ();

if ( argv .length && Scenarist .#stamp !== argv .shift () )
throw Error ( 'Scenarist .prototype .constructor Only 1 argument is accepted' );

this .#player = argv .shift ();
this .$ = Scenarist .#$ .bind ( this );

}; // constructor


static #$ ( ... argv ) {

let location;

if ( argv [ 0 ] === Scenarist .#stamp ) {

argv .shift ();
location = argv .shift ();

}


switch ( typeof this .#scenario ) {


case 'object':

let direction = argv .shift ();
let scenario = this .#scenario [ Object .hasOwn ( this .#scenario, direction ) ? direction : undefined ];


if ( Scenarist .#playable .includes ( typeof scenario ) )
return (

this .#plot [ scenario ] = this .#plot [ scenario ] || new this .constructor ( scenario, Scenarist .#stamp, this )

) .$ ( Scenarist .#stamp, direction, ... argv );


if ( ! argv .length )
return scenario;

const action = argv .shift ();

if ( ! this [ '$$' + action ] )
throw Error ( 'Scenarist .this .$ Unknown action' );

return this [ '$$' + action ] ( direction, ... argv );


case 'function':

if ( this .#player )
return this .#player .#scenario [ location ] ( ... argv );

return this .#scenario ( ... argv );


}


}; // #$


[ '$$=' ] ( location, ... argv ) {

if ( ! argv .length )
throw Error ( "Scenarist .#action [ '=' ] Arguments are missing" );

return this .#scenario [ location ] = argv .shift ();

}; // [ '$=' ]


}; // Scenarist
