const path = require('path');

module.exports = {
  mode: 'development',
  entry: './simpleProgram.js', 
  output: {
    path: path.resolve(__dirname, './compiled'),
    filename: 'simpleProgram.js', 
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


