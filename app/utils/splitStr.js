export default function splitStr(str, delimiter = ' ') {
  return str.split(delimiter).filter(Boolean);
}
