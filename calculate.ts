import operators from './operators';
import evaluators from './evaluators';
import SyntaxError from './syntax-error';

export default function calculate(input: string[]): string {
    let formattedInput = input;

    // Run the evaluator functions for each operator in succession
    operators.forEach(operator => {
        while (formattedInput.indexOf(operator) != -1) {
            let operatorIndex = formattedInput.indexOf(operator);
            if (operatorIndex - 1 == -1 || operatorIndex + 1 == formattedInput.length) {
                throw new SyntaxError('Operator not properly used.');
            }

            let a = Number(formattedInput[operatorIndex - 1]);
            let b = Number(formattedInput[operatorIndex + 1]);
            formattedInput.splice(operatorIndex - 1, 3, String(evaluators[operator](a, b)));
        }
    });

    // Return the formatted input
    if (formattedInput.length != 1) throw new SyntaxError('Invalid syntax.');
    return formattedInput[0];
}