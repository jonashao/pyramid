
require('babel-register');
const Koa = require("koa");
const app = new Koa();
const cors = require('koa-cors');
const session = require('koa-session');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('./routes')
const json = require('koa-json')

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
onerror(app)

app.keys = ['some secret'];

const CONFIG = {
  keyy:'koa:sess',
  maxAge:86400000,
  overWrite:true,
  httpOnly:true,
  rolling:false,
  renew:false,
  siged:true
};

app.use(session(CONFIG,app));
// middlewares
app.use(bodyparser({
enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(cors())

// export default router;
app.use(router.routes()).use(router.allowedMethods());

app.listen(8000);

app.on("error", onError);
app.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log("on listnening");
  var addr = app.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

