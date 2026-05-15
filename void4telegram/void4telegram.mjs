import { exit } from 'node:process';
import { logIn } from './parts/login.mjs';
import { downloadFile } from './parts/download.mjs';
import { uploadFile } from './parts/upload.mjs';
import { findFile } from './parts/findfile.mjs';
import { getChatHistory } from './parts/chathistory.mjs';
import { listFiles } from './parts/getlistoffiles.mjs';
import trash from 'trash';


const voidDirectory = 'C:\\upload';
const excludeFiles = [
  /\.void$/,
  'Drag and Drop Files Here.bat',
  'Drag and Drop Folders Here.bat',
  'File Checkout.bat',
  'void.mjs',
  'void_checkout.mjs',
  /\.(?:gif|webp)$/,
];


await logIn();


( async () => {
  // await downloadFile( 'yourFileName', 'yourDesiredDirectory' );
  // await uploadFile( 'yourPathToFile' );
  // console.log( await findFile( 'yourFileName' ) );
  // await getChatHistory();

  const fileList = await listFiles( voidDirectory, excludeFiles );
  for ( const filePath of fileList ) {
    await uploadFile( filePath );
    await trash( filePath );
    console.log( '\r✅ Moved to Recycle Bin! ' + filePath );
  }

  exit();
} )();