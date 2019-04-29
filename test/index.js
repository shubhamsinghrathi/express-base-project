const stringValidator = (str) => {
    if (!str || !str.trim()) {
        return false
    }
    return true
}

const asyncFxn = (val) => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
            if (val == false) {
                return reject(new Error());
            } else {
                return resolve([1,2,3]);
            }
        // }, 2000);
    });
}

module.exports = {
    simpleObj: {
        a: 1,
        b: 2
    },
    stringValidator,
    asyncFxn
}