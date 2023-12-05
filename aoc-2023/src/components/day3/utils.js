
const getPartsMap = (inputData) => {
    const stringArray = inputData.split('\n');
    const partsMap = stringArray.map(line => line.split(''));
    return partsMap;
}

export const getSumEngineParts = (inputData) => {
    const partsMap = getPartsMap(inputData);
    console.log('partsMap', partsMap);
    return 32;
};