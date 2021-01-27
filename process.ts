import tokenize from './tokenize';
import operators from './operators';
import parse from "./parse";
import calculate from "./calculate";

export default function process(input: string): string {
    // Generate the token tree
    let tokenTree = tokenize(input.toLowerCase());


    // Process the token tree children
    while (
        Object.values(tokenTree.children)
        .some(exp => {
            return exp.indexOf('$') != -1 || operators.some(op => exp.indexOf(op) != -1)
        })
    ) {
        for (let token in tokenTree.children) {
            // Skip expressions that have other expressions in them or have already been evaluated
            let expresssion = tokenTree.children[token];
            if (expresssion.indexOf('$') != -1) continue;
            else if (!operators.some(op => expresssion.indexOf(op) != -1)) continue;

            // Parse an expression and set the output
            let parsedExpression = parse(expresssion);
            tokenTree.children[token] = calculate(parsedExpression);

            // Update the expression's value where ever it may exist in the other token children
            for (let otherToken in tokenTree.children) {
                let otherTokenExpression = tokenTree.children[otherToken];
                if (otherTokenExpression.indexOf(`$${token}`) == -1) continue;

                // Update the variable in the other children
                otherTokenExpression = otherTokenExpression.replace(`$${token}`, tokenTree.children[token]);
                tokenTree.children[otherToken] = otherTokenExpression;
            }
        }
    }


    // Process the main expression
    while (/\$\d+/.test(tokenTree.formattedContent)) {
        // Get the token placeholder
        let tokenPlaceholderResult = /\$\d+/.exec(tokenTree.formattedContent) as RegExpExecArray;
        let tokenPlaceholder = tokenPlaceholderResult[0];

        // Get the value in the child tree
        let indexInChildTree = tokenPlaceholder.slice(1);
        let valueInChildTree = tokenTree.children[Number(indexInChildTree)];

        // Replace in main equation
        tokenTree.formattedContent = tokenTree.formattedContent.replace(tokenPlaceholder, valueInChildTree);
    }


    // Calculate the result
    let parsedEquation = parse(tokenTree.formattedContent);
    return calculate(parsedEquation);
}