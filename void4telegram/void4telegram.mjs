import { exit } from 'node:process';
import { logIn } from './parts/login.mjs';
import { downloadFile } from './parts/download.mjs';
import { uploadFile } from './parts/upload.mjs';
import { findFile } from './parts/findfile.mjs';
import { getChatHistory } from './parts/chathistory.mjs';
import { listFiles } from './parts/getlistoffiles.mjs';
import { voidConfig } from './parts/constants.mjs';
import { regexFromString } from './parts/regexfromstring.mjs';


let excludeFiles = [
  /\.void$/,
  'Drag and Drop Files Here.bat',
  'Drag and Drop Folders Here.bat',
  'File Checkout.bat',
  'void.mjs',
  'void_checkout.mjs',
];

voidConfig.exclude.forEach( str => excludeFiles.push( regexFromString( str ) ) );


await logIn();


( async () => {
  // await downloadFile( 'yourFileName', 'yourDesiredDirectory' );
  // await uploadFile( 'yourPathToFile' );
  // console.log( await findFile( 'yourFileName' ) );
  // await getChatHistory();

  const fileList = await listFiles( voidConfig.directory, excludeFiles );
  for ( const filePath of fileList )
    await uploadFile( filePath, true );

  exit();
} )();