import axios from 'axios';
import FontFaceObserver from 'fontfaceobserver';
import {
  LOAD_FONT_LINK,
  LOAD_FONT_LINK_SUCCESS,
  LOAD_FONT_LINK_FAILURE,
  LOAD_FONT_FILE,
  LOAD_FONT_FILE_SUCCESS,
  LOAD_FONT_FILE_FAILURE,
  CLEAR_FONT,
} from '../constants/actionTypes';
import { checkExist } from '../utils/check';
import * as fontUtil from '../utils/font';


const reader = new FileReader();

const loadLink = link => ({
  type: LOAD_FONT_LINK,
  link,
});

const loadLinkSuccess = (fontName, isExist = false) => ({
  type: LOAD_FONT_LINK_SUCCESS,
  fontName,
  isExist,
});

const loadLinkFailure = (error) => ({
  type: LOAD_FONT_LINK_FAILURE,
  error,
});

const loadFile = link => ({
  type: LOAD_FONT_FILE,
  link,
});

const loadFileSuccess = (fontName, isExist = false) => ({
  type: LOAD_FONT_FILE_SUCCESS,
  fontName,
  isExist,
});

const loadFileFailure = (error) => ({
  type: LOAD_FONT_FILE_FAILURE,
  error,
});

export const loadFontLink = (link, currentFonts) => (
  dispatch => {
    dispatch(loadLink(link));
    return axios.get(link).then((res) => {
      const fileType = fontUtil.checkFileType(res.headers['content-type']);
      let fontName = '';
      if (fileType === 'css') {
        fontName = fontUtil.parseCSS(res.data, currentFonts);
      }
      else if (fileType) {
        const tempName = Date.now().toString();
        fontName = fontUtil.parseFont(tempName, link, fileType, true);
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

export const loadFontFile = (file, type, currentFonts = []) => (
  dispatch => {
    dispatch(loadFile());
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        /*
          1. Read Font file as Unit8Array, which file type is tff, woff, woff2, eot, otf, svg ...
          2. Array to String.
          3. use window's 'btoa' for encode binarystring as base64.
          4. use parseFont function for add styling.
          4-1. If font has already added to stylesheet ( check currentFonts ), just resolve promise.
        */
        const arrayBuffer = reader.result;
        const byte = new Uint8Array(arrayBuffer);
        let binaryString = '';
        for (let i = 0; i < byte.length; i++) {
          binaryString += String.fromCharCode(byte[i]);
        }
        const base64 = btoa(binaryString);

        const fontName = fontUtil.getFontFamily(file.name);
        const isExist = checkExist(currentFonts, fontName);
        if (!isExist) {
          fontUtil.parseFont(fontName, base64, type);
          if (fontName) {
            const font = new FontFaceObserver(fontName);
            return font.load()
              .then(() => {
                dispatch(loadFileSuccess(fontName));
                resolve();
              })
              .catch(() => {
                dispatch(loadFileFailure('CANNOT LOAD FONT'));
                reject();
              });
          }
          dispatch(loadFileFailure('CANNOT ADD STYLE'));
          reject();
        }
        dispatch(loadFileSuccess(fontName, true));
        resolve();
      };
      reader.onerror = error => {
        dispatch(loadFileFailure('CANNOT READ FILE'));
        reject(error);
      };
      reader.readAsArrayBuffer(file); // readAsBinaryString - Must not used in production mode ?
    });
  }
);

/* Remove Stylesheet which defines all font-face user added. */
export const clearFont = () => {
  const stylesheet = document.getElementById('fonttest-temp-style-sheet');
  if (stylesheet) {
    stylesheet.remove();
  }
  return {
    type: CLEAR_FONT,
  };
};
