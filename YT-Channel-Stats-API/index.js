// Modules
const path = require('path');
const express = require('express');
const axios = require('axios');
const numeral = require('numeral');
const moment = require('moment');
const helmet = require('helmet');

// Creates a new express application
const app = express();

/* --------------------------------------------- functions and methods I'll be using in the app --------------------------------------------- */


// function using the numeral module to format numbers into easier to read form
const numberFormatting = (num) => {
    if(num>=1000000 && num%1000 !== 0) { // num NOT wholely divisible by 1K & num >= 1M 
        return numeral(num).format('0.0a').replace(/m|k|b/g, letter => {
            return letter.toUpperCase(); // replaces every m or k with uppercase
        });
    } else if (num>=1000 && num%1000 !== 0) { // num NOT wholely divisible by 1k & num >= 1K
        return numeral(num).format('0.00a').replace(/m|k|b/g, letter => {
            return letter.toUpperCase(); // replaces every m or k with uppercase
        });
    } else { // num wholely divisible by 1K
        return numeral(num).format('0a').replace(/m|k|b/g, letter => {
            return letter.toUpperCase(); // replaces every m or k with uppercase
        });
    }
};


// function to res.json data
const channelData = (response,previousResponse) => {
    // If statistics exist then returns true, if not then returns false
    const resStatExists = typeof response.data.items[0].statistics === 'undefined' ? false : true;
    
    // consts to make the json output shorter and cleaner
    const resSnip = response.data.items[0].snippet;
    const resStat = response.data.items[0].statistics;

    return {
        // channelType: resStatExists ? 'Youtube Channel' : 'Youtube Account',
        channelSubs: resStatExists ? numberFormatting(resStat.subscriberCount) : 'N/A',
        channelViews: resStatExists ? numberFormatting(resStat.viewCount) : 'N/A',
        channelNumOfVids: resStatExists ? numberFormatting(resStat.videoCount) : 'N/A',
        channelName: resSnip.title,
        channelCreationDate: moment(resSnip.publishedAt).format('DD MMMM YYYY'),
        channelCreationTime: moment(resSnip.publishedAt).format('HH:mm:ss (Z)'),
        channelURL: resSnip.customUrl ? resSnip.customUrl : 'N/A',
        channelCountry: resSnip.country ? resSnip.country : 'N/A',
        channelAbout: resSnip.description ? resSnip.description : 'N/A',
        channelID: previousResponse ? previousResponse.data.items[0].snippet.channelId : response.data.items[0].id,
        hiddenSubs: resStat.hiddenSubscriberCount,
        channelPicURL: resSnip.thumbnails.high.url,
    };
}


// Middleware
app.use(express.json());
app.use(helmet());


// Root page
app.get('/', async (req, res) => {
    res.send(`<h1>This is Youtube API</h1>`);
});


app.get('/api/getStats/:id', async ({params},res) => {

    /* ------- API Links ------- */
    // search resource link
    const searchAPIUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=25&order=relevance&q=${params.id}&key=AIzaSyCOCNhvlWhIJSwL2O2L4kr7zh-6BOy__78`;  
    
    // channel resource link function 
    const channelAPIUrl = (ID) => `https://www.googleapis.com/youtube/v3/channels?id=${ID}&part=id,snippet,statistics&key=AIzaSyCOCNhvlWhIJSwL2O2L4kr7zh-6BOy__78`;

    try {
        const response = await axios.get( channelAPIUrl(params.id) );

        /* -------If there are no search results for the channel ID------- */
        if( response.data.pageInfo.totalResults === 0) {
            const response_1 = await axios.get(searchAPIUrl);

            // console.log(response_1.data.items[0].snippet.channelId)

            /* ------- If there are no search results for the channel name either ------- */
            if(response_1.data.pageInfo.totalResults === 0) res.status(404).json({msg:"Could not retrieve channel data because it doesn't exist", reason:"Bad Request"});
            /* ------- If there are search results for the channel name ------- */
            else {
                const response_2 = await axios.get ( channelAPIUrl(response_1.data.items[0].snippet.channelId) );
                // console.log(`ID: ${response_1.data.items[0].snippet.channelId}`);
                res.json( channelData(response_2,response_1) );
            }
        /* -------If there are search results for the channel ID------- */
        } else {
            res.json( channelData(response) );
        }

    } catch (err) {
        console.error(err.response.data.error.code);
        res.status(err.response.data.error.code).json({msg:"You don't have permission to access this information"})
    }
 
});



// OLD CODE

// app.get('/api/getInfo/:id', function(req, res)  {
    
//     /* ------- API Links ------- */
//     // search resource link
//     const searchAPIUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=25&order=relevance&q=${req.params.id}&key=AIzaSyCOCNhvlWhIJSwL2O2L4kr7zh-6BOy__78`;  

//     // channel resource link function 
//     const channelAPIUrl = (ID) => `https://www.googleapis.com/youtube/v3/channels?id=${ID}&part=id,snippet,statistics&key=AIzaSyCOCNhvlWhIJSwL2O2L4kr7zh-6BOy__78`;
      
    
//     axios.get(channelAPIUrl(req.params.id)).then(response => {
        
//         /* -------If there are no search results for the channel ID------- */
//         if(response.data.pageInfo.totalResults === 0) {
            
//             axios.get(searchAPIUrl).then( response => {
//                 /* ------- If there are no search results for the channel name ------- */
//                 if(response.data.pageInfo.totalResults === 0) res.status(404).json({msg:"There were no search results", reason:"Bad Request"});
                
//                 /* ------- If there are search results for the channel name ------- */
//                 else {
//                     axios.get( channelAPIUrl(response.data.items[0].snippet.channelId) ).then(response => {
//                         res.json(channelData(response));
//                     })
//                 }
//             }).catch( err=> console.error(err) );

//             /* -------If there are search results for the channel ID------- */
//         } else {
//             console.log(`Fetching stats for ${resStatExists ? 'YT Channel with ID:' : 'account: '} ${req.params.id}`);      
//             res.json(channelData(response));
//         }
//     }).catch( err=> console.error(err) )   
// });

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server is listening on port: ${port}`));