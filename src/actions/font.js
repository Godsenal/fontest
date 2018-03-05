import axios from 'axios';
import FontFaceObserver from 'fontfaceobserver';
import {
  LOAD_FONT_LINK,
  LOAD_FONT_LINK_SUCCESS,
  LOAD_FONT_LINK_FAILURE,
  LOAD_FONT_FILE,
  LOAD_FONT_FILE_SUCCESS,
  LOAD_FONT_FILE_FAILURE,
} from '../constants/actionTypes';
import { checkExist } from '../utils/check';

const baseUrl = '/api/font';
const fontReg = /(css|woff2|woff|ttf|otf|eot)/;
const FONT_FORMAT = {
  woff: 'woff',
  woff2: 'woff2',
  ttf: 'truetype',
  otf: 'opentype',
  eot: null,
};

const loadLink = link => ({
  type: LOAD_FONT_LINK,
  link,
});

const loadLinkSuccess = (fontName, isExist = false) => ({
  type: LOAD_FONT_LINK_SUCCESS,
  fontName,
  isExist,
});

const loadLinkFailure = () => ({
  type: LOAD_FONT_LINK_FAILURE,
});

const loadFile = link => ({
  type: LOAD_FONT_FILE,
  link,
});

const loadFileSuccess = (fontName) => ({
  type: LOAD_FONT_FILE_SUCCESS,
  fontName,
});

const loadFileFailure = () => ({
  type: LOAD_FONT_FILE_FAILURE,
});

const checkFileType = (type) => {
  let fileType = false;
  if (type) {
    fileType = type.match(fontReg)[0];
  }
  return fileType;
};
const parseFont = (link, fileType) => {
  const fontName = Date.now().toString();
  const s = document.createElement('style');
  const format = FONT_FORMAT[fileType];
  s.type = 'text/css';
  s.appendChild(document.createTextNode(`
    @font-face {
      font-family: '${fontName}';
      src: url('${link}') format('${format}');
    }
  `));
  const head = document.head || document.head[0];
  head.appendChild(s);

  return fontName;
};
const parseCSS = (data, currentFonts) => {
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
      const s = document.createElement('style');
      s.type = 'text/css';
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

export const loadFontLink = (link, currentFonts) => (
  dispatch => {
    dispatch(loadLink(link));
    return axios.get(link).then((res) => {
      const fileType = checkFileType(res.headers['content-type']);
      let fontName = '';
      if (fileType === 'css') {
        fontName = parseCSS(res.data, currentFonts);
      }
      else if (fileType) {
        fontName = parseFont(link, fileType);
      }
      if (fontName) {
        const font = new FontFaceObserver(fontName);
        return font.load()
          .then(() => {
            dispatch(loadLinkSuccess(fontName));
          })
          .catch(() => {
            dispatch(loadLinkFailure());
          });
      }
      dispatch(loadLinkFailure());
    });
  }
);

export const loadFontFile = (file, type) => (
  dispatch => {
    dispatch(loadFile());
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(baseUrl, formData)
      .then((res) => {
        const { path, fileName } = res.data;
        const { protocol, hostname, port } = window.location;
        const fontName = parseFont(`${protocol}//${hostname}:${port}/api/font/${type}`, type);
        if (fontName) {
          const font = new FontFaceObserver(fontName);
          return font.load()
            .then(() => {
              dispatch(loadFileSuccess(fontName));
            })
            .catch(() => {
              dispatch(loadFileFailure());
            });
        }
        dispatch(loadFileFailure());
      });
  }
);
