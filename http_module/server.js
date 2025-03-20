import http from 'http';
import { readFileSync, readFile } from 'fs';
import path from 'path';

const homeHTML = readFileSync('./assets/index.html', 'utf8');
const css = readFileSync('./assets/style.css', 'utf8');
const js = readFileSync('./assets/script.js', 'utf8');
const image = readFileSync('./assets/image.png');

const port = process.env.PORT || 8000;

const requestListener = (req, res) => {
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(homeHTML);
};

const server = http.createServer((req, res) => {
  const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
  const { pathname, search, searchParams } = url;
  console.log(pathname);
  console.log(req.method);
  if (pathname.startsWith('/assets')) {
    // CommonJS __dirname
    readFile(path.join(import.meta.dirname, pathname), (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Not found :(</h1>');
      } else {
        res.end(data);
      }
    });
  } else
    switch (pathname) {
      case '/':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(homeHTML);
        break;

      // case '/style.css':
      //   res.statusCode = 200;
      //   res.setHeader('Content-Type', 'text/css');
      //   res.end(css);
      //   break;
      // case '/script.js':
      //   res.statusCode = 200;
      //   res.setHeader('Content-Type', 'text/javascript');
      //   res.end(js);
      //   break;
      // case '/image.png':
      //   res.statusCode = 200;
      //   res.setHeader('Content-Type', 'image/png');
      //   res.end(image);
      //   break;

      case '/andere-seite':
        const input = url.searchParams.get('search');
        const date = new Date().toDateString();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/style.css">
    <script src="/assets/script.js" defer></script>
    <link rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤯</text></svg>">
    <title>Web page Old Style</title>
    <title>Document</title>
  </head>

  <body>
<h1>Andere Seite</h1>
    <form action="/andere-seite">
      <input type="text" name="search">
    </form>
    <br>
    <a href="/">Zurück nach Hause</a>

    ${input && `<p>Du hast das geschrieben: ${input}</p>`}

    <footer>Heute ist: ${date}</footer>

  </body>

</html>
            `);
        break;

      // case '/test':
      //   console.log(url);
      //   const input = url.searchParams.get('velociraptor');
      //   res.end(input);
      //   break;

      default:
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Not found :(</h1>');
    }
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));

// GET /files?content=${}
