import webpack = require('webpack')
import merge = require('webpack-merge')
import CopyWebpackPlugin = require('copy-webpack-plugin')
import path = require('path')

// webpack.Configuration.mode must be 'production' or 'development' in type system.
const MODE = process.env.NODE_ENV === 'production'
  ? 'production' : 'development'

const resolve = (s: string): string => path.resolve(__dirname, s)

const common: webpack.Configuration = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts']
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  mode: MODE
}

const main: webpack.Configuration = {
  entry: {
    main: './main/index.ts'
  },
  target: 'electron-main',
  node: {
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve('package.json'),
        to: resolve('dist/package.json')
      }
    ])
  ]
}

const renderer: webpack.Configuration = {
  resolve: {
    extensions: ['.ts', '.elm']
  },
  entry: {
    renderer: './renderer/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        use: {
          loader: 'elm-webpack-loader',
          options: MODE === 'production'
            ? {} : { debug: true, warn: true, verbose: true }
        },
        exclude: [/elm-stuff/, /node_modules/]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  target: 'electron-renderer'
}

export default [
  merge(common, main),
  merge(common, renderer)
]
