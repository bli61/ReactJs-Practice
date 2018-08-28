const format = str => {
    if (str.length === 0) {
        return str;
    } else if (str.length === 1) {
        return str.toUpperCase();
    } else {
        return str[0]
            .toUpperCase()
            .concat("", str.slice(1, str.length).toLowerCase());
    }
};

export default format;
