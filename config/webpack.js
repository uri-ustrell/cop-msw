const path = require('path');
const appRoot = require('app-root-path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const emoji = require('node-emoji');
const rtlConfig = require('./rtl.config');
const proxy = require('./proxy');
const configVars = require('./env.json');

const dirRoot = appRoot.toString();

const createWebpackConfiguration = (env, argv, specific) => {
  const mode = (argv && argv.mode) || 'production';
  const seed = (argv && argv.host === 'localhost') ? { env: configVars.local } : {};

  return {
    entry: `./src/${specific}/index.jsx`,
    devServer: {
      contentBase: './public',
      open: true,
      disableHostCheck: true,
      historyApiFallback: true,
      proxy,
    },
    output: {
      path: path.join(dirRoot, `dist/${specific}`),
      publicPath: '/',
      filename: (mode === 'development') ? 'main.js' : 'main.[contenthash].js',
    },
    module: {
      rules: [
        // SASS
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: (mode === 'development') ? '[path][name]__[local]' : '[hash:base64:5]',
                },
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: './config/postcss.config.js',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['node_modules'],
                },
              },
            },
          ],
        },

        // ESLINT && BABEL
        {
          test: /\.(js|jsx)$/,
          exclude: /nodes_modules/,
          use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
        },
        // HTML
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        react: path.join(dirRoot, 'node_modules', 'react'),
        components: path.resolve(dirRoot, 'src/components/'),
        hooks: path.resolve(dirRoot, 'src/hooks/'),
        services: path.resolve(dirRoot, 'src/services/'),
        utils: path.resolve(dirRoot, 'src/utils/'),
      },
      extensions: ['.js', '.jsx', 'json'],
    },
    plugins: (() => {
      const plugins = [
        new MiniCssExtractPlugin({
          filename: (mode === 'development') ? 'styles.css' : 'styles.[contenthash].css',
        }),
        new StyleLintPlugin({
          files: ['src/**/*.scss', 'src/**/*.css'],
        }),
        new HtmlWebpackPlugin({
          template: './public/index.ejs',
          inject: false,
          dir: process.env.RTL === 'true' ? 'rtl' : 'ltr',
        }),
        new DotEnv({
          safe: false,
          silent: true,
        }),
        new WebpackRTLPlugin(rtlConfig()),
        new ManifestPlugin({
          fileName: path.join(dirRoot, `dist/${specific}/`, 'manifest.json'),
          map: (FileDescriptor) => {
            const ModifiedFileDescriptor = FileDescriptor;
            if (FileDescriptor.path.includes('rtl')) {
              ModifiedFileDescriptor.name = ModifiedFileDescriptor.name.replace(
                '.',
                '.rtl.',
              );
            }
            return ModifiedFileDescriptor;
          },
          seed,
        }),
        new CleanWebpackPlugin(),
        new ProgressBarPlugin({
          format: `Bundling application... ${emoji.get('package')} [${chalk.yellow.bold(':bar')}] ${chalk.yellow.bold(':percent')} (${chalk.blue.bold(':elapsed seconds')})`,
          clear: false,
        }),
      ];
      if (env) {
        if (env.html) {
          plugins.push(
            new HtmlWebpackPlugin({
              template: './public/index.html',
              minify: {
                collapseWhitespace: true,
                removeComments: true,
              },
            }),
          );
        }
        if (env.analyzer) {
          plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: path.join(dirRoot, 'analyzer', 'report.html'),
            }),
          );
        }
      }
      return plugins;
    })(),
  };
};

module.exports = createWebpackConfiguration;
