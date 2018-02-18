const assert = require("assert")
const transposition = require("./transposition")
describe("transporation cipher", () => {
    describe("split", () => {
        it('should error if the size less than string length', () => {
            assert.throws(()=>{transposition.split('ab', 1)}, Error)
        })
        it("should split string into array", () => {
            assert.deepStrictEqual(
                transposition.split("Attack at dawn"),
                ['A', 't', 't', 'a', 'c', 'k', ' ', 'a', 't', ' ', 'd', 'a', 'w', 'n'])
        })
        it('default columns should be 1 if not given columns', () => {
            assert.deepStrictEqual(
                transposition.split('ab', 2),
                [['a'], ['b']]
            )
        })
        it('should split string into array from given rows, columns', () => {
            assert.deepStrictEqual(
                transposition.split("Attack at dawn", 4, 4),
                [
                    ['A', 't', 't', 'a'],
                    ['c', 'k', ' ', 'a'],
                    ['t', ' ', 'd', 'a'],
                    ['w', 'n', '_', '_']
                ]
            )
        })
    })
    describe("rotate row", () => {
        it("should do nothing if have less than two rows", () => {
            assert.deepStrictEqual(transposition.rowsRotate(transposition.split("a"), 1), ['a'])
        })
        it("should rotate row follow key array", () => {
            assert.deepStrictEqual(transposition.rowsRotate(
                transposition.split("ab", 2), [2,1]
            ), [['b'], ['a']])
            assert.deepStrictEqual(
                transposition.rowsRotate(transposition.split("Attack at dawn", 4, 4), [3, 4, 2, 1]),
                [
                    ['t', ' ', 'd', 'a'],
                    ['w', 'n', '_', '_'],
                    ['c', 'k', ' ', 'a'],
                    ['A', 't', 't', 'a']
                ]

            )
        })
    })
    describe('rotate columns', () => {
        it('should return orginal if length less than 2', () => {
            assert.deepStrictEqual(transposition.columnsRotate(
                transposition.split("ab", 2), [2, 1]
            ), [['a'], ['b']])
        })
        it('should rotate columns from given key', () => {
            assert.deepStrictEqual(transposition.columnsRotate(
                transposition.split("abcd", 2, 2), [2, 1]
            ), [['b', 'a'], ['d', 'c']])
            assert.deepStrictEqual(
                transposition.columnsRotate(
                    transposition.split("Attack at dawn", 4, 4),
                    [3, 2, 4, 1]
                ),
                [
                    ['t', 't', 'a', 'A'],
                    [' ', 'k', 'a', 'c'],
                    ['d', ' ', 'a', 't'],
                    ['_', 'n', '_', 'w']
                ]
            )
        })
    })
    describe('encrypt', () => {
        it('should return transposition cipher', () => {
            assert.strictEqual(
                transposition.encrypt('abcd', [2, 1], [2, 1]),
                'dcba'
            )
            assert.strictEqual(
                transposition.encrypt('abcdef', [2, 1], [2, 3, 1]),
                'efdbca'
            )
        })
        it('should work with "Attack at dawn" word', () => {
            assert.strictEqual(
                transposition.encrypt('Attack at dawn', [3, 2, 1, 4], [4, 2, 1, 3]),
                'a tdakc atAt_nw_'
            )
        })
    })
    describe('derotate columns', () => {
        it('should return orginal if length less than 2', () => {
            assert.deepStrictEqual(transposition.deColumnsRotate(
                transposition.split("ab", 2), [2, 1]
            ), [['a'], ['b']])
        })
        it('should derotate columns from key', () => {
            assert.deepStrictEqual(
                transposition.deColumnsRotate(
                    transposition.split('dcba', 2, 2), [2, 1]
                ),
                [['c', 'd'], ['a', 'b']]
            )
            assert.deepStrictEqual(
                transposition.deColumnsRotate(
                    transposition.split('efdbca', 2, 3), [2, 3, 1]
                ),
                [['d', 'e', 'f'], ['a', 'b', 'c']]
            )
        })
    })
    describe('derotate rows', () => {
        it('should return orginal if length less than 2', () => {
            assert.deepStrictEqual(transposition.deRowsRotate(
                transposition.split('a', 1), [2, 1]
            ), [['a']])
        })
        it('should derotate rows from key', () => {
            assert.deepStrictEqual(
                transposition.deRowsRotate(
                    transposition.split('cdab', 2, 2), [2, 1]
                ),
                [['a', 'b'], ['c', 'd']]
            )
        })
    })
    describe('decrypt', () => {
        it('should return plaintext from transposition cipher', () => {
            assert.strictEqual(
                transposition.decrypt('dcba', [2, 1], [2, 1]),
                'abcd'
            )
        })
        it('should work with "a tdakc atAt_nw_" cipher', () => {
            assert.strictEqual(
                transposition.decrypt('a tdakc atAt_nw_', [3, 2, 1, 4], [4, 2, 1, 3]),
                'Attack at dawn__'
            )
        })
    })
})