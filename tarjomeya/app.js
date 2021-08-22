const puppeteer = require('puppeteer');
const express = require('express')
const fs = require('fs');
const { log } = require('console');

const app = express()






const soursePath = "./files/sourse/";
const destinationPath = "./files/destination/";

//مسیر همه ی فایل ها این جا ذخیره شده 
const srtList = [];
fs.readdirSync(soursePath).forEach(file => {
    srtList.push(file)
});


var splitSrtToArray = [];
var saveToArray_splitSrtToArray = [];
var finalFileReadyToSave = "";


function readFileAndSaveToArrar(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        splitSrtToArray = data.split('\n');
        saveToArray_splitSrtToArray = splitSrtToArray.filter(function (currentValue, index, arr) {
            if (Number(currentValue).toString() == "NaN") {
                return currentValue;
            }
        });
    });
}
readFileAndSaveToArrar(soursePath + srtList[0]);



function saveArrayToStringRedyForSave(data, i) {
    finalFileReadyToSave += data + "\r\n";
    if ((i + 1) % 2 === 0) {
        finalFileReadyToSave += "\r\n\r\n\r\n"
    }
}

function finaly_SaveStrFinall(path) {
    fs.appendFile(destinationPath + path, finalFileReadyToSave + '',
        function () { console.log("save"); });
}

function emptyVariable() {
    splitSrtToArray = [];
    saveToArray_splitSrtToArray = [];
    finalFileReadyToSave = "";
}




async function translator() {
    var n1 = Date.now();

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    async function openBrowser() {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
                req.abort();
            }
            else {
                req.continue();
            }
        });
        await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=translate');

    }

    async function celeareTeranslateArea() {
        await page.click('button[jsname="X5DuWc"]');
    }

    async function teranslate(srtinggggg) {
        await page.waitForNavigation({
            waitUntil: "load"
        }).then(
            await page.click('.er8xn')
        ).then(
            await page.keyboard.type(srtinggggg)
        )
        await page.waitForSelector('span[jsname="W297wb"]');
        let newUrls = await page.evaluate(() => {
            let results = "";
            let items = document.querySelectorAll('span[jsname="W297wb"]');
            items.forEach((item) => {
                results += item.innerHTML + " ";
            });
            return results;
        });
        return newUrls;
    }



    async function closeBrowser() {
        await browser.close();
    }


    await openBrowser();

    var i = 0;
    var temp;
    while (i < saveToArray_splitSrtToArray.length) {

        // عدد
        if (i % 2 == 0) {
            finalFileReadyToSave += saveToArray_splitSrtToArray[i] + "\r\n";
        }
        // حرف 
        else if (i % 2 == 1) {
            temp = await teranslate(saveToArray_splitSrtToArray[i]);
            finalFileReadyToSave += temp + "\r\n\r\n\r\n";
            await celeareTeranslateArea();
        }

        i++;
    }


    finaly_SaveStrFinall(srtList[0]);



    var n2 = Date.now();
    console.log((n2 - n1) / 1000)
}






/* await  */translator();



















// app.listen(3000);
// app.get('/', (req, res) => {
//     res.send(data.filter('\n'))
// })


