# compare-object-array

compare-object-array is a simple javascript library to help you to deep compare two objects, array or array of objects.

# How to import
```Javascript
    import { compareObject, compareArray } from 'compare-object-array';

    OR

    const { compareObject, compareArray } = require('compare-object-array');
```
#Usage
To compare two objects,
```Javascript
    // compare two objects
    const object1 = {
        name: 'john'
    };

    const object2 = {
        name: 'john'
    }

    const result = compareObject(object1, object2);
```

Result would be,
```Javascript
    { isUpdated: false, message: '', data: [] }
```

'isUpdated: false ' indicate two objects are same where as 'isUpdated: true' indicate they are different.

```Javascript
    // compare two objects
    const object1 = {
        name: 'john'
    };

    const object2 = {
        name: 'bob'
    }

    const result = compareObject(object1, object2);
```

Result would be
```Javascript
    { 
        isUpdated: true,
        message: 'Value Of Key \'name\' mismatch',
        data: [ 'john', 'bob' ] 
    }
```

Similar for array, if you want to compare two arrays,
```Javascript
	// compare two array
	const array1 = [{
		name: 'john'
	}];

	const array2 = [{
		name: 'bob'
	}];

	const result = compareArray(array1, array2);
```

Result would be
```Javascript
	{ 
		isUpdated: true,
  		message: 'Value Of Key \'name\' mismatch',
  		data: [ 'john', 'bob' ] 
  	}
```

