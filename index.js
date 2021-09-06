const app = require('./src/app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port:${port}`);
  /* eslint-enable no-console */
});
