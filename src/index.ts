import { Middleware } from '@curveball/core';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export default (): Middleware => {

  return async (ctx, next) => {

    await next();

    const body = ctx.response.body;
    if (React.isValidElement(body)) {
      if (!ctx.response.headers.has('Content-Type')) {
        ctx.response.type = 'text/html; charset=utf-8';
      }
      ctx.response.body = ReactDOMServer.renderToStaticNodeStream(body);
    }

  };

};
