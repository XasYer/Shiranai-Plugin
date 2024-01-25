import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url'
import TaskQueue from './TaskQueue.js';
import { Sequelize, DataTypes, Op } from 'sequelize'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(__dirname, 'data.db'),
    logging: false,
})

await sequelize.authenticate()

const taskQueueConfig = 10
let shouldCancel = false
let executeSync

if (taskQueueConfig > 0) {
    const taskQueue = new TaskQueue(taskQueueConfig);
    executeSync = (callback) => {
        if (shouldCancel) {
            return Promise.reject('Cancelled');
        }
        return taskQueue.runTask(callback);
    }
} else {
    executeSync = (callback) => {
        return callback()
    }
}



function resetLock() {
    shouldCancel = true;
    lock = Promise.resolve();
}

export {
    sequelize,
    DataTypes,
    Op,
    executeSync,
}