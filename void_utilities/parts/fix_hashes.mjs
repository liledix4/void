import { appendFileSync, writeFile } from 'node:fs';
import { breakLines } from './break_lines.mjs';


export function fixHashes( oldFilePath, newFilePath ) {
  const brokenLines = {
    old: breakLines( oldFilePath ),
    new: breakLines( newFilePath ),
  };
  let initial = {
    old: [],
    new: [],
  };


  brokenLines.old.forEach( line => {
    const match = line.match( /^\[(.*?)\] ([0-9a-f]+?): ([0-9a-f]+?) \| From (.*?)$/ );
    const addObject = {
      extension: match[ 1 ],
      hash: {
        new: match[ 2 ],
        old: match[ 3 ],
      },
      path: match[ 4 ],
    };
    initial.old.push( addObject );
  } );
  brokenLines.new.forEach( line => {
    const match = line.match( /^\[(.*?)\] ([0-9a-f]+?): (.+?) \| From (.*?)$/ );
    const addObject = {
      fullString: line,
      extension: match[ 1 ],
      hash: {
        old: match[ 2 ],
      },
      fileName: match[ 3 ],
      path: match[ 4 ],
    };
    initial.new.push( addObject );
  } );


  let newerData = [];
  initial.new.forEach( newObject => {
    const oldHash = newObject.hash.old;
    const hashMatch = initial.old.filter( i => i.hash.old === oldHash );

    // const hashReduced = initial.old.reduce( ( prev, curr, index ) => {
    //   if ( curr.hash.old === oldHash )
    //     return index;
    // }, null );
    // console.log( hashReduced );

    let output = '';

    if ( hashMatch.length === 1 ) {
      const newerDataObject = hashMatch[ 0 ];
      output = `[${ newObject.extension }] ${ newerDataObject.hash.new }: ${ newObject.fileName } \| From ${ newObject.path }`;
    }
    else {
      output = `[NOT FIXED] ${ newObject.fullString }`;
    }

    newerData.push( output );
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
    '_NEW_FIXED.void',
    newerData.join( '\n' ),
    { encoding: 'utf-8', flag: 'w+' },
    () => {}
  );
}