// --publish-quiet was removed in Cucumber 10+; reports are no longer published unless you turn it on
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    //step definitions plus support files (hooks.js with Before/After)
    require: ['features/step_definitions/**/*.js', 'features/support/**/*.js'],
  },
};
