# @exweiv/velodash

[![https://wix.com/velo](https://img.shields.io/badge/Built%20for-Velo%20by%20Wix-3638f4)](https://wix.com/velo)

A package to save some time and make things easier/faster while developing with Velo.

<img src="https://static.wixstatic.com/media/510eca_1743ac12ef8243f492996dfbf6b3465b~mv2.jpg" alt="Velo Helpers velodash" width="100"/>

## Example

```js
//Import any helper function you want.
import { inputChecker } from '@exweiv/velodash';

$w.onReady(() => {
    $w("#submitButton").onClick(() => {
        const isAllValid = inputChecker(allInputs);

        if (isAllValid) {
            //Keep Going...
        } else {
            //Error
        }
    })
})
```

---

> We are creating a documentation for this package it will be here soon with an external URL.

