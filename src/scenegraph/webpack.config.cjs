const path = require('path');
module.exports = { mode: 'development', entry: './completeGraph.js', 
output: { filename: 'completeGraph.js', path: path.resolve(__dirname, './compiled'), },
module: { rules: [ { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/, } ] }, 
resolve: { extensions: ['.ts', '.js'] } };