import update from 'immutability-helper';

import { CHANGE_WIDTH_AND_HEIGHT } from '../constants/actionTypes';

const MOBILE_WIDTH = 800;

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth <= MOBILE_WIDTH,
};

export default function environment(state = initialState, action) {
  switch (action.type) {
    case CHANGE_WIDTH_AND_HEIGHT:
      return update(state, {
        width: { $set: action.width },
        height: { $set: action.height },
        isMobile: { $set: action.width < MOBILE_WIDTH },
      });
    default:
      return state;
  }
}
