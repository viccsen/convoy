module.exports = {
    plugins: [
        'gatsby-theme-docz',
        {
            resolve: `gatsby-plugin-less`,
            options: {
                javascriptEnabled: true,
            },
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // Add any options here
            },
        },
        // {
        //     resolve: `gatsby-source-filesystem`,
        //     options: {
        //         name: `documentation`,
        //         path: `${__dirname}/documentation/`,
        //     },
        // },
    ],
}
