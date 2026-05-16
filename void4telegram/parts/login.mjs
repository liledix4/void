import readline from 'readline';
import { TelegramClient } from 'telegram';
import { telegramConfig } from './constants.mjs';
import { env } from 'process';


export let client;
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout,
} );
const stringSessionPattern = /^[\dB][A-Za-z0-9+/=\-_]{340,450}$/;


export async function logIn() {
  console.log('🔄️ Loading...' );
  client = new TelegramClient( telegramConfig.api.StringSession, telegramConfig.api.id, telegramConfig.api.hash, {
    connectionRetries: telegramConfig.api.connectionRetries,
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
  console.log( '✅ You should now be connected.' );
  if ( !env.TELEGRAM_API_STRINGSESSION.match( stringSessionPattern ) ) {
    console.log( client.session.save() );
  }
}