const filterList = (id, obj) => {
    let temp = [...obj];
    let item = temp.find(it => it._id === id);

    let descendant = [];

    while (item.employees.length !== 0) {
        let employees = [...item.employees];

        for (let i = 0; i < employees.length; i++) {
            descendant.push(employees[i].employeeId);
            item = temp.find(it => it._id === employees[i].employeeId);
        }
    }
    return descendant;
};

let s = [
    { _id: "a", employees: [{ employeeId: "b" }] },
    { _id: "b", employees: [{ employeeId: "c" }, { employeeId: "d" }] },
    { _id: "c", employees: [{ employeeId: "e" }] },
    { _id: "d", employees: [] }
];

console.log(filterList("b", s));
