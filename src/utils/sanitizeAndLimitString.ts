import DOMPurify from "dompurify";

export const sanitizeAndLimitString = (dirtyHtml: string) : string => {
  const cleanhtml = DOMPurify.sanitize(dirtyHtml);

  if (cleanhtml.length >= 60) {
    return limitString(cleanhtml)
  }
  
  return cleanhtml;
}

export const limitString = (str: string, noOfChars: number = 60) => {
  let limitedString = str.slice(0, noOfChars)
  return limitedString + "..."
}