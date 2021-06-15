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
    res.render('index');
});


app.post('/', async ({body},res) => {
    // console.log(body.channelName);

    if(body.channelName === '') res.redirect('/');
    else {
        try {
            const {data} = await axios.get(`http://localhost:5500/api/getStats/${body.channelName}`)
            // console.dir(data);
    
            const channelSubs = data.channelSubs;
            const channelViews = data.channelViews;
            const channelNumOfVids = data.channelNumOfVids;

            const subs = {
                number: channelSubs.replace(/M|K/g, letter => ''),
                letter: channelSubs[channelSubs.length-1]
            }

            const views = {
                number: channelViews.replace(/M|K/g, letter => ''),
                letter: channelViews[channelViews.length-1]
            }
            
            const vidNum = {
                number: channelNumOfVids.replace(/M|K/g, letter => ''),
                letter: channelNumOfVids[channelNumOfVids.length-1]
            }
            

            // Uses handlebars template engine to render a page, with the data being passed through
            res.render('clientPage', {
                type: data.channelType,
                subs: data.hiddenSubs ? 'Hidden' : subs,
                views: views,
                vidNum: vidNum,
                name: data.channelName,
                date: data.channelCreationDate,
                time: data.channelCreationTime,
                url: data.channelURL,
                country: data.channelCountry,
                about: data.channelAbout,
                id: data.channelID,
                pic: data.channelPicURL,
            });
        } catch {
            (err => console.error(err));
        }
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Client is running on port: ${port}`));