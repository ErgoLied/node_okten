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

const createUsrFile = (value) => {
    if (value.gender === 'male' && value.age<20){
        fs.writeFile(`${manYounger20Path}/${value.name}.txt`, `name: ${value.name}\ngender: ${value.gender}\nage: ${value.age}`, (err) => {
            if (err) console.log(err);
        });
    }
    else if (value.gender === 'male' && value.age>=20){
        fs.writeFile(`${manOlder20Path}/${value.name}.txt`, `name: ${value.name}\ngender: ${value.gender}\nage: ${value.age}`, (err) => {
            if (err) console.log(err);
        });
    }
    else if (value.gender === 'female' && value.age<20){
        fs.writeFile(`${womanYounger20Path}/${value.name}.txt`, `name: ${value.name}\ngender: ${value.gender}\nage: ${value.age}`, (err) => {
            if (err) console.log(err);
        });
    }
    else {
        fs.writeFile(`${womanOlder20Path}/${value.name}.txt`, `name: ${value.name}\ngender: ${value.gender}\nage: ${value.age}`, (err) => {
            if (err) console.log(err);
        });
    }
}

users.map(value => createUsrFile(value));