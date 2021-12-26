# Cataas API

Cat as a service API wrapper for Javascript and Typescript.

> Cat as a service is a REST API to spread peace and love (or not) thanks to cats.

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

### Typescript example

```TS
import Cataas from 'cataas-api';

const cataas = new Cataas()
cataas.encode()
```

#### Tips

+ After setting `Gif: true` in options, `Tag` is ignored

## Reference

[API website](https://cataas.com/)
