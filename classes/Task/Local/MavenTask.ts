/// <reference path="../../../definitions/Q/Q.d.ts" />

import AbstractTask = require('./../AbstractTask');
import Task = require('./../Task');
import Q = require('q');

class MavenTask extends AbstractTask implements Task {

    execute() {

        var deferred = Q.defer();

        this.services.log.startSection('Executing maven targets...');
        var mvnTargets = this.getPrefs()['targets'];

        var shellPromise = Q({});
        mvnTargets.forEach((mvnTarget : string) => {

            shellPromise = shellPromise.then((x : any) => {

                return this.services.shell.exec('mvn ' + mvnTarget).then(() => {

                    this.services.log.info('Executed maven target ' + mvnTarget + '.');
                    return {};

                });

            });

        });

        shellPromise.then(()=> {
                this.services.log.closeSection('Maven targets executed.');
                deferred.resolve(true);
            },
            ( error ) => {
                deferred.reject(error);
            });

        return deferred.promise;
    }
}

export = MavenTask;