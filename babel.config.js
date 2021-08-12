// babel.config.js
module.exports = function (api) {
    // process.env.NODE_ENV
    const isTest = api.env('test')
    const testConfig = {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                },
            ],
            ['@babel/preset-typescript'],
            ['@babel/preset-react'],
        ],
    }
    const buildConfig = {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    targets: {
                        chrome: '58',
                        ie: '11',
                    },
                },
            ],
            ['@babel/preset-typescript'],
            ['@babel/preset-react'],
        ],
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
    }
    let config = isTest ? testConfig : buildConfig

    return config
}
