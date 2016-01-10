app.module('xhr', function () {
  return (options) => {
    if (typeof options === "string") {
      options = {
        url: options
      };
    }

    app.logger.info(`Performing XHR to ${options.url} here`);
  };
});
