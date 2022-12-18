/**
 * @description a plugin created for using Socket.io in the Member Check In/Out Vue app
 */

import { io } from 'socket.io-client';

export default {
  install: (app: any, { connection, options }: { connection: string; options: any }) => {
    const socket = io(connection, options);

    app.config.globalProperties.$socket = socket;

    app.provide('socket', socket);
  },
};
