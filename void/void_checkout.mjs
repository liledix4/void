import { readFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );
const resultFilePath = join( __dirname, '\\', 'result.json' );

if ( !existsSync( resultFilePath ) ) {
  console.error( '\x1b[33m\x1b[41m\x1b[1m❌ SCRIPT CAN\'T RUN WITHOUT "RESULT.JSON"!\x1b[0m\n\x1b[31m└─\x1b[0m\x1b[33m Get "result.json" file from Telegram chat first, then put it to the same directory as this script!\x1b[0m' );
  process.exit( 0 )
}

// Extract results
const resultsRaw = JSON.parse(
  readFileSync(
    resultFilePath,
    { encoding: 'utf-8' }
  )
);
let resultFileNames = [];

resultsRaw.messages.forEach( obj => {
  if ( obj.file_name )
    resultFileNames.push( obj.file_name )
} );

resultFileNames.forEach( uploadedFile => {
  const extension = extname( uploadedFile ).slice( 1 );
  const fullFilePath = join( __dirname, '\\', extension, '\\', uploadedFile );
  let output = `[${ extension.toUpperCase() }] ${ uploadedFile } | `;

  if ( existsSync( fullFilePath ) ) {
    output += '⚠️ Uploaded to Telegram, file deleted';
    unlinkSync( fullFilePath );
  }
  else {
    return;
    // output += '❌ File is missing locally';
  }

  console.log( output );
} );