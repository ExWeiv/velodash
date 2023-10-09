/**
 * @function
 * @description Checks if all the inputs are valid or not.
 * @param {EInputElements} inputElements - Array of elements you want to check. (Tip you can use queryChild to create this array)
 * @returns boolean
 */
export function inputChecker(inputElements) {
    try {
        let notValid = false;

        for (const i of inputElements) {
            if (i.valid != true) {
                notValid = true;
            }
        }

        return !notValid;
    } catch (err) {
        console.error("Velodash Error - ", err);
    }
}

/**
 * @param {$w.Node} element
 * @param {string} parentId
 * @returns {boolean}
 */
function hasParent(element, parentId) {
    while (element) {
        element = element.parent;

        if (element?.id === parentId) {
            return true;
        }
    }

    return false;
}

/**
 * @function
 * @description Query selector for child elements. (All elements supported and updated) Read more here: https://shoonia.site/velo-query-selector-for-child-elements/
 * @param {string} elementId
 */
export function queryChild(elementId) {
    const parentId = elementId.replace(/^#/, '');

    return {
        /**
         * @template {keyof ETypeNameToSdkType} T
         * @param {...T} type
         * @returns {ETypeNameToSdkType[T]}
         */
        all(...type) {
            /** @type {$w.Node[]} */
            const elements = $w(type.join());

            const ids = elements.reduce((acc, element) => {
                if (hasParent(element, parentId)) {
                    acc.push(`#${element.id}`);
                }

                return acc;
            }, []);

            return $w(ids.join());
        },
    };
}

/**
 * @function
 * @description Replaces the button label (and disable it) with a custom text until you re-enable it.
 * @param {$w.Button} button
 * @param {string} message
 * @returns {function}
 */
export function buttonPreloader(button, message) {
    const previousLabel = button.label;

    button.disable();
    button.label = message;

    const reEnable = () => {
        button.label = previousLabel;
        button.enable();
    }

    return reEnable;
}