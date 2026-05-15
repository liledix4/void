import { __dirname } from './void_utilities/dirname.mjs';
import { findMissingHashes } from './void_utilities/find_missing_hashes.mjs';
import { fixHashes } from './void_utilities/fix_hashes.mjs';


const action = process.argv[ 2 ];
const oldFilePath = process.argv[ 3 ];
let newFilePath;
const config = {
  voidPath: __dirname,
};


switch ( action ) {
  case 'fix_hashes':
    newFilePath = process.argv[ 4 ];
    fileCheck( oldFilePath );
    fileCheck( newFilePath );
    fixHashes( oldFilePath, newFilePath );
    break;

  case 'find_missing_hashes':
    newFilePath = process.argv[ 4 ];
    fileCheck( oldFilePath );
    fileCheck( newFilePath );
    findMissingHashes( oldFilePath, newFilePath );
    break;
}


function fileCheck( testFilePath, forceExit = false ) {
  if ( !testFilePath ) {
    if ( forceExit === true ) {
      console.error( 'You must provide file path for this operation.' );
      process.exit( 1 );
    }
    else {
      console.log( 'You need to provide file path for this operation.' );
      return false;
    }
  }
  return true;
}