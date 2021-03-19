export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArrayElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}
