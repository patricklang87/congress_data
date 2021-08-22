const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');


const readBill = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const [el] = await page.$x('//*[@id="billTextContainer"]');
        const txt = await el.getProperty('textContent');
        const srcTxt = await txt.jsonValue();
        browser.close();
        return srcTxt;
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}


'//*[@id="billTextContainer"]'

const findSearchTerms = async (billText, terms) => {
    const relevantTerms = [];
    for (let term of terms) {
        const isPresent = await billText.toLowerCase().search(term.toLowerCase());
        if (isPresent !== -1) relevantTerms.push(term);
    }
    return relevantTerms;
}

router.get('/subjectsSearch', async (req, res, next) => {
    const url = req.query.url + '/text?format=txt';
    const subjects = req.query.subjects;

    try {
        const billText = await readBill(url);
        const relevantTerms = await findSearchTerms(billText, subjects);
        res.send(relevantTerms); 
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;