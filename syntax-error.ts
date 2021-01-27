export default class SyntaxError extends Error {
    constructor(index: number, message: string) {
        super(`Syntax error at ${index}. ${message}`);
    }
}