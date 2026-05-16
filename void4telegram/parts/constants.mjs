import { StringSession } from 'telegram/sessions/index.js';
import { loadEnv } from './env.mjs';
import { env } from 'process';


loadEnv();


export const telegramConfig = {
  api: {
    id: parseInt( env.TELEGRAM_API_ID ),
    hash: env.TELEGRAM_API_HASH,
    StringSession: new StringSession( env.TELEGRAM_API_STRINGSESSION ), // fill this later with the value from session.save()
    connectionRetries: parseInt( env.TELEGRAM_API_CONNECTIONRETRIES ),
  },
  files: {
    timeout: parseInt( env.TELEGRAM_FILE_TIMEOUT ),
    workers: parseInt( env.TELEGRAM_FILE_WORKERS ),
  },
};
export const voidConfig = {
  chatID: parseInt( env.TELEGRAM_VOIDCHAT_ID ),
  directory: env.VOID_DIRECTORY,
  exclude: JSON.parse( env.VOID_EXCLUDE ),
};