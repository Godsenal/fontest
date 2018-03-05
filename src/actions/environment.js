import {
  CHANGE_WIDTH_AND_HEIGHT,
} from '../constants/actionTypes';

export const changeWidthAndHeight = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    type: CHANGE_WIDTH_AND_HEIGHT,
    width,
    height,
  };
};

