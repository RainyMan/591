var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var house = function(count , result) {
    request( {
url: "https://sale.591.com.tw/index.php?module=search&action=rslist&is_new_list=1&type=2&searchtype=1&region=6&listview=img&section=67&saleprice=1&order=visitor&orderType=asc&firstRow="
     + count,
method: "GET"
    }, function(error, response, body) {
        if (error || !body) {
            return;
        }
        // 爬完網頁後要做的事情
		
		var info = JSON.parse(body).main ; //顯示正確中文頁面
		var $ = cheerio.load(info);
		
       var titles = $("a.house_url");
	   var areas = $("li.area.saleByArea");
	   var prices = $("li.price.fc-org");
        //var singers = $("a.chart-row__artist");
        for (var i = 0; i < titles.length; i++) {
            result.push({				
				title : titles.eq(i).attr('title'),
				area : areas.eq(i).text().replace("\r\n        \t", "").replace("\r\n        ", ""),
				price : prices.eq(i).find("strong").eq(1).text()
            });

            console.log(titles.eq(i).attr('title') + ' ' + areas.eq(i).text().replace("\r\n        \t", "").replace("\r\n        ", "") + ' ' + prices.eq(i).find("strong").eq(1).text());
			
        }
        
		
		if(JSON.parse(body).count > count)
			house(count+20 , result);
		else
			fs.writeFile("result.json", JSON.stringify(result));
    });
	
};

var result = [];
house(0 , result);
//setInterval(top100,1*10*1000);