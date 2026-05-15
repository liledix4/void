import { renameSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname( fileURLToPath( import.meta.url ) );

// Get the file path from the command line argument
const filePath = process.argv[ 2 ];
const config = {
    hashType: 'sha256',
    voidPath: __dirname,
};

if ( !filePath ) {
    console.error( 'No file path provided.' );
    process.exit( 1 );
}

try {
    const fileBuffer = readFileSync( filePath );
    const hash = createHash( config.hashType ).update( fileBuffer ).digest( 'hex' );

    const originalDirectory = dirname( filePath );
    const originalFileName = basename( filePath ).replace( /\..+?$/, '');

    const extension = extname( filePath ).toLowerCase();
    const extensionName = extension.replace( /^\./, '' );

    const newFileName = `${ hash }${ extension }`;
    const newDirectory = join( config.voidPath, extensionName );
    const newPath = join( newDirectory, '\\', newFileName );

    if ( !existsSync( newDirectory ) ) {
        mkdirSync( newDirectory );
    }

    // 3. Rename the file
    if ( filePath !== newPath ) {
        renameSync( filePath, newPath );
        console.log( `[${ extensionName.toUpperCase() }] ${ hash }: ${ originalFileName } | From ${ originalDirectory }` );
    } else {
        console.log( `Skipped: ${ basename( filePath ) } (Already hashed)` );
    }
} catch ( err ) {
    console.error( `Error processing ${ filePath }:`, err.message );
}