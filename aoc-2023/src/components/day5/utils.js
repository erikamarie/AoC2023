// take the data and turn it into json to iterate
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
                lineArray = getSeedsWithInserts(lineArray);
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

// helper function for part 2, to add the extra seeds
const getSeedsWithInserts = (lineArray) => {
    const tempLine = [];
    console.log('lineArray:::::', lineArray.length);
    for( let i = 0; i <= lineArray.length -2; i+=2) {
        tempLine.push(lineArray[i]);
        let numInserts = lineArray[i+1];
        for ( let j = 1; j < numInserts; j++) {
            const nextNum = lineArray[i] + j;
            try {
                tempLine.push(nextNum);
            }catch(e) {
                console.error('ERRORRRRRR:::::', e);
            }
        }
    }
    console.log('TEMPLINE', tempLine);
    return tempLine;
};

// helper function to find the min and max values in an array of values that the source value is between or greater than
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

// our recursive function to keep mapping source values until there are no more maps
// has lots of consts for debuggin lulz
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

// take in data that has seeds and mappings
// get the mapped value
// find the lowest location in the mapped values
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

// TODO: create new function that returns lowest location listed and work backwards to see if we have it

export const getAnswers = (inputData) => {
    // const maps_p1 = parseData(inputData);
    const maps_p2 = parseData(inputData, true);
    // const part1 = getLowestLocation(maps_p1);
    const part2 = getLowestLocation(maps_p2);
    return {part1: 'Uncomment Code', part2};
};