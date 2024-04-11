// PRUEBAS PARA EL CLIENTE DE SOCKETS

import 'mocha'
import { expect } from 'chai'
import { EventEmitter } from 'events'
import { EventEmitterSocket } from '../../src/EJERCICIO/EventEmitterSocket.js'

// PRUEBAS DEL INDEX O CLIENTE

describe('Index', () => {
  // prueba para comprobar que se crea una instancia de EventEmitter
  it('should create an instance of EventEmitter', () => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    expect(eventEmitterSocket).to.be.instanceOf(EventEmitter)
  })
  // prueba para comprobar que se emite el evento request cuando se recibe un mensaje completo
  it('should emit the request event when a complete message is received', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', (request, connection) => {
      expect(request).to.be.eql({ action: 'add', user: 'user', card: { id: 1, name: 'card' }, close: 'CLOSED' })
      done()
    })
    connection.emit('data', '{"action":"add","user":"user","card":{"id":1,"name":"card"},"close":"CLOSED"}')
  })
  // prueba para comprobar que se emite el evento close cuando la conexión se cierra
  it ('should emit the close event when the connection is closed', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('close', () => {
      done()
    })
    connection.emit('close')
  });
  // prueba para comprobar que no recibe el evento request si no se recibe un mensaje completo
  it('should not emit the request event if a complete message is not received', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    eventEmitterSocket.on('request', () => {
      done('The request event should not be emitted')
    })
    connection.emit('data', '{"action":"add","user":"user","card":{"id":1,"name":"card"}}')
    setTimeout(done, 10)
  });
  // prueba para comprobar que no se devuelven errores si se recibe un mensaje vacío
  it('should not throw errors if an empty message is received', (done) => {
    const connection = new EventEmitter()
    const eventEmitterSocket = new EventEmitterSocket(connection)
    connection.emit('data', '')
    setTimeout(done, 10)
  });
});