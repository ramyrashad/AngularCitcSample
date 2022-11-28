/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import 'localstorage-polyfill'
import { environment } from 'src/environments/environment';


global['localStorage'] = localStorage;

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const redis = require("redis");

// Use the browser index.html as template for the mock window
const template = fs
  .readFileSync(path.join(join(process.cwd(), 'dist/SSRCict/browser'), 'index.html'))
  .toString();

// Shim for the global window and document objects.
const window = domino.createWindow(template);
global['window'] = window;
global['document'] = window.document;

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/SSRCict/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  // Redis cache client
  const redisClient = redis.createClient();

  // Creates a cache key using the request URL
  const cacheKey: (req: express.Request) => string = (req) =>
    `ssr_${req.originalUrl}_${environment.cashKey}_key`;

  // Universal express-engine
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );
  server.set('view engine', 'html');
  server.set('views', distFolder);


  // Middleware to send a cached response if one exists
  const cachedResponse: express.RequestHandler = (req, res, next) =>
    redisClient.get(cacheKey(req), (error: Error, reply: string) => {
      debugger;
      if (reply?.length) {
        // Cache exists. Send the response.
        res.send(reply);
        //next();
      } else {
        // Use the Universal engine to render a response.
        next();
      }
    });

  // Middleware to render a response using the Universal engine
  const universalRenderer: express.RequestHandler = (req, res) => {
    res.render(
      indexHtml,
      {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      },
      (error: Error, html: string) => {
        if (error) {
          return req.next(error);
        }
        if (res.statusCode === 200) {
          // Cache the rendered HTML
          //redisClient.set(cacheKey(req), html);
        }
        res.send(html);
      }
    );
  };

  // Serve static files from dist/browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  debugger;
  //redisClient.set("Ramy", serverService.Key);

  // All regular routes use the Universal engine
  server.get('*', cachedResponse, universalRenderer);

  return server;
}

function run() {
  debugger;
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  debugger;
  run();
}

export * from './src/main.server';
