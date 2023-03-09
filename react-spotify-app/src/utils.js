export const catchErrors = fn => {
    return function(...args) {
        return fn(...args).catch((err) => {
            console.log("catchErrors has caught an error!");
            console.error(err);
        });
    }
}