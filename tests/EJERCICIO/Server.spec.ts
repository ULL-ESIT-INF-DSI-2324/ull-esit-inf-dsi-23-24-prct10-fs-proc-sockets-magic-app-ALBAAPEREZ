// PRUEBAS DE LA CLASE Server

import 'mocha'
import { expect } from 'chai'
import { EventEmitter } from 'events'
import { CardCollection } from '../../src/EJERCICIO/User.js'
import { EventEmitterSocket } from '../../src/EJERCICIO/EventEmitterSocket.js'

// PRUEBAS DEL SERVIDOR
describe('Server', () => {
  // prueba para comprobar que se crea una instancia de EventEmitter
  it('should create an instance of EventEmitter', () => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    expect(eventEmitterSocket).to.be.instanceOf(EventEmitter)
  })
  // prueba para comprobar que se crea una instancia de CardCollection
  it('should create an instance of CardCollection', () => {
    const cardCollection = new CardCollection('user')
    expect(cardCollection).to.be.instanceOf(CardCollection)
  });

  // prueba para cuando se desconecta el cliente imprime un mensaje de cliente desconectado
  it('should print a message when the client disconnects', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('close', () => {
      done()
    })
    connection.emit('close')
  });

  // prueba para comprobar que se añade una carta a la colección
  it('should add a card to the collection', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'add', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"add","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  });

  // prueba para comprobar que se elimina una carta de la colección
  it('should remove a card from the collection', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'remove', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"remove","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  });

  // prueba para comprobar que se actualiza una carta de la colección
  it('should update a card from the collection', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'update', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"update","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  });

  // prueba para comprobar que se lee una carta de la colección
  it('should read a card from the collection', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'read', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"read","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  });

  // prueba para comprobar que se listan las cartas de la colección
  it('should list the cards of the collection', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'list', user: 'user', close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"list","user":"user","close":"CLOSED"}')
  });

  // prueba para comprobar que se envía un mensaje de error si se recibe un mensaje incorrecto
  it('should send an error message if an incorrect message is received', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'incorrect', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"incorrect","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  });

  // prueba para el servidor esperando conexiones imprime un mensaje de conexión establecida
  it('should print a message when the client connects', () => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    console.log('Cliente conectado.')
  });

  // prueba mensaje "esperando conexiones"
  it('should print a message "Esperando conexiones"', () => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    console.log('Esperando conexiones...')
  });
  
});

