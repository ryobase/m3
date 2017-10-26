var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/m3.js',
    },
    resolve:{
        alias: {
            "Utility": path.resolve(__dirname, './src/utility/')
        }
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        library: "m3",
        libraryTarget: "var",
        filename: 'm3.dist.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2016']
                    }
                }]
            }
        ]
    },
    stats: {
        colors: true
    }
}