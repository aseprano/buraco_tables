import config from './config/config';
import { Microservice } from "@darkbyte/herr";

function getAppNameWithVersion(): string {
    const pjson = require('../package.json');
    return `${pjson.name} v${pjson.version}`;
}

console.log(`Starting ${getAppNameWithVersion()}`);

const ms = new Microservice(config);

ms.run()
    .then(() => console.info('Goodbye!'));
