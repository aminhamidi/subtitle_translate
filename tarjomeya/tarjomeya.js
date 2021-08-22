const puppeteer = require('puppeteer');
const express = require('express')
const fs = require('fs')

const app = express()




const soursePath = "./files/sourse/";
const destinationPath = "./files/destination/";

//مسیر همه ی فایل ها این جا ذخیره شده 
const srtList = [];
fs.readdirSync(soursePath).forEach(file => {
    srtList.push(soursePath + file)
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


readFileAndSaveToArrar(srtList[0]);



// function saveArrayToStringRedyForSave(data, i) {
// finalFileReadyToSave += data + "\r\n";
// if ((i + 1) % 2 === 0) {
//     finalFileReadyToSave += "\r\n\r\n\r\n"
// }
// }

function finaly_SaveStrFinall(path) {
    fs.appendFile(path, finalFileReadyToSave + '', function () { });
}

function emptyVariable() {
    splitSrtToArray = [];
    saveToArray_splitSrtToArray = [];
    finalFileReadyToSave = "";
}





// احتمالا تمام فرایند باید داخل این تابغ بره 

async function translator() {



    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    async function openBrowser() {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (/* req.resourceType() == 'stylesheet' ||  */req.resourceType() == 'font' || req.resourceType() == 'image') {
                req.abort();
            }
            else {
                req.continue();
            }
        });
        await page.goto('https://targoman.ir/');

    }

    async function celeareTeranslateArea() {
        await page.click('.src .controls .toolbar-button');
    }

    async function teranslate(srtinggggg) {
        await page.waitForNavigation({
            waitUntil: "load"
        }).then(
            await page.$eval(".src .content", (element, srtinggggg) => {
                element.innerHTML = srtinggggg;
            }, srtinggggg)
        ).then(
            await page.click('.src .content')
        ).then(
            await page.keyboard.type(" ")
        ).then(
            await page.keyboard.press('Backspace')
        )
        await page.waitForSelector('.tgt .content > span');
        let newUrls = await page.evaluate(() => {
            let results = "";
            let items = document.querySelectorAll('.tgt .content > span');
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
        if (i % 2 == 1) {
            temp = await teranslate(saveToArray_splitSrtToArray[i]);
            finalFileReadyToSave += temp + "\r\n";
            if ((i + 1) % 2 === 0) {
                finalFileReadyToSave += "\r\n\r\n\r\n"
            }
            await celeareTeranslateArea();
            // break;
        }
        i++;
    }

    fs.appendFile(destinationPath+"ad.txt", finalFileReadyToSave + '', function () { console.log("save");});




}








/* await  */translator();






// finaly_SaveStrFinall(srtList[0]);













// app.listen(3000);
// app.get('/', (req, res) => {
//     res.send(data.filter('\n'))
// })


