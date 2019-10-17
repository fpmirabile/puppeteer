const fs = require('fs');

const saveJsonFile = async (object, fileName) => {
    return new Promise((resolve, reject) => {
        const json = JSON.stringify(object);
        fs.writeFile(fileName, json, 'utf8', function (err) {
            if (err) {
                console.log("An error occurred while writing JSON Object to File.");
                reject(err)
            }
         
            console.log("JSON file has been saved.");
            resolve();
        });
    }) 
}

module.exports = {
    saveJsonFile
}