import { prodServers } from './environment.conf';

export const environment = {
    production: true,
    appServerUrl: prodServers.appServerUrl,
    fileServerUrl: prodServers.fileServerUrl,
    requestTimeout: prodServers.requestTimeout,
    defaultAvatar: prodServers.defaultAvatar,
    rsaPublicKey: prodServers.rsaPublicKey
};
