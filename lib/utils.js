function copyObj(obj, copyToObj, func) {
    Object.keys(obj).forEach(itm => {
        if (isObject(obj[itm])) {
            copyToObj[itm] = {};
            copyObj(obj[itm], copyToObj[itm], func);
        } else {
            copyToObj[itm] = func(obj[itm]);
        }
    });
}

function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

function getInnerText(selector) {
    return document.querySelector(selector).innerText
}

function getImageURL(selector) {
    return document.querySelector(selector).getAttribute('src').replace('/', '');
}

function getTableArray(selector) {
    var rows = document.querySelectorAll(selector);
    return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
    });
}

