# veganNewsAPI
Vegan News API built with NodeJS (Express) and MongoDB.


**Two important files are missing here, which contain my web scraping algorithms... One is to initialize the database with all articles (even really old ones) from the different newspapers which I'm using as sources, and the other is just to update the database with the most recent news, consuming the content from the homepage of all newspapers... If you want to learn about web scraping with NodeJS (Cheerio) I suggest Ania Kubów tutorials on Youtube. 

This is a server-side application built with NodeJS (Express) and MongoDB which provides news from 8 different sources about veganism. When the server is initialized, a web scraping algorithm collect all the news from those sources. Another script is executed every 30 minutes to update the database with the most recent news. Cheerio and Axios are used for web scraping. Mongoose middleware is utilized to interact with the MongoDB database.
Explanation of Pagination Mechanism

    All articles: /allArticles => returns first 10 articles (you can use optional pagination queries, see examples below).
    All articles: /allArticles?page=0&limit=20 => returns first page considering pages with 20 articles each.
    All articles: /allArticles?page=0 => since limit is not specified, by default each page has 10 articles.
    All articles: /allArticles?limit=15 => since page is not specified, by default it will return the first page, considering pages of 15 articles each.

The same pagination logic applies to the routes below...<br><br>
Categories Routes

    Books: /categories/books
    Business: /categories/business
    Economy: /categories/economy
    Environment: /categories/environment
    Ethics: /categories/ethics
    Film: /categories/film
    Health: /categories/health
    Politics: /categories/politics
    Recipes: /categories/recipes
    Science: /categories/science
    Sport: /categories/sport
    Technology: /categories/technology

Newspapers Routes

    Al Jazeera: /newspapers/aljazeera
    BBC: /newspapers/bbc
    The Independent: /newspapers/independentuk
    Plant Based News: /newspapers/plantbasednews
    Surge Activism: /newspapers/surgeactivism
    The Guardian: /newspapers/theguardian
    New York Times: /newspapers/thetimes
    Veganuary: /newspapers/veganuary

Search Route

    Search all articles about 'pasta': /search/pasta

Post Route

    Route to post articles manually (requires secret key): /post?secretKey='xxxxx'
