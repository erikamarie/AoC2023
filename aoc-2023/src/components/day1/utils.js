const TEXT_NUMS = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
 };

const getFirstAndLastDigit = (dirty) => {
    const clean = textNumToDigit(dirty);
    const numbers = clean.match(/\d/g);
    const result = numbers && numbers.length > 0 ? numbers[0].concat(numbers[numbers.length-1]) : 0;
    return parseInt(result);
 }

 const textNumToDigit = (numToConvert) => {
    let converted = numToConvert;
    for (const [key, value] of Object.entries(TEXT_NUMS)) {
        const comboNum = value.slice(0, 1) + key + value.slice(value.length-1, value.length);
        converted = converted.replaceAll(value, comboNum);
      }
      return converted;
 };

 export const getSumFirstLastDigit = (text) => {
    const stringArray = text.split('\n');
    const numbersArray = stringArray.map((item) => getFirstAndLastDigit(item));
    const result = numbersArray.reduce((total, currentValue) => total = total + currentValue,0);
    return result;
};