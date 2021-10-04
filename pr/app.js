// Okten Mentor, [30.09.21 22:10]
// Використовуй erly return pattern. Уникай else if
//
//     Okten Mentor, [30.09.21 22:14]
// Стрічка 32 та інші такі ж :
//     Шлях будуй за допомогою path.join()
// Дані передай JSON.stringify(value)

const fs = require('fs');
const path = require('path');

const mkdirPath = path.join(__dirname, 'users');
fs.mkdir(mkdirPath, (err) => {if (err) console.log(err)});

const manOlder20Path = path.join(mkdirPath, 'manOlder20');
const manYounger20Path = path.join(mkdirPath, 'manYounger20');
const womanOlder20Path = path.join(mkdirPath, 'womanOlder20');
const womanYounger20Path = path.join(mkdirPath, 'womanYounger20');

fs.mkdir(manOlder20Path, (err) => {if (err) console.log(err)});
fs.mkdir(manYounger20Path, (err) => {if (err) console.log(err)});
fs.mkdir(womanOlder20Path, (err) => {if (err) console.log(err)});
fs.mkdir(womanYounger20Path, (err) => {if (err) console.log(err)});

const users = [
    { name: 'razor', gender: 'male', age: 18 },
    { name: 'xiao', gender: 'male', age: 20 },
    { name: 'qiqi', gender: 'female', age: 12 },
    { name: 'ayaka', gender: 'female', age: 22 },
    { name: 'keya', gender: 'male', age: 25 },
    { name: 'yoimiya', gender: 'female', age: 17 },
    { name: 'ded', gender: 'male', age: 666 },
    { name: 'bennet', gender: 'male', age: 15 },
    { name: 'BAAL', gender: 'female', age: 2000 },
    { name: 'madam Pin', gender: 'female', age: 66 },
];

users.map(value => {
    const user = JSON.stringify(value);

    if (value.gender === 'male' && value.age < 20) {
        return fs.writeFile(path.join(manYounger20Path, value.name), user, (err) => {
            if (err) console.log(err);
        });
    }

    if (value.gender === 'male' && value.age >= 20) {
        return fs.writeFile(path.join(manOlder20Path, value.name), user, (err) => {
            if (err) console.log(err);
        });
    }

    if (value.gender === 'female' && value.age < 20) {
        return fs.writeFile(path.join(womanYounger20Path, value.name), user, (err) => {
            if (err) console.log(err);
        });
    }

    if (value.gender === 'female' && value.age >= 20) {
        return fs.writeFile(path.join(womanOlder20Path, value.name), user, (err) => {
            if (err) console.log(err);
        });
    }
})