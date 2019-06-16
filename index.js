// compare two object
export function compareObject(obj1, obj2) {
    let isUpdated = false;
    let result = _setResultObject();
    // 1) check type of given parameters
    isUpdated = _isDataTypeOfGivenInputsIsObject(obj1, obj2);
    result = isUpdated ? _setResultObject(isUpdated, "Given Inputs Must Be Objects",[obj1, obj2]) : result;
    // 2) check number of KEY:VALUE pairs in both object
    isUpdated = !isUpdated ? _checkNumberOfKeyValuePairs(obj1, obj2) : isUpdated;
    result = isUpdated ? _setResultObject(isUpdated, "Number Of Keys Mismatch", [obj1, obj2]) : result; 
    // 3) check all KEYS are same with it's corresponding value
    result = !result.isUpdated ? _checkAllKeysAndCorrespondingValueType(obj1, obj2) : result;
    // 4) compare VALUES
    result = !result.isUpdated ? _compareObjectValues(obj1, obj2) : result;
    // return the result 
    return result;
}

// compare two array
export function compareArray(arr1, arr2) {
    let isUpdated = false;
    let result = _setResultObject();
    // 1) check type of given parameters
    isUpdated = _isDataTypeOfGivenInputsIsArray(arr1, arr2);
    result = isUpdated ? _setResultObject(isUpdated, "Given Inputs Must Be Array",[arr1, arr2]) : result;
    // 2) check the length of arrays are equal or not
    isUpdated = !isUpdated ? !_checkLengthOfGivenArrays(arr1, arr2) : isUpdated;
    result = isUpdated ? _setResultObject(isUpdated, 'Length of Given Arrays Mismatch', [arr1.length, arr2.length]) : result;
    // 3) check data type of given Array elements
    result = !result.isUpdated ? _checkDataTypesOfAllArrayElement(arr1, arr2) : result;
    // 4) compare values
    result = !result.isUpdated ? _compareArrayValues(arr1, arr2) : result;
    // return result
    return result;
}

// **************************************** Private Methods *****************************

function _setResultObject(isUpdated = false, message = "", data = []) {
    return {
        isUpdated,
        message,
        data
    } 
}

function _isDataTypeOfGivenInputsIsObject(obj1, obj2) {
    let _typeOfObj1 = _getTypeOfGivenValue(obj1);
    let _typeOfObj2 = _getTypeOfGivenValue(obj2);
    return (_typeOfObj1 === 'object' && _typeOfObj2 === 'object') ? false : true;
}

function _isDataTypeOfGivenInputsIsArray(arr1, arr2) {
    let _typeOfObj1 = _getTypeOfGivenValue(arr1);
    let _typeOfObj2 = _getTypeOfGivenValue(arr2);
    return (_typeOfObj1 === 'array' && _typeOfObj2 === 'array') ? false : true;
}

// check total number of pairs of both object are equal or not
function _checkNumberOfKeyValuePairs(obj1, obj2) {
    let isUpdated = false;
    const _totalNumberOfPairsInObj1 = _getTotalNumberOfKeysInObject(obj1);
    const _totalNumberOfPairsInObj2 = _getTotalNumberOfKeysInObject(obj2);
    isUpdated = (_totalNumberOfPairsInObj1 === _totalNumberOfPairsInObj2) ? false : true; //if number of pairs are equal then object is not updated 
    return isUpdated;
}

// check the length of arrays
function _checkLengthOfGivenArrays(arr1, arr2) {
    return arr1.length === arr2.length
}

//check all keys with it's corresponding value type
function _checkAllKeysAndCorrespondingValueType(obj1, obj2) {
    let isUpdated = false;
    let result = _setResultObject();
    for (let key in obj1) {
        if (!isUpdated) {
            let isKeyPresent = _checkGivenKeyPresentInGivenObject(key, obj2);
            if (!isKeyPresent) {
                isUpdated = !isKeyPresent; // stop executing further even if one key is missing
                result = _setResultObject(isUpdated,`'${key}' is missing in RHO(Right Hand Object)`,[obj2]);
                break;
            }

            // if key is present then check it's corresponding value data type
            let isKeyCorrespondingValueTypeSame = _checkCorrespondingValueType(key, obj1, obj2);
            if(!isKeyCorrespondingValueTypeSame) {
                isUpdated = !isKeyCorrespondingValueTypeSame; // stop executing further even if the data type is changed
                result = _setResultObject(isUpdated,`Datatype of '${key}' mismatch with RHO(Right Hand Object)`,[obj1[key],obj2[key]]);
                break;
            }
        }
    }
    return result;
}

// check datatype of each Array elements
function _checkDataTypesOfAllArrayElement(arr1, arr2) {
    let result = _setResultObject();
    for(let i = 0; i < arr1.length; i++) {
        const _typeOfElementArray1 = _getTypeOfGivenValue(arr1[i]);
        const _typeOfElementArray2 = _getTypeOfGivenValue(arr2[i]);
        if(_typeOfElementArray1 !== _typeOfElementArray2) {
            result = _setResultObject(true, `DataType of Array Element At Index '${i}' mismatch`, [arr1[i],  arr2[i]]);
            break;
        }
    }
    return result;
}

// get total number of KEY:VALUE pairs of object
function _getTotalNumberOfKeysInObject(obj1) {
    let totalNumberOfPair = 0;
    for (let key in obj1) {
        totalNumberOfPair += 1;
    }
    return totalNumberOfPair;
}

// check given key is present in given object
function _checkGivenKeyPresentInGivenObject(key, obj) {
    let isKeyPresent = false;
    for (let _key in obj) {
        if (!isKeyPresent) {
            isKeyPresent = (_key === key);
        }
        if (isKeyPresent) {
            break;
        }
    }
    return isKeyPresent;
}

// check data types of values
function _checkCorrespondingValueType(key, obj1, obj2) {
    const valueTypeOfObj1 = _getTypeOfGivenValue(obj1[key]);
    const valueTypeOfObj2 = _getTypeOfGivenValue(obj2[key]);
    return (valueTypeOfObj1 === valueTypeOfObj2);
}

// comapare values of given objects
function _compareObjectValues(obj1, obj2) {
    let result = _setResultObject();
    for(let key in obj1) {
        result = _compareTwoValues(obj1, obj2, key);
        if(result.isUpdated) {
            break;
        }
    }
    return result;
}

// compare values of given array
function _compareArrayValues(arr1, arr2) {
    let result = _setResultObject();
    for(let i = 0; i < arr1.length; i++) {
        result = _compareTwoValues(arr1, arr2, i);
        if(result.isUpdated) {
            break;
        }
    }
    return result;
}

function _compareTwoValues(element1, element2, key) {
    let _result = _setResultObject();
    const _typeOfValue1 = _getTypeOfGivenValue(element1[key]);
    const _typeOfValue2 = _getTypeOfGivenValue(element2[key]);
    if(_typeOfValue1 === 'object' && _typeOfValue2 === 'object') {
        // recursive call to compare objects
        _result = compareObject(element1[key], element2[key]);
    } else if(_typeOfValue1 === 'array' && _typeOfValue2 === 'array') {
        // recursive call to compare array
        _result = compareArray(element1[key], element2[key]);
    } else {
        const _isValueSame = (element1[key] === element2[key]);
        _result = !_isValueSame ? _setResultObject(true, `Value Of Key '${key}' mismatch`, [element1[key], element2[key]]) : _setResultObject();
    }    

    return _result;
}

// check if given data type is array
function _getTypeOfGivenValue(value) {
    let type = typeof(value);
    if(type === 'object') {
        type = Array.isArray(value) ? 'array' : type;
    }
    return type;
}
