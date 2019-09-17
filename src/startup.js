const elemancer = require('./utilities/elemancer');
const rawData = require('./data/commonNouns');
const _ = require('lodash');
const styles = require('./styling/baseStyle');
const global = require('./styling/globals');

module.exports = () => {
    console.log(`Initializing document ...`);

    let body = document.body;
    let word = body.appendElement({ attributes: { id: `word` } });
    word.className = styles.row;
    let theInput = body.appendElement({ attributes: { id: `input`, contenteditable: true } });
    theInput.className = styles.row;
    let table = body.appendTable({ attributes: { class: `thruster` } });
    table.className = styles.row;
    let tbody = table.appendElement({ tag: `tbody` });

    _.map(rawData, (kvp) => {
        let row = tbody.appendElement(`tr`);
        row.appendElement(`th`).textContent = kvp.number;
        row.appendElement(`td`).textContent = kvp.word;
        row.appendElement(`th`).textContent = kvp.definition;
        row.appendElement(`td`).textContent = kvp.gender;
    });

    let status = body.appendElement({ attributes: { id: `status` } });

    let wrappedData = _(_.shuffle(rawData));
    let current = wrappedData.next();
    word.textContent = current.value.definition;

    theInput.onkeyup = (hitKey) => {
        if (hitKey.keyCode == 32) {
            if (theInput.textContent.trim() === (current.value.word.trim())) {
                status.innerHTML = `Correct! ${theInput.textContent} means ${word.textContent}<br>` + status.innerHTML;

                theInput.textContent = "";
                current = wrappedData.next();
                if (current.done) {
                    wrappedData = _(_.shuffle(rawData));
                    current = wrappedData.next();
                }
                word.textContent = current.value.definition;
            }
            else status.innerHTML = `Wrong! ${current.value.definition} is not ${theInput.textContent}<br>` + status.innerHTML;
        }
    };
};
