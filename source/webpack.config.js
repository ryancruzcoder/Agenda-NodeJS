const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './backend/main.js',
    output: {
        path: path.resolve(__dirname, 'frontend', 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    }

}