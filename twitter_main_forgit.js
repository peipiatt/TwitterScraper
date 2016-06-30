 //Callback functions
    require('fs');
    var fs = require("fs");
    var error = function (err, response, body) {
        console.log('ERROR [%s]', JSON.stringify(err));
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };

    var Twitter = require('twitter-node-client').Twitter;

    var json2csv = require('json2csv');

    //Get this data from your twitter apps dashboard
    var config = {
    		//you will need your own keys for this.
        "consumerKey": "",
        "consumerSecret": "",
        "accessToken": "",
        "accessTokenSecret": "",
        "callBackUrl": "localhost:3000"
    }

    var twitter = new Twitter(config);


    //function to scrape useful data from the tweet 
    

        function getMetaData(tweets){
            var geo = [];
            var location = [];
            for(var i = 0; i < tweets[0].statuses.length; i ++ ){
                //console.log(tweets[0].statuses);
                geo.push(tweets[0].statuses[i].coordinates);
                console.log(tweets[0].statuses[i].coordinates);
                location.push(tweets[0].statuses[i].location);
                console.log(tweets[0].statuses[i].location)
            }    
            console.log("geo is: " + geo);
            console.log("location is: " + location);
        }

        function getPowerUsers(tweets){
            var powerUser = [];
            
            for(var j = 0; j < tweets[0].statuses.length; j ++){
                if(tweets[0].statuses[j].user.followers_count >= 1000){
                    powerUser.push(tweets[0].statuses[j]);
                   // console.log(tweets[0].statuses[j].user.followers_count);
                    
                }

                if(tweets[0].statuses[j].favorite_count >= 1000){
                    powerUser.push(tweets[0].statuses[j]);
                    //console.log(tweets[0].statuses[j].favorite_count);
                }
                                                         
                //console.log("The followers count is: " + tweets[0].statuses[j].user.followers_count);
                //console.log("The favorite count is: " + tweets[0].statuses[j].favorite_count);
                //console.log(tweets[0].statuses[j]);
            }

            
            console.log("The number of influencers (1000 favorites or followers):  " + powerUser.length);
            //console.log(powerUser[3]);

        }

        
        function getTweets(quantity, hashtag){
                  
            var formattedTweetArray = [];
            var tweets = [twitter.getSearch({'q': hashtag,'count': quantity, 'latitude':'40.1456984', 'longitude':'-82.9812948', 'radius':'1mi'}, error, function(tweets){
            var t = JSON.parse(tweets);
            
            var fields = ['created_at', 'id', 'text', 'in_reply_to_status_id', 'in_reply_to_user_id', 'in_reply_to_user_screen_name',
                'user.id', 'user.name', 'user.screen_name', 'user.description', 'user.url', 'user.followers_count', 'user.created_at', 'user.favourites_count', 'user.statuses_count'
                ,'geo', 'coordinates', 'place', 'is_quote_status', 'retweet_count', 'favorite_count', 'favorited', 'possibly_sensitive', 'lang'];


            json2csv({ data: t.statuses, fields: fields }, function(err, csv) {
                if (err) console.log(err);
                fs.appendFile('geoTrial.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
                });
            });

        })];
            
    }




        
        //main method:

        setInterval(function(){control()}, 5000);

        function control(){
            var d = new Date();
            var t = d.toLocaleTimeString();
            console.log(t);
            getTweets(100 , 'victorias secret');
        }
        

        
          
    //Example calls

    //twitter.getUserTimeline({ screen_name: 'thewizk', count: '1'}, error, success);

    //twitter.getMentionsTimeline({ count: '10'}, error, success);

    // twitter.getHomeTimeline({ count: '10'}, error, success);

    //twitter.getReTweetsOfMe({ count: '10'}, error, success);

    //twitter.getTweet({ id: '1111111111'}, error, success);
    
    //Get 10 popular tweets with a positive attitude about a movie that is not scary 
    
    // twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);


