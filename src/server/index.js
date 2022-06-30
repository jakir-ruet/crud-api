const app = require('../app');
//start server
const port = process.env.port || 3000;
app.listen(port, () => {
   console.log(`The server is running at http://localhost:${port}`);
});