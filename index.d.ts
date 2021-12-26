type Size =
    | "or"
    | "sq"
    | "md"
    | "sm"

type Filter =
    | "pixel"
    | "paint"
    | "mono"
    | "blur"
    | "sepia"
    | "negative"

interface Options {
    Gif?: boolean
    Tag?: string
    Text?: string
    Width?: number
    Height?: number
    TextSize?: number
    TextColor?: string
    /** 
    + sm : small
    + md : medium
    + sq : square
    + or : original
    */
    Size?: Size
    Filter?: Filter
}

declare class Cataas {
    public options: Options

    constructor(options?: Options)

    public encode(): URL
    public encodeById(id: string): URL
}

export = Cataas
