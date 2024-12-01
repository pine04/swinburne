const { mr1_mgs, mr2_mgs, si1, si2, si3, si4 } = require("./test_cases");
const originalProgram = require("./original");

// Import all 23 mutants and put them in an array.
// Each mutant is a function that takes 3 parameters: input, alphabet, and encode.
const mutantCount = 23;
const mutantList = [];
for (let i = 1; i <= mutantCount; i++) {
    mutantList.push(require(`./mutants/mutant${i}`));
}
// For debugging:
// console.log(
//     `Imported ${mutantList.length} mutants. The correct number should be ${mutantCount}.`
// );

// We need to put the original program in an array because the MR functions expect an array of programs.
const original = [originalProgram];

// Main function.
function main() {
    // Test the original program with each MR.
    console.log("==========Testing original program==========\n");
    const mr1TestOutput = mr1(original, mr1_mgs);
    const mr2TestOutput = mr2(original, mr2_mgs);
    const mr3TestOutput = mr3(original, si1, si2, si3, si4);
    printTestOutput(1, "Permutation of Input String", mr1TestOutput);
    printTestOutput(2, "Self-concatenation", mr2TestOutput);
    printTestOutput(3, "Encode-Decode Symmetry", mr3TestOutput);

    // Evaluate the effectiveness of each MR by running the mutants.
    console.log("==========Measuring MR effectiveness with mutants==========\n");
    const mr1EvaluationOutput = mr1(mutantList, mr1_mgs);
    const mr2EvaluationOutput = mr2(mutantList, mr2_mgs);
    const mr3EvaluationOutput = mr3(mutantList, si1, si2, si3, si4);
    printEvaluationOutput(1, "Permutation of Input String", mr1EvaluationOutput);
    printEvaluationOutput(2, "Self-concatenation", mr2EvaluationOutput);
    printEvaluationOutput(3, "Encode-Decode Symmetry", mr3EvaluationOutput);
}

main();

// Testing MR1.
// This function runs each mutant with each metamorphic group of MR1.
// It returns the number of violations, number of satisfactions, effectiveness ratio, and set of killed mutants.
function mr1(programList, metamorphicGroups) {
    let numViolations = 0;
    let numSatisfactions = 0;
    let faultyPrograms = new Set();

    programList.forEach((program, programIndex) => {
        metamorphicGroups.forEach((mg) => {
            const [si, fi] = mg; // Each metamorphic group consists of a source input and a follow-up input.
            const so = program(si[0], si[1], si[2]);
            const fo = program(fi[0], fi[1], fi[2]);

            if (verify_mr1(so, fo)) {
                numSatisfactions++;
            } else {
                numViolations++;
                faultyPrograms.add(programIndex + 1);
            }
        });
    });

    return {
        numViolations,
        numSatisfactions,
        effectivenessRatio: numViolations / (numViolations + numSatisfactions),
        faultyPrograms,
    };

    // Returns true if MR1 is satisfied, otherwise false.
    // This MR is satisfied when the follow-up output is a permutation of the source output.
    function verify_mr1(so, fo) {
        if (typeof so !== "string" || typeof fo !== "string") {
            return false; // Both so and fo must be strings.
        }

        if (so.length !== fo.length) {
            return false; // Cannot be permutations if they are not the same length.
        }

        // Create a sorted list of characters that appear in so. Keep duplicates.
        const soCharacters = [];
        for (let i = 0; i < so.length; i++) {
            soCharacters.push(so.charCodeAt(i));
        }
        soCharacters.sort((a, b) => a - b);

        // Create a sorted list of characters that appear in fo. Keep duplicates.
        const foCharacters = [];
        for (let i = 0; i < fo.length; i++) {
            foCharacters.push(fo.charCodeAt(i));
        }
        foCharacters.sort((a, b) => a - b);

        // If the two lists do not match, so and fo are not permutations.
        for (let i = 0; i < soCharacters; i++) {
            if (soCharacters[i] !== foCharacters[i]) return false;
        }

        // Otherwise, they are permutations.
        return true;
    }
}

// Testing MR2.
// This function runs each mutant with each metamorphic group of MR2.
// It returns the number of violations, number of satisfactions, effectiveness ratio, and set of killed mutants.
function mr2(programList, metamorphicGroups) {
    let numViolations = 0;
    let numSatisfactions = 0;
    let faultyPrograms = new Set();

    programList.forEach((program, programIndex) => {
        metamorphicGroups.forEach((mg) => {
            const [si, fi] = mg; // Each metamorphic group consists of a source input and a follow-up input.
            const so = program(si[0], si[1], si[2]);
            const fo = program(fi[0], fi[1], fi[2]);

            if (verify_mr2(so, fo)) {
                numSatisfactions++;
            } else {
                numViolations++;
                faultyPrograms.add(programIndex + 1);
            }
        });
    });

    return {
        numViolations,
        numSatisfactions,
        effectivenessRatio: numViolations / (numViolations + numSatisfactions),
        faultyPrograms,
    };

    // Returns true if MR2 is satisfied, otherwise false.
    // This MR is satisfied when the follow-up output is a self-concatenation of the source output.
    function verify_mr2(so, fo) {
        if (typeof so !== "string" || typeof fo !== "string") {
            return false; // Both so and fo must be strings.
        }

        const soLength = so.length;
        const foLength = fo.length;

        // By definition, if both so and fo are empty strings, fo is a self-concatenation of so.
        if (soLength === 0 && foLength === 0) return true;

        // If fo is a self-concatenation of so, then fo's length must be divisible by so's length.
        if (foLength % soLength !== 0) return false;

        // Calculate the number of repetitions for so to become fo.
        const repetitions = foLength / soLength;
        // Concatenate so this many times and see if we get fo.
        let str = "";
        for (let i = 0; i < repetitions; i++) {
            str += so;
        }
        // If we don't get fo, MR2 is violated.
        if (str !== fo) return false;

        // Otherwise, it is satisfied.
        return true;
    }
}

// Testing MR3.
// This function runs each mutant with each metamorphic group of MR3, which are formed after executing the provided source inputs.
// It returns the number of violations, number of satisfactions, effectiveness ratio, and set of killed mutants.
function mr3(programList, ...sourceInputs) {
    let numViolations = 0;
    let numSatisfactions = 0;
    let faultyPrograms = new Set();

    programList.forEach((program, programIndex) => {
        sourceInputs.forEach((si) => {
            const so = program(si[0], si[1], si[2]); // Run source input first.

            // If so is false, we cannot run the follow-up test case. fo will be false in this case.
            // Otherwise, run the follow-up test case.
            const fo = so !== false && program(so, si[1], !si[2]);

            // If fo is not false and is the lowercased source input string, the MR is satisfied.
            if (fo !== false && fo === si[0].toLowerCase()) {
                numSatisfactions++;
            } else {
                numViolations++;
                faultyPrograms.add(programIndex + 1);
            }
        });
    });

    return {
        numViolations,
        numSatisfactions,
        effectivenessRatio: numViolations / (numViolations + numSatisfactions),
        faultyPrograms,
    };
}

// Print the testing result of the provided MR in a readable manner.
// The testing result is obtained by running the original program against the MR.
function printTestOutput(mrNumber, mrName, mrOutput) {
    process.stdout.write(`MR${mrNumber} - ${mrName} results: `);
    if (mrOutput.numViolations === 0) {
        console.log("Not violated.");
    } else {
        console.log(`${mrOutput.numViolations} violations`);
    }
    console.log();
}

// Print the evaluation result of the provided MR in a readable manner.
// The evaluation result is obtained by running each mutant against the MR.
function printEvaluationOutput(mrNumber, mrName, mrOutput) {
    console.log(`MR${mrNumber} - ${mrName} results:`);
    console.log(
        `\t${mrOutput.numViolations} violations, ${mrOutput.numSatisfactions} satisfactions. Effectiveness ratio: ${mrOutput.effectivenessRatio}`
    );
    console.log(`\t${mrOutput.faultyPrograms.size} mutants killed: ${[...mrOutput.faultyPrograms].join(", ")}`);
    console.log();
}
