import { findFile } from './findfile.mjs';
import { client } from './login.mjs';


export async function downloadFile( fileName, outputDirectory ) {
  const message = await findFile( fileName );
  let outputFile;

  if ( outputDirectory === undefined )
    outputFile = './' + fileName;
  else
    outputFile = outputDirectory + '/' + fileName;

  await client.downloadMedia( message.media, {
    outputFile: outputFile,
    progressCallback: ( downloaded, total ) => {
      console.log( `Download progress: ${ downloaded }/${ total }` );
    }
  } );
}