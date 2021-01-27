export default class SyntaxError extends Error {
    constructor(message: string) {
        super(`Syntax error: ${message}`);
    }
}