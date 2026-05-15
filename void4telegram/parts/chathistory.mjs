import { config } from '../config.mjs';
import { client } from './login.mjs';
import { writeFileSync } from 'node:fs';


export async function getChatHistory( toFile = './chathistory.json' ) {
  let result = {};
  let loadedMessages = 0;

  for await ( const message of client.iterMessages( config.voidGroupID, { reverse: true } ) ) {
    if ( message.media && message.media.document ) {
      const attributes = message.media.document.attributes;
      const filteredObject = attributes.filter( obj => obj.fileName !== undefined );
      if ( filteredObject.length === 1 ) {
        const fileName = filteredObject[ 0 ].fileName;
        result[ message.id ] = fileName;
        loadedMessages++;
        console.log( `Got ${ loadedMessages } messages...` );
      }
    }
  };

  writeFileSync( toFile, JSON.stringify( result, undefined, 2 ) );
  console.log( `Finished! You've got ${ loadedMessages } messages loaded to file: ${ toFile }` );
}