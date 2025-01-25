import webpack from "webpack";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import {buildPagesList} from "./scripts/buildPagesList";
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin'
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const {
        isDev,
        paths
    } = options

    return [
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].[contenthash:4].css' : 'css/[name].css',
        }),
        new webpack.ProgressPlugin(),
        new webpack.ProvidePlugin({
            LazyLoad: path.resolve(__dirname, '..', '..', 'src', 'js', 'libs', 'lazyload.min.js'),
            AOS: path.resolve(__dirname, '..', '..', 'src', 'js', 'libs', 'aos.js'),
            $: path.resolve(__dirname, '..', '..', 'src', 'js', 'libs', 'jquery-3.6.2.min.js'),
            Swiper: path.resolve(__dirname, '..', '..', 'src', 'js', 'libs', 'swiper-bundle.min.js'),
        }),
        // @ts-ignore
        new SpriteLoaderPlugin(),
        new WatchExternalFilesPlugin({
            files: ['src/**/*.html'],
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: paths.assets,
                    to: paths.buildAssets,
                },
            ],
        }),
        ...buildPagesList(paths),
    ];
}
