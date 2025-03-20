import { createServer } from 'http';
import path from 'path';
import { createFileWithMessage } from '../read_and_write/script.mjs';
import { deleteFileByName } from '../read_and_write/delete.mjs';
import { readFile } from 'fs/promises';

const port = process.env.PORT || 8000;

const getFile = async (req, res, directory, file) => {
  const filepath = path.join(import.meta.dirname, directory, file);
  try {
    const data = await readFile(filepath, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data }));
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'File not found' }));
  }
};

const createFile = async (req, res) => {
  // const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
  // const { searchParams } = url;
  // const content = searchParams.get('content');

  let body = '';

  req.on('data', (chunk) => (body += chunk));
  req.on('end', async () => {
    // console.log(JSON.parse(body).content);
    // return res.end();
    try {
      const filepath = await createFileWithMessage(JSON.parse(body).content);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ message: `Your message was written to: ${filepath}`, filepath }));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Server encountered an error' }));
    }
  });
};

const deleteFile = async (req, res, directory, file) => {
  console.log(path.join(directory, file));
  try {
    await deleteFileByName(path.join(import.meta.dirname, directory, file));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'File deleted' }));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Server encountered an error' }));
  }
  return res.end();
};

const filesRouter = async (req, res, directory, file) => {
  switch (req.method) {
    case 'GET':
      return getFile(req, res, directory, file);
    case 'POST':
      return createFile(req, res);
    case 'DELETE':
      return deleteFile(req, res, directory, file);
    default:
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Method not allowed.' }));
  }
};

const server = createServer((req, res) => {
  const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
  const { pathname } = url;

  const [, route, directory, file] = pathname.split('/');

  switch (route) {
    case 'files':
      filesRouter(req, res, directory, file);
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not found.' }));
  }
});

server.listen(port, () => console.log(`File Message Server listening on port ${port}`));
