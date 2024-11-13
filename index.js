const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

console.log('NODE_ENV: ', process.env.NODE_ENV);

const app = express();

app.use(connectLiveReload());
app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/dist', express.static(__dirname + '/dist/'));
app.set('views', __dirname + '/public/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
    const path = 'index.html';
    res.render(path);
});

app.listen(app.get('port'), function() {
});
