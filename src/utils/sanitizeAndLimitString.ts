import DOMPurify from "dompurify";

export const sanitizeAndLimitString = (dirtyHtml: string) : string => {
  const cleanhtml = DOMPurify.sanitize(dirtyHtml);
  if (cleanhtml.length >= 100) {
    let limitedString = cleanhtml.slice(0, 100);
    return limitedString + "...";
  }
  return cleanhtml;
}