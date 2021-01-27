export default interface TokenTree {
    content: string[],
    children: {
        [key: number]: TokenTree[]
    }
}