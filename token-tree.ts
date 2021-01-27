export default interface TokenTree {
    parsedContent: string[],
    formattedContent: string,
    children: {
        [key: number]: TokenTree[]
    }
}