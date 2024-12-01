function generateTestCases(numCases) {
    const maxLength = 15;
    const minInt = -100;
    const maxInt = 101; // due to how Math.random() works, 101 will not be included.

    const testCases = [];
    for (let i = 0; i < numCases; i++) {
        const testCase = [];
        const arrayLength = Math.ceil(Math.random() * maxLength);

        for (let j = 0; j < arrayLength; j++) {
            const number =
                minInt + Math.floor((maxInt - minInt) * Math.random());
            testCase.push(number);
        }

        testCases.push(testCase);
    }

    return testCases;
}

console.log(generateTestCases(20));
