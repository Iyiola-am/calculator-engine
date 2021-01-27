import operators from './operators';

/**
 * Breaks an input string down into entities that can be used by a calculator function.
 * The meat grinder.
 * @param input pretokenized input
 */
export default function parse(input: string): string[] {
    let formattedContent = [input.trim()];

    // Iterate over each operator
    operators.forEach(operator => {
        // Clone formatted content and set as empty
        let clonedFormattedContent = Array.from(formattedContent);
        formattedContent = [];

        clonedFormattedContent.forEach(block => {
            // Split each block based on each operator
            let chunks = block.split(operator);

            // Push each chunk with the operator
            chunks.forEach((chunk, index) => {
                if (index > 0) formattedContent.push(operator);
                formattedContent.push(chunk);
            });
        });
    });

    return formattedContent.map(value => value.trim()).filter(value => value.length != 0);
}