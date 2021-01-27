import RawTokenTree from "./raw-token-tree";
import SyntaxError from "./syntax-error";

/**
 * Break the template to into a token tree.
 * Equations in brackets are separated from the main equation and replaced with placeholders.
 * 
 * @param input The input string to be broken into a token tree
 */
export default function tokenize(input: string): RawTokenTree {
    // The token tree being parsed
    let tree: RawTokenTree = {
        formattedContent: input,
        children: {}
    };

    // Replace parenthesis with tokens
    let startFromIndex = 0;
    while (tree.formattedContent.indexOf('(', startFromIndex) != -1) { // While there is an open bracket in the formated string.
        // Get the indexes of the opening and closing brackets.
        let bracketOpenIndex = tree.formattedContent.indexOf('(', startFromIndex);
        let bracketCloseIndex = tree.formattedContent.indexOf(')', startFromIndex + 1);
        if (bracketCloseIndex == -1) throw new SyntaxError('No corresponding closing bracket was found.');

        // Check if there is an open bracket inbetween and start searching from there next time.
        let innerBracketOpenIndex = tree.formattedContent.indexOf('(', bracketOpenIndex + 1);
        if (innerBracketOpenIndex < bracketCloseIndex && innerBracketOpenIndex != -1) {
            startFromIndex = innerBracketOpenIndex;
            continue;
        }

        // Get the parenthesis content and generate a token.
        let contentStart = bracketOpenIndex + 1;
        let contentEnd = bracketCloseIndex;
        let content = tree.formattedContent.slice(contentStart, contentEnd);
        let lastToken = Object.keys(tree.children).map(key => Number(key)).sort().pop();
        let token = lastToken != null ? lastToken + 1 : 0;

        // Replace the contents of the parenthesis with a token and add to child array.
        tree.children[token] = content;
        let splitFormattedContent = tree.formattedContent.split('');
        splitFormattedContent.splice(bracketOpenIndex, (bracketCloseIndex - bracketOpenIndex) + 1, `$${token}`);
        tree.formattedContent = splitFormattedContent.join('');

        // Restart the search
        startFromIndex = 0;
    }

    return tree;
}