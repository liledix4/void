import { StringSession } from 'telegram/sessions/index.js';
import { loadEnv } from './env.mjs';


loadEnv();


export const telegramConfig = {
  api: {
    id: parseInt( process.env.TELEGRAM_API_ID ),
    hash: process.env.TELEGRAM_API_HASH,
    StringSession: new StringSession( process.env.TELEGRAM_API_STRINGSESSION ), // fill this later with the value from session.save()
    connectionRetries: parseInt( process.env.TELEGRAM_API_CONNECTIONRETRIES ),
  },
  files: {
    timeout: parseInt( process.env.TELEGRAM_FILE_TIMEOUT ),
    workers: parseInt( process.env.TELEGRAM_FILE_WORKERS ),
  },
};
export const voidConfig = {
  chatID: parseInt( process.env.TELEGRAM_VOIDCHAT_ID ),
  directory: process.env.VOID_DIRECTORY,
};