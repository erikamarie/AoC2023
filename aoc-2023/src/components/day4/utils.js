
const getCardData = (inputData) => {
    const cardsStrings = inputData.split('\n');
    const cards = [];
    cardsStrings.forEach((dirtyCard, index) => {
        const card = dirtyCard.substring(dirtyCard.indexOf(":") + 1);
        const cardData = {
            cardNumber: index + 1,
            winners: [],
            picked: [],
            copies: 0,
            winnings: [],
        };
        const [ dirtyWinners, dirtyPicked ] = card.split('|');
        const winnersStrings = dirtyWinners.trim().split(/\s+/);
        const pickedStrings = dirtyPicked.trim().split(/\s+/);
        const winners = winnersStrings.map(win => Number(win));
        const picked = pickedStrings.map(pick => Number(pick));
        const winnings = picked.filter(pick => winners.includes(pick));
        cardData.winners = winners;
        cardData.picked = picked;
        cardData.winnings = winnings;
        cards.push(cardData);
    });
    return cards;
}

const getWinningPicksPoints = (cards) => {
    return cards.map((card) => {
        const { winnings } = card;
        let points = 0;
        if(winnings.length === 1){
            points = 1;
        }
        if(winnings.length >= 1){
            points = Math.pow(2, winnings.length-1);
        }
        return { winnings, points };
    });
};

const getWinningSums = (cards) => {
    const  cardWins = getWinningPicksPoints(cards);
    const  cardPoints = cardWins.map((card) => card.points);
    const winningPoints = cardPoints.reduce((total, current) => total = total+current,0);
    return winningPoints;
};

const getTotalCards = (cards) => {
    cards.forEach((card, i) => {
        const { winnings, copies } = card;
        let nextUpdate = 1;
        while(nextUpdate <= winnings.length) {
            cards[i + nextUpdate].copies += (1 + copies);
            nextUpdate +=1;
        }
    });
    const numCards = cards.length;
    const numCopies = cards.map(card => card.copies).reduce((total, current) => total = total + current, 0);
    return numCards + numCopies;
};

export const getAnswers = (inputData) => {
    const cards = getCardData(inputData);
    const part1 = getWinningSums(cards);
    const part2 = getTotalCards(cards);
    return { part1, part2 };
}