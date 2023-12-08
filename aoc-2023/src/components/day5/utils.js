const parseData = (inputData, withRange = false) => {
    const lines = inputData.split('\n');
    const maps = {};
    let mapName = '';
    lines.forEach((line, i) => {
        let tempLine = line;
        if (tempLine.includes(':')) {
            mapName = tempLine.substring(0, tempLine.indexOf(":"));
            if (mapName === 'seeds') {
                maps[mapName] = [];
                tempLine = line.substring(line.indexOf(":") + 1);
            } else {
                const splitName = mapName.split('-');
                mapName = splitName[0];
                // strip map off the end
                const cleanTo = splitName[2].substring(0, splitName[2].indexOf(" "));
                maps[mapName] = {
                    from: splitName[0],
                    to: cleanTo,
                    values: {}
                };
                return;
            }
        }
        let lineArray = tempLine !== '' ? tempLine.trim().split(/\s+/).map(num => Number(num)) : [];
        if(lineArray.length === 0){
            return;
        }
        if (mapName === 'seeds') {
            if (withRange) {
                // TODO: Rename this templine, already declared above
                const tempLine = [];
                console.log('lineArray:::::', lineArray.length);
                for( let i = 0; i <= lineArray.length -2; i+=2) {
                    tempLine.push(lineArray[i]);
                    // console.log('WITH RANGE I',i);
                    let numInserts = lineArray[i+1];
                    for ( let j = 1; j < numInserts; j++) {
                        const nextNum = lineArray[i] + j;
                        // console.log('WITH RANGE J',j);
                        tempLine.push(nextNum);
                    }
                }
                console.log('TEMPLINE', tempLine);
                lineArray = tempLine;
            }
            maps[mapName] = lineArray;
        } else if (lineArray.length === 3) {
            const data = {
                sourceStart: lineArray[1],
                destRange: lineArray[0],
                rangeLength: lineArray[2],
            };
            maps[mapName].values[data.sourceStart] = data;
        }
        return;
    });
    return maps;
}

const findNumberRange = (rangeStarts, source) => {
    let range = [];
    const found = rangeStarts.findIndex((num, index, arr) => {
        return source >= num && source <= arr[index + 1];
    });
    if(found >= 0) {
        const filtered = rangeStarts.filter((num, index, arr) => {
            return source >= num && source <= arr[index + 1];
        });
        range = filtered.slice(0,2);
    }
    return range;
};


const getMapToValue = (source, map, maps) => {
    if(!map) {
        return source;
    }
    const {to, values} = map;
    if (values[source]) {
        return maps[to] ? getMapToValue(values[source].destRange, maps[to], maps) : values[source].destRange;
    } else {
        const rangeStarts = Object.keys(values).map(start=>Number(start));
        const firstRangeStart = rangeStarts[0];
        const lastRangeStart = rangeStarts[rangeStarts.length-1];
        const lastRange = values[lastRangeStart].rangeLength;
        const lastRangeMax = lastRangeStart + (lastRange-1);
        // if it's outside the bounds of ranges, it maps to the same number
        if(source < firstRangeStart || source > lastRangeMax) {
            return maps[to] ? getMapToValue(source, maps[to], maps) : source;
        }
        let minRangeStart = lastRangeStart;
        if(source < lastRangeStart) {
            const [min, max] = findNumberRange(rangeStarts, source);
            minRangeStart = min;
        }
        const minRange = values[minRangeStart].rangeLength;
        const minRangeMax = minRangeStart + (minRange-1);
        // if it's outside the bounds of inner ranges, it maps to the same number
        if(source > minRangeMax){
            return maps[to] ? getMapToValue(source, maps[to], maps) : source;
        }
        // otherwise convert the value to the map
        const diffFromStart =  source - minRangeStart;
        const modifiedSource = values[minRangeStart].destRange + diffFromStart;
        return maps[to] ? getMapToValue(modifiedSource, maps[to], maps) : modifiedSource;
    }
}

const getLowestLocation = (maps) => {
    const seeds = maps['seeds'];
    let lowestLocation = null;
    seeds.forEach((seed) => {
        const currFrom = 'seed';
        const firstMap = maps[currFrom];
        const firstNum = seed;
        const currLocation = getMapToValue(firstNum, firstMap, maps);
        if((lowestLocation === null) || (currLocation < lowestLocation)) {
            lowestLocation = currLocation;
        }
    });
    return lowestLocation
};

export const getAnswers = (inputData) => {
    // const maps_p1 = parseData(inputData);
    const maps_p2 = parseData(inputData, true);
    // const part1 = getLowestLocation(maps_p1);
    const part2 = getLowestLocation(maps_p2);
    return {part1: 'Uncomment Code', part2};
};