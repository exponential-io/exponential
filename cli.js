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
        'TYPES',
        '    --project, --api, --angular, --express, --mongoose',
        '',
        'LAYERS',
        '    --app, --model, --view, --controller, --router, --service',
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
    .describe('router', 'Create a router')
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
    yoGenerator = 'project';
}

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

/**
 * Create a new API.
 * exponential --api --mdf 'admin/blog'
 */


// -----------------------------------------------------------------------------
// Angular
// -----------------------------------------------------------------------------


if (argv.angular) {
    if (argv.controller) {

    } else if (argv.router) {

    } else if (argv.service) {

    } else if (argv.view) {

    } else {
        // Create an Angular app.
        // exponential --angular --app --mdf 'crm/app'
        // yo exponential:angularApp --mdf 'crm/app' --skip-install --insight=false
        yoGenerator = 'angularApp';
    }
}

/**
 * Create an Angular controller.
 * exponential --angular --controller --mdf 'crm/companies'
 */


/**
 * Create an Angular router.
 * exponential --angular --router --mdf 'crm/companies'
 */


/**
 * Create an Angular service.
 * exponential --angular --service --mdf 'crm/companies'
 */


/**
 * Create an Angular view.
 * exponential --angular --view --mdf 'crm/companies'
 */


// -----------------------------------------------------------------------------
// Express
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Mongoose
// -----------------------------------------------------------------------------

// Run the exponential generator
spawn('yo', [
    'exponential:' + yoGenerator,
    '--mdf',
    argv.mdf,
    '--skip-install',
    '--insight=false'
], { stdio: 'inherit' });
