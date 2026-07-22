const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
const DOCUMENT_EXTENSIONS = [
  "pdf",
  "hwp",
  "hwpx",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
];

export const ATTACHMENT_EXTENSIONS = [...IMAGE_EXTENSIONS, ...DOCUMENT_EXTENSIONS];

export function isImageFile(url: string): boolean {
  const ext = url.split(".").pop()?.toLowerCase();
  return !!ext && IMAGE_EXTENSIONS.includes(ext);
}

export function isAllowedAttachment(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return !!ext && ATTACHMENT_EXTENSIONS.includes(ext);
}
