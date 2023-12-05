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
            return;
        }
        const game = dirtyGame.substring(dirtyGame.indexOf(":") + 1);
        const gameData = { gameNumber: index + 1, rounds: [], minColors: {}, power: 0 };
        const rounds = game.split(';');
        rounds.forEach ((round) => {
            const roundData = {};
            const counts = round.trim().split(',').map(item => item.trim());
            counts.forEach(count => {
                const [countValue, color] = count.split(' ').filter(Boolean);
                const colorName = color.toLowerCase();
                const colorValue = parseInt(countValue, 10);
                roundData[colorName] = colorValue;
                // Part 2 : Get minimum number of each color per game
                if (!gameData.minColors[colorName] ||
                    (gameData.minColors[colorName] && (gameData.minColors[colorName] < colorValue))) {
                    gameData.minColors[colorName] = colorValue;
                }
            });
            gameData.rounds.push(roundData);
        }); 
        gameData.power = Object.values(gameData.minColors).reduce((total, currentValue) => total * currentValue, 1);
        result.push(gameData);
    });
    return result;
}

const getValidGames = (games, maxValues) => {
    const { red: maxRed, blue: maxBlue, green: maxGreen } = maxValues;
    const validGames = games.filter((game) => {
        const { rounds } = game;
        let validRound = true;
        for (const { red=0, green=0, blue=0 } of rounds) {
            validRound = !(red > maxRed || green > maxGreen || blue > maxBlue);
            if(!validRound) {
                break;
            }
        }
        return validRound ? game : null;
    });
    return validGames.length > 0 ? validGames : [];
}

const getSumProps = (values, sumProp) => {
    const mappedValues = values.map(value => value[sumProp]);
    const sumValues = (mappedValues || 0).reduce((total, currentValue) => total = total + currentValue,0);
    return sumValues;
}

const getSumOfValidGameNumbersWithSumPower = (gameData, maxValues) => {
    const games = parseGameData(gameData);
    const validGames = getValidGames(games, maxValues);
    const sumPowers = getSumProps(validGames, 'power');
    const allSumPowers = getSumProps(games, 'power');
    const sumGames = getSumProps(validGames, 'gameNumber');
    return { sumGames, sumPowers, allSumPowers };
};

const isNumValid = (numToValidate) => (numToValidate !== 0) && (numToValidate && numToValidate > 0);


export {
    getSumFirstLastDigit,
    getSumOfValidGameNumbersWithSumPower,
    isNumValid,
};