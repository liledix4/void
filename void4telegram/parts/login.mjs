import readline from 'readline';
import { TelegramClient } from 'telegram';
import { config } from '../config.mjs';


export let client;
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout,
} );


export async function logIn() {
  console.log( 'Loading...' );
  client = new TelegramClient( config.stringSession, config.apiId, config.apiHash, {
    connectionRetries: 100,
  } );
  await client.start( {
    phoneNumber: async () =>
      new Promise( resolve =>
        rl.question( 'Please enter your number: ', resolve )
      ),
    password: async () =>
      new Promise( resolve =>
        rl.question( 'Please enter your password: ', resolve )
      ),
    phoneCode: async () =>
      new Promise( resolve =>
        rl.question( 'Please enter the code you received: ', resolve )
      ),
    onError: err => console.log( err ),
  } );
  console.log( 'You should now be connected.' );
  console.log( client.session.save() );
}