const puppeteer = require('puppeteer');
const express = require('express')
const fs = require('fs');

const app = express()




function convetToSrt(path, newPath = "") {
    fs.rename(path, path.slice(0, path.length - 4) + ".srt", function () {
    });

}

function convetToTxt(path, newPath = "") {
    fs.rename(path, path.slice(0, path.length - 4) + ".txt", function () {
    });
}



const soursePath = "./files/sourse/";
const destinationPath = "./files/destination/";



//مسیر همه ی فایل ها این جا ذخیره شده 
const srtList = [];
fs.readdirSync(soursePath).forEach(file => {
    // convetToTxt(soursePath + file);  
    if (fs.lstatSync(soursePath + file).isDirectory() === false) {
        srtList.push(file);
    }
});






// همه ی فایل ها رو بریزم توی یکی
var allInOne = [];

srtList.forEach(element => {

    var getSourseFileAngCopyToArray = [];

    fs.readFile(soursePath + element, 'utf8', (err, data) => {
        getSourseFileAngCopyToArray = data.split('\n');
        getSourseFileAngCopyToArray = getSourseFileAngCopyToArray.filter(function (currentValue, index, arr) {
            if (Number(currentValue).toString() == "NaN") {
                // ریختن هر کدوم توی ارایه کلی
                allInOne.push(currentValue);
            }
        });
        // برای تشخیص جدا کردن هر فایل
        allInOne.push("------------------------------")
    })
});


// چون fs ها موازی هستن باید این طوری کنم تایم بزارم
setTimeout(() => {

    var allInOneString = "";

    allInOne.forEach(element => {
        allInOneString += element + "\r\n\r\n";
    });

    //همه رو ذخیره کنیم توی یه فایل
    fs.appendFile(soursePath + "all in one/allInOne.txt", allInOneString + "", function () { });
}, 1000);













async function translator() {
    var n1 = Date.now();

    // const browser = await puppeteer.launch({ headless: false });
    // const page = await browser.newPage();

    // // اپلود فایل انگیلسی
    // async function upload() {
    //     var a = await page.$('.hYXSWe input.zJVAce', el => el);
    //     await a.uploadFile(soursePath + "all in one/allInOne.txt");
    // }

    // await page.setRequestInterception(true);
    // page.on('request', (req) => {
    //     if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
    //         req.abort();
    //     }
    //     else {
    //         req.continue();
    //     }
    // });

    // await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=docs');

    // await page.waitForNavigation({
    //     waitUntil: "load"
    // }).then(
    //     await upload()
    // ).then(
    //     // دکمه ی اپلود
    //     await page.click(".ld4Jde .VfPpkd-LgbsSe")
    // )



    var http = require('http');

    // var options = {
    //     host: 'localhost:3000',
    //     path: '/a',
    //     port: '3000',
    //     method: 'POST'
    // };

    // callback = function (response) {
    //     var str = ''
    //     response.on('data', function (chunk) {
    //         str += chunk;
    //     });

    //     response.on('end', function () {
    //         console.log(str);
    //     });
    // }

    // var req = http.request(options, callback);

    // req.write("data");

    // req.end();

    var aaaaaa = "";


    var options = {
        host: 'localhost',
        port: '3000',
        path: '/a'
    };

    callback = function (response) {
        var str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            aaaaaa = str;
        });
    }

    http.request(options, callback).end();





    // // گرفتن صفحه ای که ترجمه شده
    // const teranslatedPage = await page.evaluateHandle(() =>
    //     document.querySelector('pre').innerHTML
    // );

    setTimeout(() => {

        

    



    var aaaa = [];

    aaaa = aaaaaa.split("------------------------------");

    // console.log(aaaa[9]);//10 ةاست


    // aaaa.forEach((element,index) => {
    //  if (index == 45) {

    //  }


    //     var a = [];
    //     var b = [];
    //     var c = "";

    //     // اون فایلو بر اساس اینتر جدا می کنیم و میریزیم تو ارایه
    //     a = element.split('\n');

    //     a = a.filter(function (currentValue, index, arr) {
    //         if (Number(currentValue).toString() == "NaN") {
    //             // جست و جوی پیشرفته
    //             if (currentValue.search(/[0-9][0-9]:/) == (-1)) {
    //                 return currentValue;
    //             }
    //         }
    //     });





    //     // اضافه کردن عدد ها به فایل ترجمه شده
    //     var e = 0;
    //     for (let i = 0; i < element.length; i++) {

    //         if (i % 2 == 0) {
    //             // این if می گه که اگر عدد بود نه خط های که حرف هستند
    //             var temp = element[i].slice(0, 11)
    //                 + " --> " +
    //                 element[i].slice(element[i].length - 12)
    //             b.push(temp);
    //             // console.log(temp);
    //         }
    //         else {
    //             // برای اینکه i داره 2 تا تا برای این زیاد می شه 
    //             b.push(a[e]);
    //             e++;
    //         }

    //     }



    //     // برای پاک کردن ویرگول از اول و اخر خط ها 
    //     // و درست کردن  فرمتی که قابل خواندن
    //     for (let i = 0; i < b.length; i++) {
    //         // اینتر بعد از عدد ها 
    //         c += b[i] + "\r\n";
    //         // 3 اینتر  بعد هر خط
    //         if ((i + 1) % 2 === 0) {
    //             c += "\r\n\r\n\r\n"
    //         }

    //     }


    //     // فایل نهایی
    //     fs.appendFile(destinationPath + element, c + "", function () {//اگر با یه رشته جمعش نکنم نمی شه 
    //         convetToSrt(destinationPath + element);
    //         console.log("subtitle is teranstated :)");
    //     });

    // });









}, 1000);


    // await browser.close();

    var n2 = Date.now();
    console.log((n2 - n1) / 1000)
}

translator();








