/**
 * @typedef {() => Promise<unknown>} Action
 * @function
 * @description Promise queue creator for hide and show. Read more here: https://shoonia.site/promise-queue/
 * @param {number} [maxLength] - max count actions in the queue
 * @returns {(action: Action) => void}
 */
export function createPromiseQueue(maxLength = 1) {
    /** @type {boolean} */
    let isActive = false;

    /** @type {Action[]} */
    const actions = [];

    const runQueue = () => {
        if (isActive) {
            return;
        }

        if (actions.length > 0) {
            const action = actions.shift();

            isActive = true;

            action().then(() => {
                isActive = false;
                runQueue();
            });
        }
    };

    return (action) => {
        if (actions.length >= maxLength) {
            actions.pop();
        }

        actions.push(action);
        runQueue();
    };
}