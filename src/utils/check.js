export const checkExist = (arr, data) => {
  let isExist = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === data) {
      isExist = true;
    }
  }
  return isExist;
};
