#!/usr/bin/env node
/**
 * `exponential` command.
 * Execution env: Client (CLI)
 *
 * Use of Exponential.io requires a license.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';

var usageStatement =
    [
        '',
        'Usage: exponential [TYPE] [LAYER] --mdf \'path\'',
        '',
        'Create an MDF file',
        'Usage: exponential --create-mdf',
        '',
        'Initialize a project directory',
        'Usage: exponential --init',
        '',
        'Create or update your config file',
        'Usage: exponential --config',
        '',
        'TYPE',
        '    --project, --api, --angular, --express, --mongoose',
        '',
        'LAYER',
        '    --app, --model, --view, --controller, --router, --navbar, --service',
        '',
        'Layer is dependent on application type. For example, if application',
        'type is --angular, then --controller will create an Angular',
        'controller.'
    ].join('\n');

var argv = require('optimist')
    .usage(usageStatement)
    .boolean([
        'project',
        'api',
        'express',
        'angular',
        'mongoose',
        'app',
        'model',
        'view',
        'controller',
        'router',
        'navbar',
        'service',
        'init',
        'config',
        'create-mdf'
    ])
    .describe('create-mdf', 'Create an MDF file')
    .describe('init', 'Initialize a project directory')
    .describe('config', 'Create or update your config file')
    .describe('project', 'Create a new Exponential project')
    .describe('api', 'Create an Express API module')
    .describe('angular', 'Create an Angular app or module')
    .describe('express', 'Create an Express module')
    .describe('app', 'Create an app skeleton of type TYPE')
    .describe('model', 'Create a model')
    .describe('view', 'Create a view')
    .describe('controller', 'Create a controller')
    .describe('router', 'Create a router and inject routes')
    .describe('navbar', 'Inject a URL into the navbar')
    .describe('service', 'Create a service')
    .describe('mdf', 'Module Definition Format (MDF) file')
    .string('mdf')
    .default('mdf', '.')
    .demand(['mdf'])
    .argv;

//var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var yoGenerator = '';

/**
 * Check that --mdf was specified on the command line for all commands except
 * `--init` and `--config`. This is a bit of a hack on Optimist as Optimist does
 * not have an option to make an argument conditionally required.
 *
 * @param mdf Path to the mdf file specified on the command line.
 */
function checkMdf(mdf) {
    if (mdf === '.') {
        require('optimist').usage(usageStatement).showHelp();
        process.exit(1);
    }
}

// Ensure that the user has provided a path to an MDF file. The only exceptions
// that do not require an MDF file are a.) Initializing a new project directory,
// b.) Updating the config file, or c.) When creating an MDF file.
if (!(argv.init) && !(argv.config) && !(argv['create-mdf'])) {
    checkMdf(argv.mdf);
}

// -----------------------------------------------------------------------------
// Administrative Tasks
// -----------------------------------------------------------------------------

if (argv.init) {
    // Initialize a new project.
    // Initialize a project directory by creating the project's outermost
    // directory and by copying in the example MDF files.
    // exponential --init
    // yo exponential:initProject
    yoGenerator = 'initProject';
}

if (argv.config) {
    // Create or update the Exponential.io config file
    // exponential --config
    // yo exponential:configFile
    yoGenerator = 'configFile';
}

if (argv['create-mdf']) {
    // Create or update the Exponential.io config file
    // exponential --create-mdf
    // yo exponential:createMdf
    yoGenerator = 'createMdf';
}

// -----------------------------------------------------------------------------
// Project
// -----------------------------------------------------------------------------

if (argv.project) {
    // Create a new project.
    // exponential --project --mdf 'project'
    // yo exponential --mdf 'project'
    yoGenerator = 'project';
}

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

if (argv.api) {
    if (argv.controller) {
        // Create an Express controller.
        // exponential --api --controller --mdf 'website/contact'
        // yo exponential:apiController --mdf 'website/contact'
        yoGenerator = 'apiController';
    } else if (argv.router) {
        // Create an Express router.
        // exponential --api --router --mdf 'website/contact'
        // yo exponential:apiRouter --mdf 'website/contact'
        yoGenerator = 'apiRouter';
    }
}

// -----------------------------------------------------------------------------
// Angular
// -----------------------------------------------------------------------------

if (argv.angular) {
    if (argv.controller) {
        // Create an Angular controller.
        // exponential --angular --controller --mdf 'crm/companies'
        // yo exponential:angularController --mdf 'crm/companies'
        yoGenerator = 'angularController';
    } else if (argv.router) {
        // Create an Angular router.
        // exponential --angular --router --mdf 'crm/companies'
        // yo exponential:angularRouter --mdf 'crm/companies'
        yoGenerator = 'angularRouter';
    } else if (argv.service) {
        // Create an Angular service.
        // exponential --angular --service --mdf 'crm/companies'
        // yo exponential:angularService --mdf 'crm/companies'
        yoGenerator = 'angularService';
    } else if (argv.navbar) {
        // Inject URL to module's Read All page into the navbar.
        // exponential --angular --navbar --mdf 'crm/companies'
        // yo exponential:angularNavbar --mdf 'crm/companies'
        yoGenerator = 'angularNavbar';
    } else if (argv.view) {
        // Create an Angular view.
        // exponential --angular --view --mdf 'crm/companies'
        // yo exponential:angularView --mdf 'crm/companies'
        yoGenerator = 'angularView';
    } else {
        // Create an Angular app.
        // exponential --angular --app --mdf 'crm/app'
        // yo exponential:angularApp --mdf 'crm/app'
        yoGenerator = 'angularApp';
    }
}

// -----------------------------------------------------------------------------
// Express
// -----------------------------------------------------------------------------

if (argv.express) {
    if (argv.controller) {
        // Create an Express controller.
        // exponential --express --controller --mdf 'website/contact'
        // yo exponential:expressController --mdf 'website/contact'
        yoGenerator = 'expressController';
    } else if (argv.router) {
        // Create an Express router.
        // exponential --express --router --mdf 'website/contact'
        // yo exponential:expressRouter --mdf 'website/contact'
        yoGenerator = 'expressRouter';
    } else if (argv.view) {
        // Create an Express view.
        // exponential --express --view --mdf 'website/contact'
        // yo exponential:expressView --mdf 'website/contact'
        yoGenerator = 'expressView';
    } else if (argv.navbar) {
        // Inject a URL into an Express navbar.
        // exponential --express --navbar --mdf 'website/contact'
        // yo exponential:expressNavbar --mdf 'website/contact'
        yoGenerator = 'expressNavbar';
    }
// I removed Express app b/c it basically copies a small amount of project skel
// boilerplate. It seems to me, that this generator adds little value over
// just copy/pasting a few files.
//    else {
//        // Create an Express app.
//        // exponential --express --app --mdf 'crm/app'
//        // yo exponential:expressApp --mdf 'crm/app'
//        yoGenerator = 'expressApp';
//    }
}

// -----------------------------------------------------------------------------
// Mongoose
// -----------------------------------------------------------------------------

if (argv.mongoose) {
    // Create a Mongoose model
    // exponential --mongoose --mdf 'website/contact'
    // yo exponential:mongooseModel --mdf 'website/contact'
    yoGenerator = 'mongooseModel';
}

// -----------------------------------------------------------------------------
// Run the exponential generator
// -----------------------------------------------------------------------------

spawn('yo', [
    'exponential:' + yoGenerator,
    '--mdf',
    argv.mdf,
    '--skip-install',
    '--insight=false'
], { stdio: 'inherit' });
