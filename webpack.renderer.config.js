const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push(
    {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
    },
    {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
    },
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
);

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
    },
};
