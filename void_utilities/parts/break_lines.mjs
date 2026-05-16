import { readFileSync } from 'node:fs';


export function breakLines( filePath ) {
  return readFileSync( filePath, { encoding: 'utf-8' } )
    .split( /\r?\n/g );
}