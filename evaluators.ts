let evaluators: {[key: string]: Function} = {
    '/': (a: number, b: number) => (a / b),
    '*': (a: number, b: number) => (a * b),
    '+': (a: number, b: number) => (a + b),
    '-': (a: number, b: number) => (a - b),
};
export default evaluators;