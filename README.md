# Cataas API

Cat as a service API wrapper for Javascript and Typescript.

> Cat as a service is a REST API to spread peace and love (or not) thanks to cats.

## Examples

`constructor()`

```JS
var gif = {
    Gif: true,
    Size: 'md',
    Text: "hey dude",
    Filter: "paint",
    TextSize: 35,
    TextColor: "LightBlue",
}
var resized = {
    Width: 300,
    Height: 200,
}
var cataas = new Cataas(gif)
cataas.options = resized
```

`encode()`

```JS
var cataas = new Cataas()
var encodedUrl = cataas.encode()
```

`encodeById(id)`

```JS
var cataas = new Cataas()
var encodedUrl = cataas.encodeById('[ID]')
```

`async get()`

```JS
var cataas = new Cataas()
cataas.encode()
cataas.get()
    .then(readable => {
        const stream = new fs.createWriteStream('cat.png')
        readable.pipe(stream)
    })
    .catch(e => console.error(e))
```

`async download(path)`

```JS
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

`async getAllTags()`

```JS
const cataas = new Cataas()
cataas.encode()
cataas.getAllTags()
    .then(tags => {
        console.log('Tags length:', tags.length)
    })
    .catch(e => console.error(e))
```

`async getCats(tags, options)`

```JS
var cataas = new Cataas()
cataas.encode()
cataas.getCats(['cute'])
    .then(cats => console.log('Results length:', cats.length))
    .catch(e => console.error(e))
```

#### Tips:

+ After setting `Gif: true` in options, `Tag` is ignored
+ Don't forget to `encode()` | `encodeById` before `get()` | `download()`
