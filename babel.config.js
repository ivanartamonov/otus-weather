module.exports = api => {
  const isTest = api.env('test');

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: "3",
          // caller.target will be the same as the target option from webpack
          targets: isTest
            ? { node: "current" }
            : { chrome: "58", ie: "11" }
        }
      ]
    ]
  }
}