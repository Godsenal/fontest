import { checkExist } from './check';

const s = document.createElement('style');
s.id = 'fonttest-temp-style-sheet';
const fontReg = /(css|woff2|woff|ttf|otf)/;

export function getMime(type) {
  switch (type) {
    case 'ttf':
      return 'application/x-font-ttf';
    case 'woff':
      return 'application/font-woff';
    case 'woff2':
      return 'application/font-woff2';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'application/x-font-opentype';
  }
}

export function getFormat(type) {
  switch (type) {
    case 'ttf':
      return 'truetype';
    case 'woff':
      return 'woff';
    case 'woff2':
      return 'woff2';
    case 'svg':
      return 'svg';
    case 'eot':
      return 'eot';
    default:
      return 'opentype';
  }
}

export function getFontFamily(filename) {
  const fontFamily = filename.trim().split('.').slice(0, -1).join().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '');
  return fontFamily;
}

export const checkLinkFileType = (type) => {
  let fileType = false;
  if (type) {
    [fileType] = type.match(fontReg); // array destruction
  }
  return fileType;
};
/*
  Check file type by 'magic number'( first 16digit of binary ) of file.
*/
export const checkFileType = (magicnumber) => {
  switch (magicnumber) {
    case '774F4646':
      return 'woff';
    case '774F4632':
      return 'woff2';
    case '00010000':
      return 'ttf';
    case '4F54544F':
      return 'otf';
    default:
      return false;
  }
};
/*
  fontName - define font-family.
  url - if isLink = true, link file. else base64 encoded file,
  fileType - file extension like woff2..,
  isLink - http/https style link or local file.
*/
export const parseFont = (fontName, url, fileType, isLink = false) => {
  const format = getFormat(fileType);
  let src = '';
  if (!isLink) {
    const mime = getMime(fileType);
    src += `data:${mime};charset=utf-8;base64,${url}`;
  }
  else {
    src += `${url}`;
  }
  s.appendChild(document.createTextNode(`
    @font-face {
      font-family: '${fontName}';
      font-style: normal;
      font-weight: 400;
      src: url(${src}) format('${format}');
    }
  `));
  const head = document.head || document.head[0];
  head.appendChild(s);

  return fontName;
};
export const parseCSS = (data, currentFonts) => {
  const reg = data.match(/@font-face {([^}]+)}/g);
  /* Get Font-family from style sheet */
  const parseName =
    reg.length >= 0 ?
      reg[0].match(/font-family: ([^;]+)/)[1] :
      null;
  if (parseName) {
    const fontName = parseName.trim().replace(/'/g, '');
    /*
      Find current Font is already exist ( User searched in this pages)
      If it's true, return SUCCESS
    */
    const isExist = checkExist(currentFonts, fontName);
    if (!isExist) {
      /*
          Add Font-face ONLY style.
          Use loof of appendChild rather using join('\n').
          Maybe slightly faster ..
        */
      for (let i = 0; i < reg.length; i++) {
        s.appendChild(document.createTextNode(reg[i]));
      }
      const head = document.head || document.head[0];
      head.appendChild(s);
    }
    return fontName;
  }
  return false;
};
