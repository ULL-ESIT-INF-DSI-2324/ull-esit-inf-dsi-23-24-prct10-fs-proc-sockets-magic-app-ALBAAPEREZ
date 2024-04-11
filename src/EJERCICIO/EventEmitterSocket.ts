import { EventEmitter } from 'events';

/**
 * Clase que extiende de EventEmitter y se encarga de emitir eventos cuando se recibe un mensaje completo
 * Posee un constructor que recibe una conexion y se encarga de recibir los datos de la conexion y emitir un evento cuando se recibe un mensaje completo
 * @extends EventEmitter clase de node.js de la que hereda
 * @param connection - instancia de eventmitter que representa la conexion
 * @event request - evento que se emite cuando se recibe un mensaje completo
 * @event close - evento que se emite cuando la conexion se cierra
 * @function on - metodo de EventEmitter que se encarga de escuchar los eventos
 */
export class EventEmitterSocket extends EventEmitter {
  /**
   * Constructor de la clase EventEmitterSocket
   * Se encarga de recibir los datos de la conexion y emitir un evento cuando se recibe un mensaje completo
   * @param connection - instancia de eventmitter que representa la conexion
   */
  constructor(connection: EventEmitter) {
    super();
    let buffer = '';
    // cuando se reciben datos
    connection.on('data', (dataChunk) => {
      buffer += dataChunk;
      // si incluye CLOSE se recibio el mensjae completo
      if (buffer.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(buffer), connection);
      }
    });
    // Cuando la conexion se cierra
    connection.on('close', () => {
      this.emit('close');
    });
  }
}