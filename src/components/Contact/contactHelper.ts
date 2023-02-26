export function buildInputStatusClass(
  prefix: string,
  inputStatus: {edited: boolean, valid: boolean},
  apiStatus: boolean): string {

  return `${prefix}
    ${inputStatus.edited || apiStatus ? 'edited'    : ''}
    ${!inputStatus.valid || apiStatus ? 'not-valid' : ''}
  `.replace(/\n/g, ' ').replace(/ {2,}/g, ' ')
}

