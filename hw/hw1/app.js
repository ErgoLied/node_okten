const fs = require('fs');
const path = require('path');

const malePath = path.join(__dirname, 'male');
const femalePath = path.join(__dirname, 'female');

const usersMove = (oldPath, newPath, gender) => {
    fs.readdir(oldPath, (err, data) => {
        if(err){
            return console.log(err);
        }
        data.map(file => {
            fs.readFile(path.join(oldPath, file), (err, data) => {
                if(err){
                    return console.log(err);
                }
                const user = JSON.parse(data);

                if(user.gender === gender){
                    fs.rename(path.join(oldPath, file), path.join(newPath, file), (err) => {
                        return console.log(err);
                    })
                }
            })
        })
    })
}

usersMove(malePath, femalePath, 'female');
usersMove(femalePath, malePath, 'male');