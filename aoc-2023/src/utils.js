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
        if(key === '6'){
            console.log('comboNum', comboNum);
        }
        converted = converted.replaceAll(value, comboNum);
      }
      return converted;
 };

 const getSumFirstLastDigit = (text) => {
    const stringArray = text.split('\n');
    const numbersArray = stringArray.map((item) => getFirstAndLastDigit(item));
    const result = numbersArray.reduce((total, currentValue) => total = total + currentValue,0);
    return result;
};

const parseGameData = (inputData) => {
    const games = inputData.split('\n');
    const result = [];

    games.forEach((dirtyGame, index) => {
        if (dirtyGame.trim() === '') {
            return; // Skip empty entries
        }
        const game = dirtyGame.substring(dirtyGame.indexOf(":") + 1);

        const gameData = { gameNumber: index + 1, colors: {} };

        const counts = game.split(';')[0].trim().split(',').map(item => item.trim());
        const colorData = {};

        counts.forEach(count => {
            const [countValue, color] = count.split(' ').filter(Boolean);
            colorData[color.toLowerCase()] = parseInt(countValue, 10);
        });

        gameData.colors = colorData;

        result.push(gameData);
    });
    console.log('gameData', result);
    return result;
}

const getMaxValues = (games) => {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    // TODO: iterate values and return largest number
    return { maxRed, maxBlue, maxGreen };
};

const getValidGames = (games, maxValues) => {
    const validGames = [];
    const { maxRed, maxBlue, maxGreen } = maxValues;
    // TODO: update validGames with values less then or equal to max value
    return validGames.length > 0 ? validGames : 0;
}

const getSumOfValidGameNumbers = (gameData) => {
    console.log('gameData', gameData);
    const games = parseGameData(gameData);
    const maxValues = getMaxValues(games);
    const validGames = getValidGames(games, maxValues);
    const sumValidGames = (validGames || [0]).reduce((total, currentValue) => total = total + currentValue,0);
    console.log('sumValidGames', sumValidGames);
    return sumValidGames;
};

export {
    getSumFirstLastDigit,
    getSumOfValidGameNumbers,
};