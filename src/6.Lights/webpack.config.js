const path = require('path');

module.exports = {
  mode: 'development',
  entry: './lights.ts', 
  output: {
    path: path.resolve(__dirname, './compiled'),
    filename: 'lights.js', 
  },
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  module: {
    rules: [
      {
        test: /\.ts$/, 
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'commonjs', // Configurar ts-loader para compilar a módulos CommonJS
            },
          },
        }, 
        exclude: /node_modules/, 
      },
    ],
  },
};


