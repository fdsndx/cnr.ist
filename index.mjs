
export default class Scenarist {


#scenario;
#player;
#location;
#setting; 
#plot = {};


static #stamp = Symbol ( 'cnr.ist' );
static #playable = [ 'object', 'function' ];


constructor ( ... argv ) {

this .#scenario = argv .shift ();

if ( argv .length && Scenarist .#stamp !== argv .shift () )
throw Error ( 'Scenarist .prototype .constructor Only 1 argument is accepted' );

this .#player = argv .shift ();
this .#location = argv .shift ();
this .#setting = argv;
this .$ = Scenarist .#$ .bind ( this );

}; // constructor


static #$ ( ... argv ) {


switch ( typeof this .#scenario ) {


case 'object':

let location = argv .shift ();
let setting = [];
let scenario;

if ( typeof this .#scenario [ '$_' + location ] !== 'function' )
scenario = this .#scenario [ location ];

else {

setting .push ( this .$ );
scenario = this .#scenario [ location = '$_' + location ];

}


if ( Scenarist .#playable .includes ( typeof scenario ) )
return ( this .#plot [ scenario ] = this .#plot [ scenario ] || new Scenarist ( scenario, Scenarist .#stamp, this, location, ... setting ) )
.$ ( ... argv );


if ( ! argv .length )
return scenario;

const action = argv .shift ();

if ( ! this [ '$$' + action ] )
throw Error ( 'Scenarist .this .$ Unknown action' );

return this [ '$$' + action ] ( location, ... argv );


case 'function':

if ( this .#player )
return this .#player .#scenario [ this .#location ] ( ... this .#setting, ... argv );

return this .#scenario ( ... argv );


}


}; // #$


[ '$$=' ] ( location, ... argv ) {

if ( ! argv .length )
throw Error ( "Scenarist .#action [ '=' ] Arguments are missing" );

return this .#scenario [ location ] = argv .shift ();

}; // [ '$=' ]


}; // Scenarist
