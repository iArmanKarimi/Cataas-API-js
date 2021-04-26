const Cataas = require('..');
const assert = require('assert');
const { describe } = require('mocha');
const { unlinkSync } = require('fs');

describe('Cataas', () => {
    describe('constructor()', () => {
        describe('options.Gif == false by default', () => {
            it('with options = undefined', () => {
                assert(!new Cataas().options.Gif, 'gif == false')
            })
            it('with option = {}', () => {
                assert(!new Cataas({}).options.Gif, 'gif == false')
            })
        })
    })

    describe('encode()', () => {
        describe('path', () => {
            it('with gif', () => {
                const cataas = new Cataas({
                    Gif: true,
                    Text: 'meow',
                })
                const expected = "https://cataas.com/cat/gif/says/meow"
                const actual = cataas
                    .encode()
                    .toString()
                    .toLowerCase()

                assert(actual.startsWith(expected), 'starts with path')
            })

            it('with tag', () => {
                const cataas = new Cataas({
                    Tag: 'cute',
                    Text: 'meow',
                })
                const expected = "https://cataas.com/cat/cute/says/meow"
                const actual = cataas
                    .encode()
                    .toString()
                    .toLowerCase()

                assert(actual.startsWith(expected), 'starts with path')
            })

            it('no tag', () => {
                const cataas = new Cataas({
                    Text: 'meow',
                })
                const expected = "https://cataas.com/cat/says/meow"
                const actual = cataas
                    .encode()
                    .toString()
                    .toLowerCase()

                assert(actual.startsWith(expected), 'starts with path')
            })
        })

        it('queries', () => {
            const cataas = new Cataas({
                Filter: 'mono',
                Width: 100,
                Height: 200,
                Size: 'md',
                Text: '.',
                TextSize: 34,
                TextColor: 'blue',
            })
            const expected = [
                'size=34',
                'type=md',
                'width=100',
                'color=blue',
                'height=200',
                'filter=mono',
            ]
            const actual = cataas
                .encode()
                .searchParams
                .toString()
                .replace('?', '')
                .toLowerCase()
                .split('&')

            assert(expected.every(v => actual.includes(v)))
        })
    })

    it('encodeById(id)', () => {
        const c = new Cataas()
        const r = Math.ceil(Math.random() * 1e8).toString()
        const actual = c.encodeById(r)
        assert(actual.pathname.endsWith(r))
    })

    it('download(path)', async () => {
        const c = new Cataas()
        const path = 'cat.png'
        c.encode()
        await c.download(path)
            .then(assert)
            .catch(assert.ok)

        unlinkSync(path)
    })

    it('getAllTags()', async () => {
        const c = new Cataas()
        c.encode()
        await c.getAllTags()
            .then(tags => assert(tags.length > 0))
            .catch(assert.ok)
    })

    describe('getCats(tags, options)', () => {
        it('with option', async () => {
            var cataas = new Cataas()
            cataas.encode()
            await cataas.getCats(['cute'], { Limit: 5 })
                .then(cats => assert(cats.length == 5))
                .catch(assert.ok)
        })

        it('without option', async () => {
            var cataas = new Cataas()
            cataas.encode()
            await cataas.getCats(['cute'])
                .then(cats => {
                    assert(cats.length > 0)
                    assert(cats.every(cat => cat.tags.length > 0))
                    assert(cats.every(cat => cat.id ? true : false))
                })
                .catch(assert.ok)
        })
    })
})