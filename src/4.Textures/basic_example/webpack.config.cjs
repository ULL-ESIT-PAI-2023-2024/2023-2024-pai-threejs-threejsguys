const path = require('path');
module.exports = { mode: 'development', entry: './basic_texture.js', 
output: { filename: 'basic_texture.js', path: path.resolve(__dirname, './compiled'), },
module: { rules: [ { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/, } ] }, 
resolve: { extensions: ['.ts', '.js'] } };