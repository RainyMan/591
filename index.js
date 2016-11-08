var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var house = function() {
    request( {
url: "https://sale.591.com.tw/index.php?module=search&action=rslist&is_new_list=1&type=2&searchtype=1&region=6&listview=img&section=67&order=visitor&orderType=asc",
method: "GET"
    }, function(error, response, body) {
        if (error || !body) {
            return;
        }
        // 爬完網頁後要做的事情
		
		var bbody = JSON.parse(body).main ; //顯示正確中文頁面
		
		var $ = cheerio.load(bbody);
		
       var titles = $("a.house_url");
	   var result =[];
        //var singers = $("a.chart-row__artist");
        for (var i = 0; i < titles.length; i++) {
            result.push({				
				title : titles,
            });

            console.log(titles.eq(i).attr('title'));
        }

        fs.writeFile("result.json", JSON.stringify(bbody));
    });

};

house();
//setInterval(top100,1*10*1000);