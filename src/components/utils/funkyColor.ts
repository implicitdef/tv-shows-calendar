const colors = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFC107',
    '#FF9800',
    '#FF5722',
]

const alwaysPositiveModulo = (nb: number, divider: number): number => {
    // http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
    return ((nb % divider) + divider) % divider
}

const hashOfStr = (str: string): number => {
    // http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
    let hash = 0,
        i,
        chr,
        len
    if (str.length === 0) return hash
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return hash
}

// Pick a random color amongst a preselected set of nice colors
// Always returns the same color for a given input
export const pickFunkyColor = (inputStr: string): string => {
    return colors[alwaysPositiveModulo(hashOfStr(inputStr), colors.length)]
}
