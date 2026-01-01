<p align="center">
    <img src="https://img.shields.io/npm/v/cataas-api?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/github/license/iArmanKarimi/Cataas-API-js?style=flat-square" alt="license" />
</p>

# Cataas API

Cat as a Service API wrapper for JavaScript and TypeScript.

> Cat as a Service is a REST API to spread peace and love (or not) thanks to cats.

## Features

- Simple API for fetching cat images and GIFs
- Download images directly
- Filter by tags, apply effects, and customize text
- TypeScript support
- Edge case and error handling

## Install

```bash
npm install --save cataas-api
```

> **Tip:** If you only need the URL encoder, see the [url-encoder branch](https://github.com/iArmanKarimi/Cataas-API-js/tree/url-encoder).

## Usage Examples

### Constructor

```js
const Cataas = require("cataas-api");
const cataas = new Cataas();
const gif = {
	Gif: true,
	Size: "md",
	Text: "hey dude",
	Filter: "paint",
	TextSize: 35,
	TextColor: "LightBlue",
};
const resized = {
	Width: 300,
	Height: 200,
};
cataas.options = gif;
cataas.options = resized;
```

### encode()

```js
const encodedUrl = cataas.encode();
```

### encodeById(id)

```js
const encodedUrl = cataas.encodeById("[ID]");
```

### async get()

```js
cataas.encode();
cataas
	.get()
	.then((readable) => {
		const stream = new fs.createWriteStream("cat.png");
		readable.pipe(stream);
	})
	.catch((e) => console.error(e));
```

### async download(path)

```js
cataas.encode();
cataas
	.download("cat.png")
	.then((successful) => {
		if (successful) {
			console.log("Downloaded file successfully");
		}
	})
	.catch((e) => console.error(e));
```

### async getAllTags()

```js
cataas.encode();
cataas
	.getAllTags()
	.then((tags) => {
		console.log("Tags length:", tags.length);
	})
	.catch((e) => console.error(e));
```

### async getCats(tags, options)

```js
cataas.encode();
cataas
	.getCats(["cute"])
	.then((cats) => console.log("Results length:", cats.length))
	.catch((e) => console.error(e));
```

### TypeScript Example

```ts
import Cataas from "cataas-api";

const cataas = new Cataas();
cataas.encode();
cataas
	.getCats(["cute"], { Limit: 5 })
	.then((cats) => {
		cats.forEach((cat) => {
			console.log(`${cat.id}: ${cat.tags}`);
		});
	})
	.catch((e) => console.error(e));
```

## API Reference

### Constructor

`new Cataas(options?)`

**options** (object):

- Gif: boolean
- Tag: string
- Text: string
- Width: number
- Height: number
- TextSize: number
- TextColor: string
- Size: "or" | "sq" | "md" | "sm"
- Filter: "pixel" | "paint" | "mono" | "blur" | "sepia" | "negative"

### Methods

#### encode()

Returns the encoded URL based on current options.

#### encodeById(id)

Returns the encoded URL for a specific cat image ID.

#### get()

Returns a readable stream for the image or GIF.

#### download(path)

Downloads the image to the specified path.

#### getAllTags()

Returns an array of available tags.

#### getCats(tags, options?)

Returns an array of cat objects filtered by tags and options.

## Tips

- After setting `Gif: true` in options, `Tag` is ignored
- Always call `encode()` or `encodeById()` before `get()` or `download()`

## Reference

[API website](https://cataas.com/)

## License

[MIT](https://github.com/iArmanKarimi/Cataas-API-js/blob/main/LICENSE)
