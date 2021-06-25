const express = require('express');
const axios = require('axios');
const exphbs = require('express-handlebars');
const path = require('path');


// Creating the server
const app = express();

// Setting up the handlebars render engine
const hbs = exphbs.create({
    extname: 'hbs', //declares what the extension of the layout file will be
    defaultLayout: 'main', // declares the name of the file with the default layout
    layoutsDir: `${__dirname}/views/layouts`, // declares the folder where all layouts are stored
});

// Handlebars Middleware
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use( express.static(path.join(__dirname,'public')) );

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));


app.get('/', (req,res) => {
    res.render('index',{
        showBoxes: false,
        showError: false,
    });
});


app.post('/', async ({body},res) => {


    const channelName = body.channelName;
    console.log(channelName);

    if(body.channelName) {
        console.log(channelName)
        try {
            const {data,status} = await axios.get(`http://localhost:5500/api/getStats/${channelName}`);
            console.log(status);

            const channelSubs = data.channelSubs;
            const channelViews = data.channelViews;
            const channelNumOfVids = data.channelNumOfVids;

            // Splits the data
            const subs = {
                number: channelSubs.replace(/M|K|B/i, letter => ''),
                letter: channelSubs.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
                        channelSubs.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '',
            }


            const views = {
                number: channelViews.replace(/M|K|B/i, letter => ''),
                letter: channelViews.split('').some(char => char === 'M' || char === 'K' || char === 'B') ? 
                        channelViews.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '',
            }

            const vidNum = {
                number: channelNumOfVids.replace(/M|K/i, letter => ''),
                letter: channelNumOfVids.split('').some(char => char === 'M' || char === 'K' || char === 'B') ?
                        channelNumOfVids.split('').find(char => char === 'M' || char === 'K' || char === 'B') : '',
            }
        

            // Uses handlebars template engine to render a page, with the data being passed through
            res.render('index', {
                showBoxes: true,
                showError: false,
                type: data.channelType,
                subs: data.hiddenSubs ? 'Hidden' : subs,
                views: views,
                vidNum: vidNum,
                name: data.channelName,
                date: data.channelCreationDate,
                time: data.channelCreationTime,
                url: data.channelURL === 'N/A' ? 'N/A' : data.channelURL,
                country: data.channelCountry,
                about: data.channelAbout.replace(/\n+/g, lineBreak => '__'),
                id: data.channelID,
                pic: data.channelPicURL,
            });

        } catch (err) {
            if(err) {
                console.log(err.response.status);
                console.log(err.response.data.msg);

                res.render('index', {
                    showBoxes: false,
                    showError: true,
                    msg: err.response.data.msg
                });
            }
        }
    } else {
        res.render('index', {
            showBoxes: false,
            showError: true,
            msg: 'Channel name cannot be empty'
        });
    }

})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Client is running on port: ${port}`));