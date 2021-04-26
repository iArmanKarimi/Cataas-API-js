import { IncomingMessage } from "http"

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

interface GetCatsOptions {
    Skip?: number
    Limit?: number
}

interface CatByTag {
    id: string
    tags: string
    created_at: string
}

declare class Cataas {
    public options: Options

    constructor(options?: Options)

    public encode(): URL
    public encodeById(id: string): URL
    public get(): Promise<IncomingMessage>
    public download(path: string): Promise<Boolean>
    public getAllTags(): Promise<string[]>
    public getCats(tags: string[], options?: GetCatsOptions): Promise<CatByTag[]>
}

export = Cataas
