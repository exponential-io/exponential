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
        '    --model, --view, --controller, --router, --service',
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
    .describe('model', 'Create a model')
    .describe('view', 'Create a view')
    .describe('controller', 'Create a controller')
    .describe('router', 'Create a router')
    .describe('service', 'Create a service')
    .describe('mdf', 'Module Definition Format (MDF) file')
    .string('mdf')
    .demand(['mdf'])
    .argv;

var exec = require('child_process').exec;

/**
 * Create a new Exponential project by calling `yo`. 
 * exponential --project --mdf 'project'
 */
var yoArgs = ' --force --skip-install --insight=false';

if (argv.project) {
    // Generate project skeleton
    var yoCmd = 'yo exponential:project --mdf \'' + argv.mdf + '\'' + yoArgs;

    // TODO: CONVERT THE CALLBACK INTO A SHARED FUNCTION
    var yo = exec(yoCmd, function (error, stdout, stderr) {
        // `yo` outputs to both stdout and stderr as part of its normal
        // operation. Keep this .log() statement so that the user knows which
        // files have been created/updated.
        console.log(stdout + '\n' + stderr);
        if (error !== null) {
            console.log('Error: ' + error);
        }
    });
}
