const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('image')); 
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};
app.use(logReq);

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("home",)
})

app.get('/about', (req, res) => {
    res.render('about');
});
app.post('/submit', (req, res) => {
    console.log(req.body);
    res.send('Success!');
});

app.get('/users/:id', (req, res) => {
    const userId = (req.params.id);
res.render('user', { id: userId });
  });

  app.get('/welcome', (req, res) => {
     res.send('Welcome to the welcome page!'); 
    });
  app.get('/users/:id/details', (req, res) => {
     const userId = (req.params.id);
      res.send(`User ID: ${userId} details`); 
    });
  app.get('/search', (req, res) => { 
    const query = req.query; 
    res.send(`Search query: ${query.term}`);
 });
  app.get('/users', 
      (req, res, next) => { 
          
          next(); 
      }, 
      (req, res) => { 
         
          res.send('Users list'); 
      }
  );
  app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'sample-image.jpg');
    res.download(filePath, 'downloaded-image.jpg', (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
        } else {
            console.log('File downloaded successfully');
        }
    });
});
  
  app.listen(3001, () => { 
    console.log('Server listening on port 3001');
 })
  
