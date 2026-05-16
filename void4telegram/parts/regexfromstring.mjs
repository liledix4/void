export function regexFromString( str ) {
  if ( str[ 0 ] === '/' && str[ str.length - 1 ] === '/' ) {
    try { str = new RegExp( str.slice(1, -1) ); }
    catch { return str; }
  }
  return str;
}