// webpack uses node.js to build the application so we can use npm modules and the require module
// any changes saved here require you to re-run the build so changes take place and main.bundle.js is updated with this changes
const path = require('path');
const  webpack  = require('webpack');


// for basic configuration, webpack needs 3 properties: entry, output, mode
module.exports = {
    // the entry point is the roof of the bundle and the beginning of the dependecy graph
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // make sure to install jquery and run the build again
    // because ProvidePlunin is built into webpack, so we need to be sure we're bringing webpack's methods and properties into the config file by importing it above
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    mode: 'development'
};