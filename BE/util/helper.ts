import morgan = require('morgan');


export const requestLogger = (request: { method: any; path: any; body: any }, response: any, next: () => void) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};


export const morganPractice = morgan((tokens, req: any, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ');
});

export const unknownEndpoint = (request: any, response: any) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
