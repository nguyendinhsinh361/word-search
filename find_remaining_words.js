import fs from 'fs';
import {readJSONFile} from './read_json_file.js';

const wordObjects = [
    {
        "word": "ゾ",
        "path": [[0, 0]]
    },
    {
        "word": "ゾを",
        "path": [
            [0, 0],
            [1, 0]
        ]
    },
    {
        "word": "ゾをネ",
        "path": [
            [0, 0],
            [1, 0],
            [2, 0]
        ]
    },
    {
        "word": "ゼぐリブメイオ",
        "path": [
            [7, 7],
            [6, 6],
            [5, 5],
            [4, 4],
            [3, 3],
            [2, 2],
            [1, 1]
        ]
    }
];

// const listWordInput = ["ゾを"];
// const listWordInputObj = []
// for (const word of listWordInput) {
//     const wordRequire = wordObjects.find(ele => ele.word === word)
//     if(wordRequire) {
//         listWordInputObj.push(wordRequire)
//     }
// }

const dataPrepare = await readJSONFile("words.json")

const listWordInput = ["ヘビ", "キツネ", "ヒョウ"];
const listWordInputObj = []
for (const word of listWordInput) {
    const wordRequire = dataPrepare.find(ele => ele.word === word)
    if(wordRequire) {
        listWordInputObj.push(wordRequire)
    }
}



// Hàm kiểm tra xem một path có xuất hiện trong một đối tượng khác không
function pathAppearsInOtherObjects(path, otherObjects) {
    for (const otherPath of otherObjects.path) {
        if (JSON.stringify(path).includes(JSON.stringify(otherPath))) {
            return true;
        }
    }
    return false;
}

// Lọc ra các đối tượng không chứa path của newObject
// const allPath = listWordInputObj.map(ele => ele.path)
// const filteredWords = wordObjects.filter(word => !pathAppearsInOtherObjects(allPath, word));

const allPath = listWordInputObj.map(ele => ele.path)
const filteredWords = dataPrepare.filter(word => !pathAppearsInOtherObjects(allPath, word));

// console.log(filteredWords);
fs.writeFileSync('remaining_words.json', JSON.stringify(filteredWords, null, 2));