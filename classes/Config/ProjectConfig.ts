import StageConfig = require('./StageConfig');
import TaskDefinition = require('../Task/TaskDefinition');

interface ProjectConfig {
    repo: {
        url: string;
        submodules: boolean;
    };
    distDirectory: string; // specifies a relative path below the project root that is to be deployed. defaults to '/' (the project root)
    localTasks: TaskDefinition[];
    remoteTasks: TaskDefinition[];
    stages: {[stageName:string]:StageConfig};
}

export = ProjectConfig;