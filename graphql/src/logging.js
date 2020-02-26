// XXX non-prod only
const customFormatErrorFn = error => {
  console.log("customFormatErrorFn", error);
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split("\n") : [],
    path: error.path
  };
};

module.exports = {
  customFormatErrorFn
};
