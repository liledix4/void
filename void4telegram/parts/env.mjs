import { loadEnvFile } from 'node:process';
import { __dirname  } from './dirname.mjs';
import { join } from 'node:path';


export function loadEnv() {
  loadEnvFile( join( __dirname, '..', '.env' ) );
}