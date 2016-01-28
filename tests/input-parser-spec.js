const expect = require('expect');

const parserFunc = require('../bin/input-parser');
const helpText = require('../bin/string-collection').helpText;

describe('input parser function', () => {
    it('is a function', () => {
        expect(parserFunc).toBeA('function');
    });

    it('returns helptext if passed empty array', () => {
        const actual = parserFunc([]);
        const expected = {helpText};

        expect(actual).toEqual(expected);
    });

    it('returns helptext if passed --help', () => {
        const actual = parserFunc(['--help']);
        const expected = {helpText};

        expect(actual).toEqual(expected);
    });

    it('--help returns helptext no matter other input', () => {
        const actual = parserFunc(['--help', 'something-else']);
        const actual2 = parserFunc(['--help', 'something-else']);
        const actual3 = parserFunc(['something-else','something-more', '--help']);
        const actual4 = parserFunc(['something-else','something-more', '--help', 'one-mote-thing', 'blabla-bla']);
        const expected = {helpText};

        expect(actual).toEqual(expected);
        expect(actual2).toEqual(expected);
        expect(actual3).toEqual(expected);
        expect(actual4).toEqual(expected);
    });

    it('returns an object with correst fileName property and option: false if no flag is sent', () => {
        const fileName = 'test-compname';
        const actual = parserFunc([fileName]);
        const expected = {
            fileName,
            option: false
        };

        expect(actual).toEqual(expected);
    });

    it('sets option to component if -c flag is set', () => {
        const fileName = 'test-compname';
        const actual = parserFunc([fileName, '-c']);
        const expected = {
            fileName,
            option: 'component'
        };

        expect(actual).toEqual(expected);
    });

    it('sets option to test if -t flag is set', () => {
        const fileName = 'test-compname';
        const actual = parserFunc([fileName, '-t']);
        const expected = {
            fileName,
            option: 'test'
        };

        expect(actual).toEqual(expected);
    });

    it('order of file name and flag is not important', () => {
        const fileName = 'test-compname';
        const actual = parserFunc(['-t', fileName]);
        const expected = {
            fileName,
            option: 'test'
        };

        expect(actual).toEqual(expected);
    });
});