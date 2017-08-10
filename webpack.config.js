
//const { join } = require( "path" ), webpack = require( "webpack" );
const webpack = require( "webpack" );

module.exports = {
  entry: "C:\\Gerry\\Progetti .Net\\Nodejs\\chat-app\\app\\renderer.jsx", /* join( __dirname, "app/renderer.jsx" ) */
  target: "electron-renderer",
  output: {
      path: "C:\\Gerry\\Progetti .Net\\Nodejs\\chat-app\\app\\build", /* join( __dirname, "app/build" ) */
      filename:  "renderer.js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [ "es2017", "react" ],
            plugins: [ "transform-class-properties" ]
          }
        }]
      }
    ]
  }
};
