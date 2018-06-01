module.exports = {
  entry: './src/withSpeech.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'withSpeech.js',
    library: 'withSpeech',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  }
}

