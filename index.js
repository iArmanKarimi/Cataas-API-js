const fs = require('fs');
const https = require('https');

const url = new URL("https://cataas.com")
const paths = {
	cat: "cat",
	cats: "api/cats",
	allTags: "api/tags",
}

class Cataas {
	/**
	 * @param {{
	 *  Gif: boolean
	 * 	Tag: string
	 * 	Text: string
	 * 	Width: number
	 * 	Height: number
	 * 	TextSize: number
	 * 	TextColor: string
	 * 	Size: "or" | "sq" | "md" | "sm"
	 * 	Filter: "pixel" | "paint" | "mono" | "blur" | "sepia" | "negative"
	 * }} options it is used in requests and url encoding
	 */
	constructor(options) {
		this.options = options ? options : { Gif: false }
	}

	/** Encodes the base url with `this.Options`
	@returns encoded url
	@example
	```
	var cataas = new Cataas()
	var encodedUrl = cataas.encode()
	```
	 */
	encode() {
		url.pathname = paths.cat
		if (this.options.Gif === true) {
			url.pathname += `/gif`
		}
		if (this.options.Tag) {
			url.pathname += `/${this.options.Tag}`
		}
		if (this.options.Text) {
			url.pathname += `/says/${this.options.Text}`
			url.searchParams.set('size', this.options.TextSize)
			if (this.options.TextColor) {
				url.searchParams.set('color', this.options.TextColor)
			}
		}
		if (this.options.Size) {
			url.searchParams.set('type', this.options.Size)
		}
		if (this.options.Filter) {
			url.searchParams.set('filter', this.options.Filter)
		}
		if (this.options.Width) {
			url.searchParams.set('width', this.options.Width)
		}
		if (this.options.Height) {
			url.searchParams.set('height', this.options.Height)
		}
		return url
	}

	/** Encodes the base with the given id
	 * @param {String} id id of cat image
	 * @returns encoded url
	 */
	encodeById(id) {
		url.pathname = paths.cat + "/" + id
		return url
	}

	/** sends get request then returns the response
	@example
	``` 
	var cataas = new Cataas()
	cataas.encode()
	cataas.get()
		.then(readable => {
			const stream = new fs.createWriteStream('cat.png')
			readable.pipe(stream)
		})
		.catch(e => console.error(e))
	```
	 */
	async get() {
		return new Promise((resolve, reject) => {
			https.get(url, async res => {
				if (res.statusCode !== 200) {
					reject(new Error(`Request Failed.\nStatus Code: ${statusCode}`))
				}
				resolve(res)
			}).on('error', reject)
		})
	}

	/** Download image
	@param {String} path path to save image file
	@returns {Boolean} successful
	@example 
	```
	var cataas = new Cataas()
	cataas.encode()
	cataas.download('cat.png')
		.then(successful => {
			if (successful) {
				console.log('Downloaded file successfully')
			}
		})
		.catch(e => console.error(e))
	```	
	 */
	async download(path) {
		return new Promise((resolve, reject) => {
			const file = fs.createWriteStream(path)
			https.get(url, res => {
				if (res.statusCode !== 200) {
					reject(new Error(`Request Failed.\nStatus Code: ${statusCode}`))
				}
				res.pipe(file)
					.on('finish', () => {
						file.close()
						resolve(true)
					})
					.on('error', reject)
			}).on('error', reject)
		})
	}

	/** get all tags
	@example
	var cataas = new Cataas()
	cataas.encode()
	cataas.getAllTags()
		.then(tags => {
			console.log('Tags length:', tags.length)
		})
		.catch(e => console.error(e))
	 */
	async getAllTags() {
		return new Promise((resolve, reject) => {
			url.pathname = paths.allTags
			this.get()
				.then(stream => stream.read())
				.then(buffer => buffer.toString())
				.then(JSON.parse)
				.then(resolve)
				.catch(reject)
		})
	}

	/** get cats which include the given tag(s)
	@param {String[]} tags
	@param {{
		Skip: number
		Limit: number
	}} options get cats options
	@example
	var cataas = new Cataas()
	cataas.encode()
	cataas.getCats(['cute'])
		.then(cats => console.log('Results length:', cats.length))
		.catch(e => console.error(e))
	 */
	async getCats(tags, options) {
		return new Promise((resolve, reject) => {
			if (!tags) throw new Error('Argument undefined')
			if (options) {
				if (options.Skip) {
					url.searchParams.set('skip', options.Skip)
				}
				if (options.Limit) {
					url.searchParams.set('limit', options.Limit)
				}
			}
			url.pathname = paths.cats
			url.searchParams.set('tags', tags.join(','))
			this.get()
				.then(stream => stream.read())
				.then(buffer => buffer.toString())
				.then(JSON.parse)
				.then(resolve)
				.catch(reject)
		})
	}
}

module.exports = Cataas
