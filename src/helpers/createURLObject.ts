export function createURLObject(url: string) {
  const splitURL = url.split("/");
  const urlObject = { state: splitURL[2], city: splitURL[4] };
  return urlObject;
}
