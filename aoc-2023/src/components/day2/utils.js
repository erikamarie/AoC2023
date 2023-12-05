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

export const getSumOfValidGameNumbersWithSumPower = (gameData, maxValues) => {
    const games = parseGameData(gameData);
    const validGames = getValidGames(games, maxValues);
    const sumPowers = getSumProps(validGames, 'power');
    const allSumPowers = getSumProps(games, 'power');
    const sumGames = getSumProps(validGames, 'gameNumber');
    return { sumGames, sumPowers, allSumPowers };
};