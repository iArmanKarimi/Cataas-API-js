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
		if (!id) throw new Error('Id required.')
		url.pathname = paths.cat + "/" + id
		return url
	}
}

module.exports = Cataas
