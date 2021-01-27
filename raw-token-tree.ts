export default interface RawTokenTree {
    formattedContent: string,
    children: {
        [key: number]: RawTokenTree[]
    }
}