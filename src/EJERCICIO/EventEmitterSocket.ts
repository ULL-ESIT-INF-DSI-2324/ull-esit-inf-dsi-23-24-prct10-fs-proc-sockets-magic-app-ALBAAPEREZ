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
    // Llamar al constructor de la clase padre
    super();
    let buffer = '';
    // cuando se reciben datos
    /**
     * Escuchar el evento 'data' para gestionar los datos recibidos
     * Emite un evento 'request' cuando se recibe un mensaje completo
     * @event data - evento que se emite cuando se reciben datos
     * @param dataChunk - datos recibidos
     * @function JSON.parse - metodo de JSON que convierte una cadena JSON en un objeto
     */
    connection.on('data', (dataChunk) => {
      buffer += dataChunk;
      // si incluye CLOSE se recibio el mensjae completo
      if (buffer.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(buffer), connection);
      }
    });
    // Cuando la conexion se cierra
    /**
     * Escuchar el evento 'close' para gestionar la desconexión del cliente
     * Emite un evento 'close' cuando la conexión se cierra
     * @event close - evento que se emite cuando la conexión se cierra
     */
    connection.on('close', () => {
      this.emit('close');
    });
  }
}