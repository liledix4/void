import { Api } from 'telegram';
import { client } from './login.mjs';
import { voidConfig } from './constants.mjs';


export async function findFile( fileName, limit = 1 ) {
  const searchResults = await client.getMessages( voidConfig.chatID, {
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