import { writeFile } from 'node:fs';
import { breakLines } from './break_lines.mjs';


export function findMissingHashes( oldFilePath, newFilePath ) {
  const brokenLines = {
    old: breakLines( oldFilePath ),
    new: breakLines( newFilePath ),
  };
  let initial = {
    old: [],
    new: [],
  };


  brokenLines.old.forEach( line => {
    const match = line.match( /^\[.*?\] ([0-9a-f]+)/ );
    const addObject = {
      fullString: line,
      hash: match[ 1 ],
    };
    initial.old.push( addObject );
  } );
  brokenLines.new.forEach( line => {
    const match = line.match( /^\[.*?\] ([0-9a-f]+)/ );
    const addObject = {
      fullString: line,
      hash: match[ 1 ],
    };
    initial.new.push( addObject );
  } );


  let filteredStrings = [];
  initial.new.forEach( newObject => {
    const findMatch = initial.old.filter( obj => obj.hash === newObject.hash );
    if ( findMatch.length === 0 )
      filteredStrings.push( newObject.fullString );
  } );


  writeFile(
    './old.json',
    JSON.stringify( initial.old, undefined, 2 ),
    { encoding: 'utf-8', flag: 'w+' },
    () => {}
  );
  writeFile(
    './new.json',
    JSON.stringify( initial.new, undefined, 2 ),
    { encoding: 'utf-8', flag: 'w+' },
    () => {}
  );
  writeFile(
    './_NEW_MERGED.void',
    filteredStrings.join( '\n' ),
    { encoding: 'utf-8', flag: 'w+' },
    () => {}
  );
}