import { promises as fs } from 'fs';
import path from 'path';


export async function listFiles( dir, excludePatterns = [] ) {
  const patterns = Array.from( excludePatterns ).map( p => ( p instanceof RegExp ? p : new RegExp( `^${ escapeRegex( String( p ) ) }$` ) ) );
  const result = [];

  async function walk( current ) {
    const entries = await fs.readdir( current, { withFileTypes: true } );
    for ( const ent of entries ) {
      const full = path.join( current, ent.name );
      if ( ent.isDirectory() ) {
        await walk( full );
      } else if ( ent.isFile() ) {
        if ( !matchesAny( ent.name, patterns ) )
          result.push( full );
      }
    }
  }

  await walk( path.resolve( dir ) );
  return result;
}

function matchesAny( name, patterns ) {
  for ( const p of patterns )
    if ( p.test( name ) )
      return true;
  return false;
}

function escapeRegex( str ) {
  return str.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
}
