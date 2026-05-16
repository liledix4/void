import { humanizeFileSize } from './humanizefilesize.mjs';
import { client } from './login.mjs';
import { renameSync, statSync } from 'node:fs';
import { delay } from './delay.mjs';
import { telegramConfig, voidConfig } from './constants.mjs';
import trash from 'trash';
import { extname } from 'node:path';


const problematicFileExtensions = [ '.gif', '.webm', '.webp' ];


export async function uploadFile( filePath, moveToRecycleBin = false ) {
  if ( problematicFileExtensions.includes( extname( filePath ) ) ) {
    const append = 'file';
    renameSync( filePath, filePath + append );
    filePath += append;
  }

  process.stdout.write( '\n🔄️ New upload started: ' + filePath );
  const fileSize = humanizeFileSize( statSync( filePath ).size );
  await client.sendFile( voidConfig.chatID, {
    file: filePath, // Path to a file. Obviously.
    workers: telegramConfig.files.workers, // Anything above 16 is unstable.
    forceDocument: true, // Forces videos and images to be sent as documents. That is especially necessary to preserve file names, because images have no file names if they're not sent as documents.
    progressCallback: // Function that is called every time the progress is updated.
      percentage => process.stdout.write( `\r📤 Uploading "${ filePath }" (${ fileSize }): ${ parseInt( percentage * 10000 ) / 100 }%` ), // This function continuously returns the terminal output with the file path and upload percentage.
  } );
  process.stdout.write( '\r✅ Uploaded! ' + filePath );
  if ( moveToRecycleBin === true ) {
    await trash( filePath );
    process.stdout.write( '\r✅ Moved to Recycle Bin! ' + filePath );
  }
  await delay( telegramConfig.files.timeout );
}