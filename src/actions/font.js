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
import { checkExist, checkUrl } from '../utils/check';
import * as fontUtil from '../utils/font';


const reader = new FileReader();
const MAX_FONT_SIZE = 8 * 1024 * 1024; // 8MB
const loadLink = link => ({
  type: LOAD_FONT_LINK,
  link,
});

const loadLinkSuccess = (fontName, isExist = false) => ({
  type: LOAD_FONT_LINK_SUCCESS,
  fontName,
  isExist,
});

const loadLinkFailure = (error, code) => ({
  type: LOAD_FONT_LINK_FAILURE,
  error,
  code,
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

const loadFileFailure = (error, code) => ({
  type: LOAD_FONT_FILE_FAILURE,
  error,
  code,
});

export const loadFontLink = (link, currentFonts) => (
  dispatch => {
    dispatch(loadLink(link));
    if (!checkUrl(link)) {
      dispatch(loadLinkFailure('Not valid url.', 5));
      return Promise.resolve();
    }
    return axios.get(link, { maxContentLength: MAX_FONT_SIZE }).then((res) => {
      const fileType = fontUtil.checkLinkFileType(res.headers['content-type']);
      let fontName = '';
      /* check file type css or font type */
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
            dispatch(loadLinkFailure('Cannot load font.', 0));
          });
      }
      dispatch(loadLinkFailure('Cannot get link.', 1));
    })
      .catch(() => {
        dispatch(loadLinkFailure('Cannot get link.', 1));
      });
  }
);
/*
  always 'resolve' for redux-thunk get promise function.
  Cannot 'catch' anything from this promise.
  So, how can handle error?
  Answer is dispatch(loadFileFailure). <-- gives 'error' state to reducer.
*/
export const loadFontFile = (file, type, currentFonts = []) => (
  dispatch => {
    dispatch(loadFile());
    /* Check file size is larger than Maxsimum size */
    if (file.size >= MAX_FONT_SIZE) {
      dispatch(loadFileFailure('Exceed maximum size (8MB).', 2));
      return Promise.resolve();
    }
    /*
      Check file type is ''.
      File type of font is always ''. Maybe should fix later.
    */
    else if (file.type) {
      dispatch(loadFileFailure('Invalid file type.', 2));
      return Promise.resolve();
    }

    return new Promise((resolve) => {
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
        let mimetype = type;
        if (byte.length > 4) {
          let magicnumber = '';
          for (let i = 0; i < 4; i++) {
            const hex = byte[i].toString(16);
            magicnumber += `0${hex}`.substr(hex.length - 1, 2);
          }
          mimetype = fontUtil.checkFileType(magicnumber.toUpperCase());
        }
        if (!mimetype) {
          dispatch(loadFileFailure('Cannot read file. Maybe invalid filetype.', 4));
          resolve();
        }
        let binaryString = '';
        for (let i = 0; i < byte.length; i++) {
          binaryString += String.fromCharCode(byte[i]);
        }
        const base64 = btoa(binaryString);

        const fontName = fontUtil.getFontFamily(file.name);
        const isExist = checkExist(currentFonts, fontName);
        if (!isExist) {
          fontUtil.parseFont(fontName, base64, mimetype);
          if (fontName) {
            const font = new FontFaceObserver(fontName);
            return font.load()
              .then(() => {
                dispatch(loadFileSuccess(fontName));
                resolve();
              })
              .catch(() => {
                dispatch(loadFileFailure('Cannot load font.', 0));
                resolve();
              });
          }
          dispatch(loadFileFailure('Cannot add style. Please try again.', 3));
          resolve();
        }
        dispatch(loadFileSuccess(fontName, true));
        resolve();
      };
      reader.onerror = () => {
        dispatch(loadFileFailure('Cannot read file. Maybe invalid filetype.', 4));
        resolve();
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
