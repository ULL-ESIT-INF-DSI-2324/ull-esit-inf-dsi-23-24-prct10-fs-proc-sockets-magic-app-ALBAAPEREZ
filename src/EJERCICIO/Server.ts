import net from 'net';
import { CardCollection } from './User.js';
import { EventEmitterSocket } from './EventEmitterSocket.js';

/**
 * Servidor que gestiona la colección de cartas de los usuarios
 * Los comandos disponibles son:
 * - add: Añade una carta a la colección de un usuario
 * - remove: Elimina una carta de la colección de un usuario
 * - update: Actualiza una carta de la colección de un usuario
 * - read: Lee una carta de la colección de un usuario
 * - list: Lista todas las cartas de la colección de un usuario
 */
const server = net.createServer(connection => {
  // Cuando un cliente se conecta imprime un mensaje
  console.log('Cliente conectado.');
  // Crear una instancia de EventEmitterSocket para gestionar la conexión
  const eventEmitterSocket = new EventEmitterSocket(connection);
  let requestData = '';
  // Escuchar el evento 'request' para gestionar las peticiones
  /**
   * Escuchar el evento 'request' para gestionar las peticiones
   * Imprime un mensaje cuando se recibe una petición completa
   * Procesa la petición y envía una respuesta al cliente
   * @event request - evento que se emite cuando se recibe una petición completa
   * @param request - petición recibida
   * @param connection - conexión del cliente
   */
  eventEmitterSocket.on('request', (request, connection) => {
    console.log('Petición completa recibida:', request);
    // Procesar la petición y enviar una respuesta
    try {
      const cardRequest = JSON.parse(request);
      const cardCollection = new CardCollection(cardRequest.user);
      let answer = '';
      // Realizar la acción correspondiente según el comando recibido
      switch (cardRequest.action) {
        case 'add':
          cardCollection.addCard(cardRequest.card);
          answer = `Card with ID ${cardRequest.card.id} added to the collection of ${cardRequest.user}.`;
          break;
        case 'remove':
          cardCollection.removeCard(cardRequest.card.id);
          answer = `Card with ID ${cardRequest.card.id} removed from the collection of ${cardRequest.user}.`;
          break;
        case 'update':
          cardCollection.updateCard(cardRequest.card);
          answer = `Card with ID ${cardRequest.card.id} updated in the collection of ${cardRequest.user}.`;
          break;
        case 'read':
          const cardToRead = cardCollection.readCard(cardRequest.card.id);
          answer = `Card with ID ${cardRequest.card.id} read from the collection of ${cardRequest.user}: ${JSON.stringify(cardToRead)}.`;
          break;
        case 'list':
          const cards = cardCollection.listCards();
          answer = `Cards in the collection of ${cardRequest.user}: ${JSON.stringify(cards)}.`;
          break;
        default:
          answer = `Unknown command: ${cardRequest.action}`;
          break;
      }
      // Enviar la respuesta al cliente
      const responseObject = { response: answer };
      const responseString = JSON.stringify(responseObject);
      connection.write(responseString);
    } catch (error) {
      const responseData = { error: error.message };
      const responseString = JSON.stringify(responseData);
      connection.write(responseString);
    }
    // Cerrar la conexión después de enviar la respuesta
    connection.end();
  });

  /**
   * Escuchar el evento 'close' para gestionar la desconexión del cliente
   * Imprime un mensaje cuando el cliente se desconecta
   * @event close - evento que se emite cuando la conexión se cierra
   */
  eventEmitterSocket.on('close', () => {
    console.log('Cliente desconectado.');
  });
});

/**
 * Servidor escuchando en el puerto 60300
 * Imprime un mensaje cuando el servidor está esperando conexiones
 * @param 60300 - puerto en el que escucha el servidor
 */
server.listen(60300, () => {
  console.log('Servidor esperando conexiones...');
});
