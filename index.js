const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv')


const movie = "https://www.imdb.com/title/tt6468322/?ref_=hm_fanfav_tt_2_pd_fp1";

(async() => {
    let imdbdata = [];
    const response = await request({
        uri: movie,
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,ta;q=0.6"
        },
        gzip: true
    });
    let $ = cheerio.load(response);
    title = $('div[class="title_wrapper"]>h1').text();
    imdbdata.push({
        title
    });
    const j2cp = new json2csv();
    const csv = j2cp.parse(imdbdata);
    fs.writeFileSync("./imdb.csv", csv, "utf - 8");

})();