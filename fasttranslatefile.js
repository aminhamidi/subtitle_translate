// const puppeteer = require('puppeteer');
// const express = require('express')
// const fs = require('fs');


// const app = express()


// function convetToSrt(path) {
//     fs.rename(path, path.slice(0, path.length - 4) + ".srt", function () {
//     });
// }

// function convetToTxt(path) {
//     fs.rename(path, path.slice(0, path.length - 4) + ".txt", function () {
//     });
// }

// const soursePath = "./files/sourse/";
// const destinationPath = "./files/destination/";

//مسیر همه ی فایل ها این جا ذخیره شده 
// const srtList = [];
// fs.readdirSync(soursePath).forEach(file => {
//     if (fs.lstatSync(soursePath + file).isDirectory() === false) {
//         convetToTxt(soursePath + file);
//         srtList.push(file);
//     }
// });

// هم زمان
// async function translator(elementelement, getSourseFileAngCopyToArray) {
//     var n1 = Date.now();

//     var browser = await puppeteer.launch({ headless: /*false*/ true });
//     var page = await browser.newPage();


//     await page.setRequestInterception(true);

//     page.on('request', (req) => {
//         if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
//             // req.abort();
//         }
//         else {
//             req.continue();
//         }
//     });

//     await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=docs');



//     await page.waitForSelector('.hYXSWe input.zJVAce')

//     let forUpload = await page.$('.hYXSWe input.zJVAce', el => el);

//     await forUpload.uploadFile(soursePath + elementelement);

//     await page.waitForSelector('.ld4Jde .VfPpkd-LgbsSe')

//     await page.click(".ld4Jde .VfPpkd-LgbsSe")



//     await page.waitForSelector('pre')

//     // گرفتن صفحه ای که ترجمه شده
//     const teranslatedPage = await page.evaluateHandle(() =>
//         document.querySelector('pre').innerHTML
//     );



//     var a = [];
//     var b = [];
//     var c = "";

//     // اون فایلو بر اساس اینتر جدا می کنیم و میریزیم تو ارایه
//     a = teranslatedPage._remoteObject.value.split('\n');
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
//     for (let i = 0; i < getSourseFileAngCopyToArray.length; i++) {

//         if (i % 2 == 0) {
//             // این if می گه که اگر عدد بود نه خط های که حرف هستند
//             var temp = getSourseFileAngCopyToArray[i].slice(0, 12)
//                 + " --> " +
//                 getSourseFileAngCopyToArray[i].slice(getSourseFileAngCopyToArray[i].length - 12)
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

//     console.log(c);

//     // فایل نهایی
//     fs.appendFile(destinationPath + elementelement + ".srt", c + "", function () {//اگر با یه رشته جمعش نکنم نمی شه
//         // convetToSrt(destinationPath + elementelement);
//         console.log("subtitle is teranstated :)");
//     });


//     // await browser.close();

//     var n2 = Date.now();
//     console.log((n2 - n1) / 1000)
// }

// const tempPromise = async (a, b) => {
//     await translator(a, b)
// }


// (async () => {

//     for (let i = 0; i < srtList.length; i++) {

//         let fileSys = require('fs/promises');

//         var getSourseFileAngCopyToArray = [];

//         await fileSys.readFile(soursePath + srtList[0], 'utf8', (err, data) => {
//             getSourseFileAngCopyToArray = data.split('\n');
//             getSourseFileAngCopyToArray = getSourseFileAngCopyToArray.filter(function (currentValue, index, arr) {
//                 if (Number(currentValue).toString() == "NaN") {
//                     return currentValue;
//                 }
//             });
//         });

//         await tempPromise(srtList[0], getSourseFileAngCopyToArray);

//     }

// })()

















// // برای ناهمزمان بودن
// srtList.forEach((element) => {

//     var getSourseFileAngCopyToArray = [];

//     fs.readFile(soursePath + element, 'utf8', (err, data) => {
//         getSourseFileAngCopyToArray = data.split('\n');
//         getSourseFileAngCopyToArray = getSourseFileAngCopyToArray.filter(function (currentValue, index, arr) {
//             if (Number(currentValue).toString() == "NaN") {
//                 return currentValue;
//             }
//         });
//     });


//     async function translator(elementelement) {
//         var n1 = Date.now();

//         const browser = await puppeteer.launch({ headless: true /*false */ });
//         const page = await browser.newPage();

//         // اپلود فایل انگیلسی
//         async function upload() {
//             var a = await page.$('.hYXSWe input.zJVAce', el => el);
//             await a.uploadFile(soursePath + elementelement);
//         }

//         await page.setRequestInterception(true);
//         page.on('request', (req) => {
//             if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
//                 req.abort();
//             }
//             else {
//                 req.continue();
//             }
//         });

//         await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=docs');


//         await page.waitForNavigation({
//             waitUntil: "load"
//         }).then(
//             await upload()
//         ).then(
//             // دکمه ی اپلود
//             await page.click(".ld4Jde .VfPpkd-LgbsSe")
//         )



//         // گرفتن صفحه ای که ترجمه شده
//         const teranslatedPage = await page.evaluateHandle(() =>
//             document.querySelector('pre').innerHTML
//         );


//         var a = [];
//         var b = [];
//         var c = "";

//         // اون فایلو بر اساس اینتر جدا می کنیم و میریزیم تو ارایه
//         a = teranslatedPage._remoteObject.value.split('\n');
//         a = a.filter(function (currentValue, index, arr) {
//             if (Number(currentValue).toString() == "NaN") {
//                 // جست و جوی پیشرفته
//                 if (currentValue.search(/[0-9][0-9]:/) == -1) {
//                     return currentValue;
//                 } else if (currentValue.search(/[0-9]|[0-9][0-9]|[0-9][0-9][0-9]/) == -1) {
//                     return null;
//                 }

//             }
//         });





//         // اضافه کردن عدد ها به فایل ترجمه شده
//         var e = 0;
//         for (let i = 0; i < getSourseFileAngCopyToArray.length; i++) {

//             if (i % 2 == 0) {
//                 // این if می گه که اگر عدد بود نه خط های که حرف هستند
//                 var temp = getSourseFileAngCopyToArray[i].slice(0, 12)
//                     + " --> " +
//                     getSourseFileAngCopyToArray[i].slice(getSourseFileAngCopyToArray[i].length - 12)
//                 b.push(temp);
//                 // console.log(temp);
//             }
//             else {
//                 // برای اینکه i داره 2 تا تا برای این زیاد می شه 
//                 b.push(a[e]);
//                 e++;
//             }

//         }



//         // برای پاک کردن ویرگول از اول و اخر خط ها 
//         // و درست کردن  فرمتی که قابل خواندن
//         for (let i = 0; i < b.length; i++) {
//             // اینتر بعد از عدد ها 
//             c += b[i] + "\r\n";
//             // 3 اینتر  بعد هر خط
//             if ((i + 1) % 2 === 0) {
//                 c += "\r\n\r\n\r\n"
//             }

//         }


//         // فایل نهایی
//         fs.appendFile(destinationPath + elementelement, c + "", function () {//اگر با یه رشته جمعش نکنم نمی شه 
//             convetToSrt(destinationPath + elementelement);
//             console.log("subtitle is teranstated :)");
//         });








//         await browser.close();

//         var n2 = Date.now();
//         console.log((n2 - n1) / 1000)
//     }

//     translator(element);


// });

/*
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 */

/************************************************* v2 *****************************************/


const puppeteer = require('puppeteer');
const express = require('express')
const fs = require('fs');


const app = express()


function convetToSrt(path) {
    fs.rename(path, path.slice(0, path.length - 4) + ".srt", function () {
    });
}

function convetToTxt(path) {
    fs.rename(path, path.slice(0, path.length - 4) + ".txt", function () {
    });
}

const soursePath = "./files/sourse/";
const destinationPath = "./files/destination/";

//مسیر همه ی فایل ها این جا ذخیره شده 
const lifeList = [];
fs.readdirSync(soursePath).forEach(file => {
    if (fs.lstatSync(soursePath + file).isDirectory() === false) {
        // convetToTxt(soursePath + file);
        lifeList.push(file);
    }
});



async function translator(elementelement) {

    var n1 = Date.now();

    var browser = await puppeteer.launch({ headless: /* false */ true });
    var page = await browser.newPage();


    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
        }
        else {
            req.continue();
        }
    });



    await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=docs');



    await page.waitForSelector('.hYXSWe input.zJVAce')

    let forUpload = await page.$('.hYXSWe input.zJVAce', el => el);

    await forUpload.uploadFile(soursePath + elementelement);

    await page.click(".ld4Jde .VfPpkd-LgbsSe")


    await page.waitForSelector('pre')

    // گرفتن صفحه ای که ترجمه شده
    const teranslatedPage = await page.evaluateHandle(() =>
        document.querySelector('pre').innerHTML
    );

    await browser.close();

    var n2 = Date.now();
    console.log((n2 - n1) / 1000)

    return teranslatedPage._remoteObject.value;

}

// میاد 2 خطی ها رو به یکی تبدیل می کنه و عدد رو خذف می کنه
async function clearing(path) {

    var data = await fs.promises.readFile(soursePath + path, 'utf8');


    data = (data.split('\r\n')).map((value, index) => {
        if (value.search(/[0-9][0-9]:/) != 0 &&
            value.search(/[0-9]|[0-9][0-9]|[0-9][0-9][0-9]/) != -1 &&
            value.search(/[A-Z]/i) == -1) {
            return '';
        }
        return value;
    });

    // نمی دونم چرا ولی باید دوباد این کارو بکنیم
    data = data.map((value, index) => {
        return value.length == 0 ? '******************************' : value;
    });



    // میریزم توی دوتا متغییر که هر دوتاشون هم اندازه ان که بتونم دو تا خونه پشت سر هم رو تشخیص بدم

    // این خط هارو می گیره 
    var string = data.map((value, index) => {
        if (value !== '******************************') {
            if (value.search(/[0-9][0-9]:/) != 0) {
                return value;
            }
        }
    });



    // این خط های زمان رو می گیره
    var time = data.map((value, index) => {
        if (value !== '******************************') {
            if (value.search(/[0-9][0-9]:/) == 0) {
                return value;
            }
        }
    });


    // برای دوخط پشت سرهم طراحی می کنم در غیر این صورت فوش می دم
    // ادقام دو خط
    string = string.map((value, index) => {
        if (value != undefined && data[index + 1] !== '******************************') {
            data[index] = data[index] + ' ' + data[index + 1];
            string[index + 1] = undefined;
            return data[index];
        } else {
            return value;
        }
    });

    string = string.map((value, index) => {
        return value == undefined ? '******************************' : value;
    });

    var final = '';

    for (let i = 0; i < string.length; i++) {

        if (time[i] != undefined) {
            final += time[i] + '\r\n';
        }

        if (string[i] != '******************************') {

            final += string[i] + '\r\n\r\n';

        }

    }



    fs.unlinkSync(soursePath + path, () => { });

    fs.appendFile(soursePath + path, final + "", function () {
        convetToTxt(soursePath + path);
    });

}



for (let i = 0; i < lifeList.length; i++) {


    (async () => {

        await clearing(lifeList[i]);

        var resultString = '';

        /**
         * دو نوع زیر نویس داریم
         * 1 :‌ مثل انجلا
        2
        00:00:05,820 --> 00:00:12,450
        can see that he's got his picture on the left and his name and his title and his blurb next to that
        2


         * 2 : استاندارد
         4
        00:00:20,170 --> 00:00:21,100
        not that hard to do.
        not that hard to do.
        یا یه خطی


        به خاطر همین یه final داریم یه  data 

        data عونی هست که از ترنسلیت می گیریم خط های ترجمش خرابه و ما نمی دانیم چند بار باید
        بعد هر خط اینتر بزنیم 

        final مثل یه قالبی هست که خونه های data میاد اون جا می شینه 

        اندازهی هر دوشونم برابه 

          */

        var final = [];

        var forFinal = await fs.promises.readFile(soursePath + lifeList[i], 'utf8');

        final = (forFinal.split('\r\n')).map((value, index) => {
            if (value.search(/[0-9][0-9]:/) == 0) {
                let temp1 = value.slice(0, 12);
                let temp2 = value.slice(value.length - 12);
                return `${temp1} --> ${temp2}`;
            }
        });




        var data = await translator(lifeList[i]);


        data = (data.split('\n')).map((value, index) => {
            if (value.search(/[0-9][0-9]:/) != -1) {
                return '*************time*****************';
            }
            return value;
        });





        data = data.map((value, index) => {
            return value.length == 0 ? '******************************' : value;
        });



        for (let i = 0; i < data.length; i++) {
            if (data[i] === '*************time*****************') {
                resultString += final[i] + '\r\n';
            } else if (data[i] === '******************************') {
                resultString += '\r\n\r\n';
            } else {
                resultString += data[i] + '\r\n\r\n';
            }
        }


        fs.appendFile(destinationPath + lifeList[i], resultString + "", function () {//اگر با یه رشته جمعش نکنم نمی شه 
            convetToSrt(destinationPath + lifeList[i]);
            console.log("subtitle is teranstated :)");
        });

        fs.unlinkSync(soursePath + lifeList[i], () => { });

    })()

}

/*
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 **************************************************************************************************
 */


/**************************************** v3 ***************************************************/


// const puppeteer = require('puppeteer');
// const express = require('express')
// const fs = require('fs');


// const app = express()


// function convetToSrt(path) {
//     fs.rename(path, path.slice(0, path.length - 4) + ".srt", function () {
//     });
// }

// function convetToTxt(path) {
//     fs.rename(path, path.slice(0, path.length - 4) + ".txt", function () {
//     });
//     return new Promise((resolve, rejects) => {
//         resolve(true)
//     })
// }

// const soursePath = "./files/sourse/";
// const destinationPath = "./files/destination/";

// //مسیر همه ی فایل ها این جا ذخیره شده 
// const lifeList = [];
// fs.readdirSync(soursePath).forEach(file => {
//     if (fs.lstatSync(soursePath + file).isDirectory() === false) {
//         // convetToTxt(soursePath + file);
//         lifeList.push(file);
//     }
// });



// async function translator(elementelement) {

//     var n1 = Date.now();

//     var browser = await puppeteer.launch({ headless: /* false */ true });
//     var page = await browser.newPage();


//     await page.setRequestInterception(true);

//     page.on('request', (req) => {
//         if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
//             req.abort();
//         }
//         else {
//             req.continue();
//         }
//     });



//     await page.goto('https://translate.google.com/?hl=en&tab=rT1&sl=en&tl=fa&op=docs');



//     await page.waitForSelector('.hYXSWe input.zJVAce')

//     let forUpload = await page.$('.hYXSWe input.zJVAce', el => el);

//     await forUpload.uploadFile(soursePath + elementelement);

//     await page.click(".ld4Jde .VfPpkd-LgbsSe")


//     await page.waitForSelector('pre')

//     // گرفتن صفحه ای که ترجمه شده
//     const teranslatedPage = await page.evaluateHandle(() =>
//         document.querySelector('pre').innerHTML
//     );

//     await browser.close();

//     var n2 = Date.now();
//     console.log((n2 - n1) / 1000)

//     return teranslatedPage._remoteObject.value;

// }

// // میاد 2 خطی ها رو به یکی تبدیل می کنه و عدد رو خذف می کنه
// async function clearing(path) {

//     var data = await fs.promises.readFile(soursePath + path, 'utf8');


//     data = (data.split('\r\n')).map((value, index) => {
//         if (value.search(/[0-9][0-9]:/) != 0 &&
//             value.search(/[0-9]|[0-9][0-9]|[0-9][0-9][0-9]/) != -1 &&
//             value.search(/[A-Z]/i) == -1) {
//             return '';
//         }
//         return value;
//     });

//     // نمی دونم چرا ولی باید دوباد این کارو بکنیم
//     data = data.map((value, index) => {
//         return value.length == 0 ? '******************************' : value;
//     });



//     // میریزم توی دوتا متغییر که هر دوتاشون هم اندازه ان که بتونم دو تا خونه پشت سر هم رو تشخیص بدم

//     // این خط هارو می گیره 
//     var string = data.map((value, index) => {
//         if (value !== '******************************') {
//             if (value.search(/[0-9][0-9]:/) != 0) {
//                 return value;
//             }
//         }
//     });



//     // این خط های زمان رو می گیره
//     var time = data.map((value, index) => {
//         if (value !== '******************************') {
//             if (value.search(/[0-9][0-9]:/) == 0) {
//                 return value;
//             }
//         }
//     });


//     // برای دوخط پشت سرهم طراحی می کنم در غیر این صورت فوش می دم
//     // ادقام دو خط
//     string = string.map((value, index) => {
//         if (value != undefined && data[index + 1] !== '******************************') {
//             data[index] = data[index] + ' ' + data[index + 1];
//             string[index + 1] = undefined;
//             return data[index];
//         } else {
//             return value;
//         }
//     });

//     string = string.map((value, index) => {
//         return value == undefined ? '******************************' : value;
//     });

//     var final = '';

//     for (let i = 0; i < string.length; i++) {

//         if (time[i] != undefined) {
//             final += time[i] + '\r\n';
//         }

//         if (string[i] != '******************************') {

//             final += string[i] + '\r\n\r\n';

//         }

//     }



//     fs.unlinkSync(soursePath + path, () => { });

//     fs.appendFile(soursePath + path, final + "", function () {
//     });

//     return new Promise((resolve, rejects) => {
//         resolve(true)
//     })

// }


// async function asyncFn(lifeList) {


//     var resultString = '';

//     /**
//      * دو نوع زیر نویس داریم
//      * 1 :‌ مثل انجلا
//     2
//     00:00:05,820 --> 00:00:12,450
//     can see that he's got his picture on the left and his name and his title and his blurb next to that
//     2


//      * 2 : استاندارد
//      4
//     00:00:20,170 --> 00:00:21,100
//     not that hard to do.
//     not that hard to do.
//     یا یه خطی


//     به خاطر همین یه final داریم یه  data 

//     data عونی هست که از ترنسلیت می گیریم خط های ترجمش خرابه و ما نمی دانیم چند بار باید
//     بعد هر خط اینتر بزنیم 

//     final مثل یه قالبی هست که خونه های data میاد اون جا می شینه 

//     اندازهی هر دوشونم برابه 

//       */

//     var final = [];

//     var forFinal = await fs.promises.readFile(soursePath + lifeList, 'utf8');

//     final = (forFinal.split('\r\n')).map((value, index) => {
//         if (value.search(/[0-9][0-9]:/) == 0) {
//             let temp1 = value.slice(0, 12);
//             let temp2 = value.slice(value.length - 12);
//             return `${temp1} --> ${temp2}`;
//         }
//     });




//     var data = await translator(lifeList);


//     data = (data.split('\n')).map((value, index) => {
//         if (value.search(/[0-9][0-9]:/) != -1) {
//             return '*************time*****************';
//         }
//         return value;
//     });





//     data = data.map((value, index) => {
//         return value.length == 0 ? '******************************' : value;
//     });



//     for (let i = 0; i < data.length; i++) {
//         if (data[i] === '*************time*****************') {
//             resultString += final[i] + '\r\n';
//         } else if (data[i] === '******************************') {
//             resultString += '\r\n\r\n';
//         } else {
//             resultString += data[i] + '\r\n\r\n';
//         }
//     }


//     fs.appendFile(destinationPath + lifeList, resultString + "", function () {//اگر با یه رشته جمعش نکنم نمی شه 
//         convetToSrt(destinationPath + lifeList);
//         console.log("subtitle is teranstated :)");
//     });

//     fs.unlinkSync(soursePath + lifeList, () => { });


//     return new Promise((resolve, rejects) => {
//         resolve(true)
//     })
// }




// // همزمان 
// (async () => {
//     for (let i = 0; i < lifeList.length; i++) {
//         convetToTxt(soursePath + lifeList[i]);
//     }
//     for (let i = 0; i < lifeList.length; i++) {




//         if (await clearing(lifeList[i])) {
//             await asyncFn(lifeList[i]);

//         }


//     }
// })()

// // // ناهمزمان 
// // for (let i = 0; i < lifeList.length; i++) {
// // (async () => {
// //         await clearing(lifeList[i]);
// //         await asyncFn(lifeList[i]);
// //     })()
// // }