const checkurl = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?' + // port
  '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
export const checkExist = (arr, data) => {
  let isExist = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === data) {
      isExist = true;
    }
  }
  return isExist;
};

export const checkUrl = (url) => {
  if (checkurl.test(url)) {
    return true;
  }
  return false;
};
