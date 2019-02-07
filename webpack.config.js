const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const HappyPack = require('happypack');

const pages = JSON.parse(fs.readFileSync('pages.json').toString()).map(pageData => new HtmlWebpackPlugin({
        title: pageData.title,
        filename: `${pageData.name}.html`,
        template: `src/pages/${pageData.name}/${pageData.name}.pug`,
        chunks: ['common']
    })
);

module.exports = function(env, argv) {
    return {
        entry: {
            common: [
                './src/common/common.js',
            ],
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'build'),
            filename: 'js/[name].[hash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.scss$/,
                    use: ['happypack/loader'],
                },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['use:xlink:href', 'link:href', 'meta:href',  ':src', 'img:data-src', 'img:data-popup-src',':data-end-frame', 'object:data', ':data-icon'],
                                interpolate: true,
                            }
                        },
                        'pug-html-loader',
                    ]
                },
                {
                    exclude: /\.(js|s?css|pug|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'media/[name].[hash:8].[ext]'
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    use: [{
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: argv.mode === 'development' ? 'media/sprite.svg' : 'media/sprite.[hash:8].svg',
                        }
                    }]
                },
            ]
        },
        target: "web",
        plugins: [
            new CleanWebpackPlugin(['build']),
            ...pages,
            new SpriteLoaderPlugin({ plainSprite: true }),
            new HappyPack({
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: argv.mode === 'development' ? 'css/[name].css' : 'css/[name].[hash:8].css',
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            })
        ],

        // resolve: {
        //     alias: {
        //         "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        //         "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        //         "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        //         "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        //         "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        //         "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        //         "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
        //     }
        // },
        devServer: {
            host: "0.0.0.0",
        }
    };
}