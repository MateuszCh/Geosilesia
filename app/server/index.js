const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Running on port 3000");
});