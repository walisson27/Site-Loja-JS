const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        poll: 1000, 
    },
    
    output: {
        filename: 'style.bundle.js',
        chunkFilename: 'style.hash.chunk.js',
        path: path.resolve(__dirname, 'assets/css'),
        publicPath: '/assets/css'
    },

    resolve: {
        extensions: ['.css', '.scss'],
        alias: {
            '~': path.resolve(process.cwd(), 'src'),
        },
    },

    entry: {
        'styles': './scss/main.scss',
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, importLoaders: 1} },
                    { loader: 'postcss-loader', options: {
                        postcssOptions: {
                            plugins: [autoprefixer(), cssnano()]
                        }
                    }},
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.min.css',
            chunkFilename: 'main.chunk.css',
        })
    ],

    stats: {
        children: true,
    }
}