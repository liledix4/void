export function humanizeFileSize( bytes, si = false, decimalPlaces = 1 ) {
  if ( bytes === 0 ) return '0 B';
  const thresh = si ? 1000 : 1024;
  const units = si
    ? [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ]
    : [ 'B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' ];
  const i = Math.floor( Math.log( Math.abs( bytes ) ) / Math.log( thresh ) );
  const value = bytes / Math.pow( thresh, i );
  return `${ value.toFixed( decimalPlaces ) } ${ units[ i ] }`;
}