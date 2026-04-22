type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
    const results: WinningCombinationsResult = [];
    const len = lines.length;
    
    let i = 0;
    while (i <= len - 3) {
        const startSymbol = lines[i];

        if (startSymbol > 9) {
            i++;
            continue;
        }

        let activeSymbol = startSymbol;
        let sequenceLength = 1;
        let lastNonWildIndex = (startSymbol === 0) ? -1 : i;

        // Expand sequence
        for (let j = i + 1; j < len; j++) {
            const nextSymbol = lines[j];

            if (nextSymbol > 9 || !(nextSymbol === 0 || activeSymbol === 0 || nextSymbol === activeSymbol)) {
                break;
            }

            if (activeSymbol === 0 && nextSymbol !== 0) {
                activeSymbol = nextSymbol;
            }
            
            if (nextSymbol !== 0) {
                lastNonWildIndex = j;
            }

            sequenceLength++;
        }

        if (sequenceLength >= 3) {
            // "Weird case" If suggested skipping it if it doesn't contain a non-zero.
            const isAllWilds = (lastNonWildIndex === -1);
            const isValid = !(results.length > 0 && isAllWilds);

            if (isValid) {
                // Generate the sequence array only when we are sure we're saving it
                const sequence: number[] = new Array(sequenceLength);
                for (let k = 0; k < sequenceLength; k++) {
                    sequence[k] = i + k;
                }
                
                results.push([activeSymbol, sequence]);

                if (!isAllWilds)
                    i = lastNonWildIndex; 
                else
                    i += sequenceLength - 1;
            }
        }
        
        i++;
    }

    return results;
}
export const WinningCombinations = { call };