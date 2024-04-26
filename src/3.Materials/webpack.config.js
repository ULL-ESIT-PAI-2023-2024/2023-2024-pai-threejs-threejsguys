const path = require('path');

module.exports = {
  mode: 'development',
  entry: './materials.ts', 
  output: {
    path: path.resolve(__dirname, './compiled'),
    filename: 'materials.js', 
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


