# Cataas API

Cat as a service API wrapper for Javascript and Typescript.

> Cat as a service is a REST API to spread peace and love (or not) thanks to cats.

## Install

`npm install --save cataas-api`

##### Tip: If you only the url, refer to [url-encoder](https://github.com/iArmanKarimi/Cataas-API-js/tree/url-encoder) branch.

## Examples

`constructor()`

```JS
var Cataas = require('cataas-api')
var cataas = new Cataas()
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
cataas.options = gif
cataas.options = resized
```

`encode()`

```JS
var encodedUrl = cataas.encode()
```

`encodeById(id)`

```JS
var encodedUrl = cataas.encodeById('[ID]')
```

`async get()`

```JS
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
cataas.encode()
cataas.getAllTags()
    .then(tags => {
        console.log('Tags length:', tags.length)
    })
    .catch(e => console.error(e))
```

`async getCats(tags, options)`

```JS
cataas.encode()
cataas.getCats(['cute'])
    .then(cats => console.log('Results length:', cats.length))
    .catch(e => console.error(e))
```

### Typescript example

```TS
import Cataas from 'cataas-api';

const cataas = new Cataas()
cataas.encode()
cataas.getCats(['cute'], { Limit: 5 })
    .then(cats => {
        cats.forEach(cat => {
            console.log(`${cat.id}: ${cat.tags}`))
        }
    })
    .catch(e => console.error(e))
```

#### Tips

+ After setting `Gif: true` in options, `Tag` is ignored
+ Don't forget to `encode()` | `encodeById` before `get()` | `download()`

## Reference

[API website](https://cataas.com/)
