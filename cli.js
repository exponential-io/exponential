#!/usr/bin/env node
'use strict';

/**
 * `exponential` command.
 * Execution env: Client (CLI)
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */

/*
    Create a project
    exponential --project --mdf 'project'
 */
var usageStatement =
    [
        '',
        'Usage: $0 [TYPE] [LAYER] --mdf \'path\'',
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
        'service'
    ])
    .describe('project', 'Create a new Exponential project')
    .describe('api', 'Create an Express API')
    .describe('angular', 'Create an Angular app')
    .describe('express', 'Create an Express component')
    .describe('app', 'Create an app skeleton of type TYPE')
    .describe('model', 'Create a model')
    .describe('view', 'Create a view')
    .describe('controller', 'Create a controller')
    .describe('router', 'Create a router and inject routes')
    .describe('navbar', 'Inject a URL into the navbar')
    .describe('service', 'Create a service')
    .describe('mdf', 'Module Definition Format (MDF) file')
    .string('mdf')
    .demand(['mdf'])
    .argv;

//var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var yoGenerator = '';

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
    // Create an API.
    // exponential --api --mdf 'crm/companies'
    // yo exponential:api --mdf 'crm/companies'
    yoGenerator = 'api';
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
