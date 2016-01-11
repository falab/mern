zframe.module('xhr', function () {
  return (options) => {
    if (typeof options === "string") {
      options = {
        url: options
      };
    }

    zframe.logger.info(`Performing XHR to ${options.url} here`);
  };
});
