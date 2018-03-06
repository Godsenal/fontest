import update from 'immutability-helper';

import * as types from '../constants/actionTypes';

const initialState = {
  load: {
    status: 'INIT',
    isLink: false,
    fontName: 'monospace, cursive',
    link: '',
    currentFonts: [],
    error: '',
  },
};

export default function font(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FONT_LINK:
      return update(state, {
        load: {
          status: { $set: 'WAITING' },
          link: { $set: action.link },
        },
      });
    case types.LOAD_FONT_LINK_SUCCESS:
      return update(state, {
        load: {
          status: { $set: 'SUCCESS' },
          isLink: { $set: true },
          fontName: { $set: action.fontName },
          currentFonts: { $push: action.isExist ? [] : [action.fontName] },
        },
      });
    case types.LOAD_FONT_LINK_FAILURE:
      return update(state, {
        load: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case types.LOAD_FONT_FILE:
      return update(state, {
        load: {
          status: { $set: 'WAITING' },
        },
      });
    case types.LOAD_FONT_FILE_SUCCESS:
      return update(state, {
        load: {
          status: { $set: 'SUCCESS' },
          isLink: { $set: false },
          fontName: { $set: action.fontName },
          currentFonts: { $push: action.isExist ? [] : [action.fontName] },
        },
      });
    case types.LOAD_FONT_FILE_FAILURE:
      return update(state, {
        load: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case types.CLEAR_FONT:
      return update(state, {
        load: { $set: initialState.load },
      });
    default:
      return state;
  }
}
