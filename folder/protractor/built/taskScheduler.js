"use strict";
var configParser_1 = require("./configParser");
/**
 * The taskScheduler keeps track of the spec files that needs to run next
 * and which task is running what.
 */
var TaskQueue = (function () {
    // A queue of specs for a particular capacity
    function TaskQueue(capabilities, specLists) {
        this.capabilities = capabilities;
        this.specLists = specLists;
        this.numRunningInstances = 0;
        this.specsIndex = 0;
        this.maxInstance = capabilities.maxInstances || 1;
    }
    return TaskQueue;
}());
exports.TaskQueue = TaskQueue;
var TaskScheduler = (function () {
    /**
     * A scheduler to keep track of specs that need running and their associated
     * capabilities. It will suggest a task (combination of capabilities and spec)
     * to run while observing the following config rules:
     * multiCapabilities, shardTestFiles, and maxInstance.
     * Precondition: multiCapabilities is a non-empty array
     * (capabilities and getCapabilities will both be ignored)
     *
     * @constructor
     * @param {Object} config parsed from the config file
     */
    function TaskScheduler(config) {
        this.config = config;
        var excludes = configParser_1.ConfigParser.resolveFilePatterns(config.exclude, true, config.configDir);
        var allSpecs = configParser_1.ConfigParser.resolveFilePatterns(configParser_1.ConfigParser.getSpecs(config), false, config.configDir)
            .filter(function (path) {
            return excludes.indexOf(path) < 0;
        });
        var taskQueues = [];
        config.multiCapabilities.forEach(function (capabilities) {
            var capabilitiesSpecs = allSpecs;
            if (capabilities.specs) {
                var capabilitiesSpecificSpecs = configParser_1.ConfigParser.resolveFilePatterns(capabilities.specs, false, config.configDir);
                capabilitiesSpecs = capabilitiesSpecs.concat(capabilitiesSpecificSpecs);
            }
            if (capabilities.exclude) {
                var capabilitiesSpecExcludes_1 = configParser_1.ConfigParser.resolveFilePatterns(capabilities.exclude, true, config.configDir);
                capabilitiesSpecs = capabilitiesSpecs.filter(function (path) {
                    return capabilitiesSpecExcludes_1.indexOf(path) < 0;
                });
            }
            var specLists = [];
            // If we shard, we return an array of one element arrays, each containing
            // the spec file. If we don't shard, we return an one element array
            // containing an array of all the spec files
            if (capabilities.shardTestFiles) {
                capabilitiesSpecs.forEach(function (spec) {
                    specLists.push([spec]);
                });
            }
            else {
                specLists.push(capabilitiesSpecs);
            }
            capabilities.count = capabilities.count || 1;
            for (var i = 0; i < capabilities.count; ++i) {
                taskQueues.push(new TaskQueue(capabilities, specLists));
            }
        });
        this.taskQueues = taskQueues;
        this.rotationIndex = 0; // Helps suggestions to rotate amongst capabilities
    }
    /**
     * Get the next task that is allowed to run without going over maxInstance.
     *
     * @return {{capabilities: Object, specs: Array.<string>, taskId: string,
     * done: function()}}
     */
    TaskScheduler.prototype.nextTask = function () {
        var _loop_1 = function (i) {
            var rotatedIndex = ((i + this_1.rotationIndex) % this_1.taskQueues.length);
            var queue = this_1.taskQueues[rotatedIndex];
            if (queue.numRunningInstances < queue.maxInstance &&
                queue.specsIndex < queue.specLists.length) {
                this_1.rotationIndex = rotatedIndex + 1;
                ++queue.numRunningInstances;
                var taskId = '' + rotatedIndex + 1;
                if (queue.specLists.length > 1) {
                    taskId += '-' + queue.specsIndex;
                }
                var specs = queue.specLists[queue.specsIndex];
                ++queue.specsIndex;
                return { value: {
                        capabilities: queue.capabilities,
                        specs: specs,
                        taskId: taskId,
                        done: function () {
                            --queue.numRunningInstances;
                        }
                    } };
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.taskQueues.length; ++i) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return null;
    };
    /**
     * Get the number of tasks left to run or are currently running.
     *
     * @return {number}
     */
    TaskScheduler.prototype.numTasksOutstanding = function () {
        var count = 0;
        this.taskQueues.forEach(function (queue) {
            count += queue.numRunningInstances + (queue.specLists.length - queue.specsIndex);
        });
        return count;
    };
    /**
     * Get maximum number of concurrent tasks required/permitted.
     *
     * @return {number}
     */
    TaskScheduler.prototype.maxConcurrentTasks = function () {
        if (this.config.maxSessions && this.config.maxSessions > 0) {
            return this.config.maxSessions;
        }
        else {
            var count_1 = 0;
            this.taskQueues.forEach(function (queue) {
                count_1 += Math.min(queue.maxInstance, queue.specLists.length);
            });
            return count_1;
        }
    };
    /**
     * Returns number of tasks currently running.
     *
     * @return {number}
     */
    TaskScheduler.prototype.countActiveTasks = function () {
        var count = 0;
        this.taskQueues.forEach(function (queue) {
            count += queue.numRunningInstances;
        });
        return count;
    };
    return TaskScheduler;
}());
exports.TaskScheduler = TaskScheduler;
