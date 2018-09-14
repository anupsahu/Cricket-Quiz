'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

    // MongoDB connection options
    mongo: {
        uri: 'mongodb://liftoff:liftoff1@ds245532.mlab.com:45532/liftoff'
    },

    // Seed database on startup
    seedDB: true

};