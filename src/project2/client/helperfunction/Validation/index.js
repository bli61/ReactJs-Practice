let standard = ["M", "F"];
const validation = (fname, lname, sex, age, pwd, repeatpwd) => {
    let valid =
        fname.length === 0 ||
        lname.length === 0 ||
        sex.length === 0 ||
        age.length === 0 ||
        pwd.length === 0 ||
        repeatpwd.length === 0 ||
        pwd !== repeatpwd ||
        !Number(age) ||
        !standard.includes(sex.toUpperCase());
    return valid;
};
export default validation;
