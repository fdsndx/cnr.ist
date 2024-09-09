# Scenarist

JavaScript class that binds itself to an object to behave as its subject for interaction.

## Installation

### Through `npm`

```sh
npm i cnr.ist
```

#### Usage Example

```js
import Scenarist from 'cnr.ist';

console .log ( new Scenarist ( {

hello: 'Hello World!'

} ) .$ ( 'hello' ) );
```

### Manually

Copy `index.mjs` to wherever `Scenarist` is desired to help:

```sh
cp index.mjs $PATH_TO_WHEREVER_SCENARIST_IS_DESIRED_TO_HELP/scenarist.mjs
```

#### Usage Example

```js
import Scenarist from './scenarist.mjs';

console .log ( new Scenarist ( {

hello: 'Hello World!'

} ) .$ ( 'hello' ) );
```

## Implementation

```
?# cat - > index.mjs
```

### `cnr.ist` as ECMAScript Module

`cnr.ist` does not import another modules, and only exports the `Scenarist` class as it's default.

```js
//+==

export default class Scenarist {

//-==
```

### Instance Private Fields

```js
//+==

#scenario;
#player;
#location;
#setting; 
#plot = {};

//-==
```

### Static Private Fields

```js
//+==

static #stamp = Symbol ( 'cnr.ist' );
static #playable = [ 'object', 'function' ];

//-==
```

### Constructor

```js
//+==

constructor ( ... argv ) {

this .#scenario = argv .shift ();

if ( argv .length && Scenarist .#stamp !== argv .shift () )
throw Error ( 'Scenarist .prototype .constructor Only 1 argument is accepted' );

this .#player = argv .shift ();
this .#location = argv .shift ();
this .#setting = argv;
this .$ = Scenarist .#$ .bind ( this );

}; // constructor

//-==
```

### Director

The `#$` static private function acts as director for `Scenarist`.

```js
//+==

static #$ ( ... argv ) {

//-==
```

Depending on the type of the scenario, a direction will be taken.

```js
//+==

switch ( typeof this .#scenario ) {

//-==
```

#### Recursive Scenarios

In case of `object` scenarios, each property found within this `object` can be accessed as an inner scenario.

```js
//+==

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

//-==
```

If the inner scenario is playable,
meaning that it is either an object or function,
then control is given to the director of the inner scenario;
to feature Scenarist with its recursive nature
(since this inner scenario may have its own ineer scenarios and so forth):

```js
//+==

if ( Scenarist .#playable .includes ( typeof scenario ) )
return ( this .#plot [ scenario ] = this .#plot [ scenario ] || new Scenarist ( scenario, Scenarist .#stamp, this, location, ... setting ) )
.$ ( ... argv );

//-==
```

```js
//+==

if ( ! argv .length )
return scenario;

const action = argv .shift ();

if ( ! this [ '$$' + action ] )
throw Error ( 'Scenarist .this .$ Unknown action' );

return this [ '$$' + action ] ( location, ... argv );

//-==
```

#### Playable Scenarios

```js
//+==

case 'function':

if ( this .#player )
return this .#player .#scenario [ this .#location ] ( ... this .#setting, ... argv );

return this .#scenario ( ... argv );

//-==
```

End of `switch`:

```js
//+==

}

//-==
```

End of director `#$`:

```js
//+==

}; // #$

//-==
```

### Actions

#### Assignment

```js
//+==

[ '$$=' ] ( location, ... argv ) {

if ( ! argv .length )
throw Error ( "Scenarist .#action [ '=' ] Arguments are missing" );

return this .#scenario [ location ] = argv .shift ();

}; // [ '$=' ]

//-==
```

### End of Scenarist

```js
//+==

}; // Scenarist

//-==
```


?# =0 cd xmpl ; roll README.md
