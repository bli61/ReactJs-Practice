const sortFuncAsc = (arr, key) => {
    if (key === "Age") {
        return arr.sort(function(a, b) {
            return Number(a[key]) - Number(b[key]);
        });
    } else {
        return arr.sort(function(a, b) {
            let x = a[key].toLowerCase();
            let y = b[key].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }
};

const sortFuncDes = (arr, key) => {
    if (key === "Age") {
        return arr.sort(function(a, b) {
            return Number(b[key]) - Number(a[key]);
        });
    } else {
        return arr.sort(function(a, b) {
            let y = a[key].toLowerCase();
            let x = b[key].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }
};

module.exports = {
    sortFuncAsc: sortFuncAsc,
    sortFuncDes: sortFuncDes
};
