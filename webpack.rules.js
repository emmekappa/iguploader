const in_packager = process.env.npm_lifecycle_script.search(/package/) >= 0;

module.exports = [
    (!in_packager ? {
            test: /\.node$/,
            use: 'node-loader',
        } :
        {
            test: /\.(m?js|node)$/,
            parser: {amd: false},
            use: {
                loader: '@marshallofsound/webpack-asset-relocator-loader',
                options: {
                    outputAssetBase: 'native_modules',
                },
            },
        }),
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        }
    },
    {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
];
