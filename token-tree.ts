export default interface TokenTree {
    formattedContent: string,
    children: {
        [key: number]: TokenTree[]
    }
}