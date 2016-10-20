var cheerio = require("cheerio"),
  request = require("request"),
  sequelize = require("sequelize"),
  config = require("./config.js"),

  //connect to the DB
  db = new sequelize("trans_scrape", "root", "root", {dialectOptions:{socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock", logging: true}}),

  wiki = db.import(__dirname + "/wiki");

    //set the URL of the page I want to scrape
    var url = "https://en.wikipedia.org/wiki/List_of_transgender_characters_in_film_and_television";

      var productions = {
        titles: [],
        years: [],
        descriptions: [],
        links: []
      };

    request(url, function(err, response, body){
     if(err) throw err;

     $ = cheerio.load(body);

      // scrapes the title
      $("div#mw-content-text.mw-content-ltr > ul > li").each(function(){
        var prod = $(this),
            production = {
              title: prod.find("a:nth-child(1)").text(),
              year: "",
              description: "",
              link: prod.find("a:nth-child(1)").attr("href")
            };

            year = prod.text().match(/\(\d+\)/);
            description = prod.text().match(/\:.+/)

            if(year){
              production.year = year[0];
            }

            if(description){
              production.description = description[0];
            }

            wiki.findOrCreate({where:{ link: production.link }, defaults: production});

      })
    });

    //    $("div#mw-content-text.mw-content-ltr > ul > li").each(function(){
    //     var ul =$(this),
    //     title = ul.find("a:nth-child(1)").text();

    //     productions.titles.push(title);
    //     // console.log(title);
    //    })

    //    // scrapes the year
    //     $("div#mw-content-text.mw-content-ltr > ul > li").each(function(){
    //     var ul =$(this),
    //     year = ul.text().match(/\(\d+\)/);

    //     productions.years.push(year);
    //     // console.log(year);
    //    })

    //   // scrapes the description
    //     $("div#mw-content-text.mw-content-ltr > ul > li").each(function(){
    //     var ul =$(this),
    //     description = ul.text().match(/\:.+/);

    //     productions.descriptions.push(description);
    //     // console.log(description);
    //    })

    //   // scrapes the link

    //     $("div#mw-content-text.mw-content-ltr > ul > li").each(function(){
    //     var ul =$(this),
    //     link = ul.find("a:nth-child(1)").attr("href");

    //     productions.links.push(link);
    //     // console.log(link);
    //    })

    // });


