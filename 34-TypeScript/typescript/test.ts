type Name = {
    first: string,
    last: string
};

let luke: Name = {
    first: "Luke",
    last: "Sorrenti"
};

let fullname = `${luke.first}${luke.last}`;
console.log(fullname)