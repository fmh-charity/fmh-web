
const path = require("path");
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}
module.exports = {
    entry: `./src/index.js`,
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devServer: {
      // contentBase: path.join(__dirname, `public`),
      open: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: jsLoaders()
        }
      ],
    },
    devtool: `source-map`,
    
  };