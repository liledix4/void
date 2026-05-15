import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { loadEnvFile } from 'node:process';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );


process.argv.forEach( ( filePath, index ) => {
  if ( index < 2 ) return;
  loadEnvFile( path.join( __dirname, '.env' ) );
  if ( filePath.endsWith( '.mhx' ) )
    voidOrganizeFromMHX( filePath );
  else
    calculate( filePath );
} );


function calculate( filePath ) {
  const multiHasher = process.env.MULTIHASHER_EXECUTABLE_PATH;
  const hashAlgo = process.env.HASH_ALGORITHM;
  spawn( multiHasher, [ filePath, '/HASH=' + hashAlgo, '/RECURSION' ] );
}


function voidOrganizeFromMHX( filePath ) {
  const rawMHX = readFileSync( filePath, { encoding: 'utf-8' } );
  const voidOutput = process.env.VOID_OUTPUT_PATH;
  const matches = rawMHX.match( /<File name="(?:.+?)" size="\d+">\r?\n\s*<Digest hash=".+?">(?:[0-9A-F]+)<\/Digest>/g );
  matches.forEach( str => {
    const matchSpecific = str.match( /<File name="(.+?)" size="\d+">\r?\n\s*<Digest hash=".+?">([0-9A-F]+)<\/Digest>/s );
    const thisFilePath = matchSpecific[ 1 ];

    const obj = {
      file: basename( thisFilePath ).replace( /\..+?$/, ''),
      directory: dirname( thisFilePath ),
      hash: matchSpecific[ 2 ].toLowerCase(),
      extension: extname( thisFilePath.toLowerCase() ),
    };
    const extCropped = obj.extension.slice( 1 );

    const newFileName = `${ obj.hash }${ obj.extension }`;
    const newDirectory = join( voidOutput, extCropped );
    const newPath = join( newDirectory, newFileName );

    if ( !existsSync( newDirectory ) ) {
      mkdirSync( newDirectory );
    }

    if ( thisFilePath !== newPath ) {
      renameSync( thisFilePath, newPath );
      console.log( `[${ extCropped.toUpperCase() }] ${ obj.hash }: ${ obj.file } | From ${ obj.directory }` );
    } else {
      console.log( `Skipped: ${ basename( thisFilePath ) } (Already hashed)` );
    }

  } );
}