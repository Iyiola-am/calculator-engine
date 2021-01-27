interface EvalutorFunction {
    (a: number, b: number): number
}

let evaluators: {[key: string]: EvalutorFunction} = {
    '^': (a: number, b: number) => (Math.pow(a, b)),
    'of': (a: number, b: number) => (a / b),
    '/': (a: number, b: number) => (a / b),
    '*': (a: number, b: number) => (a * b),
    '+': (a: number, b: number) => (a + b),
    '-': (a: number, b: number) => (a - b),
};
export default evaluators;