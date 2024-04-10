import { EventEmitter } from 'events';

/**
 * Clase que extiende de EventEmitter y se encarga de emitir eventos cuando se recibe un mensaje completo
 * Posee un constructor
 */
export class EventEmitterSocket extends EventEmitter {
  /**
   * Constructor de la clase
   * @param connection - instancia de eventmitter que representa la conexion
   */
  constructor(connection: EventEmitter) {
    super();
    let wholeData = '';
    // cuando se reciben datos
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;
      // si incluye CLOSE se recibio el mensjae completo
      if (wholeData.includes('CLOSED"}')) {
        this.emit('request', JSON.parse(wholeData), connection);
      }
    });
    // Cuando la conexion se cierra
    connection.on('close', () => {
      this.emit('close');
    });
  }
}