
const getPartsMap = (inputData) => {
    const stringArray = inputData.split('\n');
    const partsMap = stringArray.map(line => line.split(''));
    return partsMap;
}

const isNumeric = (value) => {
    return /^\d+$/.test(value);
};

const isSymbol = (value) => {
    return /[`!@#$%^&*()_\-+=\[\]{};':"\\|,<>/?~ ]/.test(value);
};

const isGear = (value) => {
    return /[*]/.test(value);
};

const hasAdjacentSymbol = (partsMap, row, column) => {
    const columnLength = partsMap[row].length-1;
    const rowLength = partsMap.length-1;
    const n = row-1;
    const s = row+1;
    const e = column+1;
    const w = column -1;
    const adjacents = {
        n: n < 0 ? null : { row: n, column, value: partsMap[n][column] },
        nw: n < 0  || w < 0 ? null : { row: n, column: w, value: partsMap[n][w] },
        ne: n < 0 || e > columnLength ? null : { row: n, column: e, value: partsMap[n][e]},
        e:  e > columnLength ? null : { row, column: e, value: partsMap[row][e]},
        w: w < 0 ? null : { row, column: w, value: partsMap[row][w]},
        s: s > rowLength ? null : { row: s, column, value: partsMap[s][column]},
        sw: w < 0 || s > rowLength ? null : { row: s, column: w, value: partsMap[s][w]},
        se: e > columnLength || s > rowLength ? null : { row: s, column: e, value: partsMap[s][e]},
    };
    const adjacentSymbols = [];
    let hasGear = [];
    Object.entries(adjacents).forEach(([key, value]) => {
        if(value?.value !== null && isSymbol(value?.value)) {
            if (isGear(value?.value)) {
                hasGear.push(value);
            }
            adjacentSymbols.push({key, value});
        }
    });
    return adjacentSymbols.length > 0 ? { row, column, adjacentSymbols, hasGear} : null;
};

const hasNextNum = (partsMap, row, column, nums = []) => {
    const nextColumn = column+1;
    if (nextColumn > partsMap[row].length) {
        return nums;
    }
    const next = partsMap[row][nextColumn];
    if(isNumeric(next)) {
        nums.push({row, nextColumn, value: partsMap[row][nextColumn]});
        return hasNextNum(partsMap, row, nextColumn, nums);
    }
    return nums;
};

const hasPrevNum = (partsMap, row, column, nums = []) => {
    const prevColumn = column-1;
    if (prevColumn > partsMap[row].length) {
        return nums;
    }
    const prev = partsMap[row][prevColumn];
    if(isNumeric(prev)) {
        nums.unshift({row, prevColumn, value: partsMap[row][prevColumn]});
        return hasPrevNum(partsMap, row, prevColumn, nums);
    }
    return nums;
};

const dedupeEngineParts = (engineParts) => {
    const deduped = [];
    engineParts.filter(part => {
        if (deduped.length === 0) {
            deduped.push(part);
            return true;
        }
        const hasValue = deduped.filter((item) => {
            return (item.partNumber === part.partNumber)  && (item.partNumberStart[0] === part.partNumberStart[0])
                && (item.partNumberStart[1] === part.partNumberStart[1]);
        });
        if (hasValue.length > 0) {
            return false;
        }
        deduped.push(part);
        return true;
    });
    return deduped;
};

const getGearRatios = (engineParts) => {
    const gearedParts = engineParts.filter((part) => part.hasGear.length > 0);
    const gears = gearedParts.map((part) => part.hasGear);
    const seenGears = [];
    const validGears = [];
    gears.forEach((currentArr) => {
        const current = currentArr[0];
        if ( seenGears.length === 0 ) {
            seenGears.push(current);
            return;
        }
        const hasSeenGear = seenGears.filter((item) => {
            return (item.row === current.row) && (item.column === current.column);
        });
        if (hasSeenGear.length > 0) {
            validGears.push({ ...current, validParts: []});
            return;
        }
        seenGears.push(current);
        return;
    });
    gearedParts.forEach((part) => {
        validGears.forEach((gear) => {
            console.log('break');
            if(part.hasGear[0].row === gear.row && part.hasGear[0].column === gear.column) {
                gear.validParts.push(Number(part.partNumber));
            }
        });
    });
    const gearRatio = validGears.map((gear) => gear.validParts.reduce((total, current) => total = total*current,1))
        .reduce((total, current) => total = total+current,0);
    return gearRatio;
};

export const getSumEngineParts = (inputData) => {
    const partsMap = getPartsMap(inputData);
    console.log('partsMap', partsMap);
    let row = 0;
    let column = 0;
    const engineParts = [];
    while (row < partsMap.length) {
        while (column < partsMap[0].length-1) {
            const current = partsMap[row][column];
            if (isNumeric(current)) {
                const nextNums = hasNextNum(partsMap, row, column);
                const prevNums = hasPrevNum(partsMap, row, column);
                const numWithAdjacents = hasAdjacentSymbol(partsMap, row, column);
                if (numWithAdjacents) {
                    // We have a symbol! Let's buid the part number
                    // example: partNumber is 8
                    let partNumber = partsMap[row][column];
                    let partNumberStart = [row, column];
                    if (nextNums.length > 0) {
                        // the next three numbers are: 1,3,1
                        const nextPartNum = nextNums.map(num => num.value)
                        .reduce((total, current) => total = total.concat(current),'')
                        partNumber = partNumber.concat(nextPartNum);
                        // part number should now be 8131
                    }
                    if (prevNums.length > 0) {
                        // the previous two numbers were (in this order): 6,2
                        const prevPartNum = prevNums.map(num => num.value)
                        .reduce((total, current) => total = total.concat(current),'')
                        partNumber = prevPartNum.concat(partNumber);
                        // part number should now be 628131
                        partNumberStart = [prevNums[0].row, prevNums[0].prevColumn];
                    }
                    engineParts.push({...numWithAdjacents, nextNums, prevNums, partNumber, partNumberStart});
                }
            }
            column+=1;
        }
        row+=1;
        column = 0
    }
    const dedupedEngineParts = dedupeEngineParts(engineParts);
    const gearRatios = getGearRatios(dedupedEngineParts);
    const sumPartNumbers = dedupedEngineParts.map(part => Number(part.partNumber)).reduce((total, current) => total = total + current, 0);
    return { gearRatios, sumPartNumbers };
};