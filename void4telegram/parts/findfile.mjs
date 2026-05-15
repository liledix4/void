import { Api } from 'telegram';
import { config } from '../config.mjs';
import { client } from './login.mjs';


export async function findFile( fileName, limit = 1 ) {
  const searchResults = await client.getMessages( config.voidGroupID, {
    search: fileName,
    filter: new Api.InputMessagesFilterDocument(),
    limit: limit,
  } );
  const message = searchResults[ 0 ];
  if ( !message || !message.media ) {
    console.log( 'File not found!' );
    return;
  }
  return message;
}