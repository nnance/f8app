import express from 'express';
import MobileDetect from 'mobile-detect';
import path from 'path';

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/player/:id', (req, res) => {
  // const md = new MobileDetect(req.headers['user-agent']);
  // md.is('iPhone')
  res.redirect(`clogii://player?id=${req.params.id}`);
});

app.get('/test', (req, res) => {
  res.render(path.join(__dirname, './views/test'), {});
});

export default app;
