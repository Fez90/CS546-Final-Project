import {ObjectId} from 'mongodb';

const exportedMethods = {

// Check ID
checkId(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id !== 'string') throw 'ID must be a string';
    id = id.trim();
    if (id.length === 0) {
        throw 'Id cannot be an empty string or just spaces';
    }
    if (!ObjectId.isValid(id)) throw `Invalid object ID`;
    return id;
},

// Check String
checkString(val, valName) {
    if (!val) throw `You must provide a ${valName}`;
    if (typeof val !== 'string') throw `${valName} must be a string`;
    val = val.trim()
    if (val.length === 0) throw `${valName} cannot be an empty string or just spaces`;
    if (!isNaN(val)) throw `${val} is not a valid value for ${valName} as it only contains digits`

    return val;

},

checkIntroduction(val, valName) {
    if (!val) throw `You must provide a ${valName}`;
    if (typeof val !== 'string') throw `${valName} must be a string`;
    if (val.length === 0) throw `${valName} cannot be an empty string or just spaces`;
    if (!isNaN(val)) throw `${val} is not a valid value for ${valName} as it only contains digits`

    return val;

},

checkNames(val, valName) {
    if (val.length < 2) throw `${valName} should be at least 2 characters long`;
    if (val.length > 25) throw `${valName} should not be greater than 25 characters long`;
},

checkPassword(val, valName) {
    if (!val) throw `You must provide a ${valName}`;
    if (typeof val !== 'string') throw `${valName} must be a string`;
    val = val.trim();
    if (val.length === 0) throw `${valName} cannot be an empty string or just spaces`;
    if (val.length < 8) throw `${valName} should be at least 8 characters long.`;
},

//According to daycares.js, I add following validation functions:
//1. State checking:
checkState(state) {
    const validState = new Set([
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]);

    state = state.toUpperCase().trim();
    if (!validState.has(state)) {
        throw 'Error: Not valid state!'
    }

    return state;
},

//2. Zip code checking:
checkZipcode(zipcode) {
    const zipcodeForm = /^\d{5}(-\d{4})?$/;
    zipcode = zipcode.trim();
    if (!zipcodeForm.test(zipcode)) {
        throw 'Error: Not a valid zip code!';
    }
    return zipcode;
},

//3. Business Hour checking:
checkBusinessHour(time) {
    const timeForm = /^(1[0-2]|[1-9]):[0-5][0-9] (AM|PM) - (1[0-2]|[1-9]):[0-5][0-9] (AM|PM)$/;
    time = time.trim();
    if (timeRangeRegex.test(time)) {
        throw 'Error: Not valid business hour!'
    }
    return time;
},

//4. Email checking:
checkEmail(email) {
    const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email = email.trim();
    if (!emailForm.test(email)) {
        throw 'Error: Not a valid email!';
    }
    return email;
},

//5. Phone number checking:
checkPhone(num) {
    const phoneForm = /^(1-)?\d{3}-\d{3}-\d{4}$/;
    num = num.trim();
    if (phoneForm.test(num)) {
        throw 'Error: Not a valid phone number!'
    }
    return num;
},

//6. Website checking:
checkWebsite(web) {
    const webForm = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    web = web.trim();
    if (webForm.test(url)) {
        throw 'Error: Not a valid website!'
    }
    return web;
},

//7. Number checking: checking if the input is an integer and >= 0
checkNumber(num, numName) {
    num = num.trim();
    let number = Number(num);
    if (!Number.isInteger(number) || number < 0) {
        throw `${numName} has to be a positive integer!`;
    }
    return num;
},

//8. Boolean checking (Assume input is a string):
checkBoolean (input, inputName) {
    input = input.trim().toLowerCase();
    if (input !== 'true' || input !== 'false') {
        throw `${inputName} has to be true or false!`;
    }
    return input;
}


}
export default exportedMethods;