import { config } from '../config.mjs';
import { client } from './login.mjs';


export async function uploadFile( filePath ) {
  await client.sendFile( config.voidGroupID, {
    file: filePath,
    workers: 20,
    progressCallback: percentage => process.stdout.write( `\r📤 Uploading "${ filePath }": ${ parseInt( percentage * 10000 ) / 100 }%` ),
  } );
  process.stdout.write( '\r✅ Uploaded! ' + filePath );
}