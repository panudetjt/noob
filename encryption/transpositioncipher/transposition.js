function split (string, rows, columns) {
    if (typeof rows === 'undefined') return string.split('')
    if (typeof columns === 'undefined') columns = 1
    if (string.length > rows*columns) throw new Error('The size of array too low')
    const splitedString = string.split('')
    let result = []
    let temp = []
    for (let i = 0; i < rows*columns; i++) {
        if (splitedString[i] === undefined) {
            temp.push("_")
        } else {
            temp.push(splitedString[i])
        }
        if ((i % columns) === columns-1) {
            result.push(temp)
            temp = []
        }
    }
    return result
}
module.exports.split = split
function rowsRotate(original, rotate) {
    if (original.length < 2) return original
    return original.map((x, i) => original[rotate[i]-1])
}
module.exports.rowsRotate = rowsRotate
function columnsRotate(original, rotate) {
    if (original[0].length < 2) return original
    return original.map((x, i) => x.map((y, j) => x[rotate[j]-1]))
}
module.exports.columnsRotate = columnsRotate
function encrypt (string, rows, columns) {
    let rowsRotated = rowsRotate(split(string, rows.length, columns.length), rows)
    return columnsRotate(rowsRotated, columns).map(x => x.join('')).join('')
}
module.exports.encrypt = encrypt
function deColumnsRotate(original, rotate) {
    if (original[0].length < 2 || original[0] === undefined) return original
    return original.map(function (x) {
        let result = Array(x.length)
        for (let i = 0; i < x.length; i++) {
            result[rotate[i]-1] = x[i]
        }
        return result
    })
}
module.exports.deColumnsRotate = deColumnsRotate
function deRowsRotate (original, rotate) {
    if (original.length < 2) return original
    let result = Array(original.length)
    for (let i = 0; i < original.length; i++) {
        result[rotate[i]-1] = original[i]
    }
    return result
}
module.exports.deRowsRotate = deRowsRotate
function decrypt (string, rows, columns) {
    let deColumnsRotated = deColumnsRotate(split(string, rows.length, columns.length), columns)
    return deRowsRotate(deColumnsRotated, rows).map(x => x.join('')).join('')

}
module.exports.decrypt = decrypt