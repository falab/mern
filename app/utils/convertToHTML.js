import { convertToRaw } from 'draft-js';

export default function convertToHTML(contentState) {
  const rawContent = convertToRaw(contentState);
  console.log(rawContent);
}
