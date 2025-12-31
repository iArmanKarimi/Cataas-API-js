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

	/**
	 * Encodes the base url with current options.
	 * @returns {URL} Encoded URL object
	 * @example
	 * const cataas = new Cataas({ Gif: true, Tag: 'cute' });
	 * const encodedUrl = cataas.encode();
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

	/**
	 * Encodes the base URL with the given cat image ID.
	 * @param {string} id - ID of the cat image
	 * @returns {URL} Encoded URL object
	 * @throws {Error} If id is undefined
	 * @example
	 * const cataas = new Cataas();
	 * const url = cataas.encodeById('abc123');
	 */
	encodeById(id) {
		if (!id) throw new Error('Argument undefined')
		url.pathname = paths.cat + "/" + id
		return url
	}

	/**
	 * Sends a GET request to the encoded URL and returns the response stream.
	 * @returns {Promise<IncomingMessage>} Response stream
	 * @throws {Error} If request fails or status code is not 200
	 * @example
	 * const cataas = new Cataas();
	 * cataas.encode();
	 * cataas.get().then(stream => {
	 *   const file = fs.createWriteStream('cat.png');
	 *   stream.pipe(file);
	 * });
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

	/**
	 * Downloads the image from the encoded URL and saves it to the specified path.
	 * @param {string} path - Path to save the image file
	 * @returns {Promise<boolean>} True if successful
	 * @throws {Error} If path is undefined or request fails
	 * @example
	 * const cataas = new Cataas();
	 * cataas.encode();
	 * cataas.download('cat.png').then(success => {
	 *   if (success) console.log('Downloaded file successfully');
	 * });
	 */
	async download(path) {
		return new Promise((resolve, reject) => {
			if (!path) throw new Error('Argument undefined')
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

	/**
	 * Retrieves all available tags from the Cataas API.
	 * @returns {Promise<string[]>} Array of tag strings
	 * @throws {Error} If request fails
	 * @example
	 * const cataas = new Cataas();
	 * cataas.getAllTags().then(tags => {
	 *   console.log('Tags:', tags);
	 * });
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

	/**
	 * Retrieves cats that include the given tag(s).
	 * @param {string[]} tags - Array of tags to filter cats
	 * @param {{Skip?: number, Limit?: number}} [options] - Options for pagination
	 * @returns {Promise<Object[]>} Array of cat objects
	 * @throws {Error} If tags are undefined or request fails
	 * @example
	 * const cataas = new Cataas();
	 * cataas.getCats(['cute'], { Limit: 10 }).then(cats => {
	 *   console.log('Cats:', cats);
	 * });
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
