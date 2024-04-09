// PRUEBAS PARA LA CLASE FILEMANAGER

import 'mocha';
import { expect } from 'chai';
import { FileManager } from '../../src/EJERCICIO/FileManager.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import fs from 'fs';

// pruebas para la clase
describe('FileManager', () => {
  const username = 'testUser';
  const fileManager = new FileManager(username);
  const card: Card = {
    id: 1,
    name: 'test',
    manaCost: 1,
    color: Color.Blanco,
    cardType: LineType.Criatura,
    rarity: Rarity.Rara,
    rulesText: 'test',
    marketValue: 1
  };
  const collection = new Map<number, Card>();
  collection.set(card.id, card);
  // debe guardar la coleccion en un fichero
  it('should save the collection to a file', () => {
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    expect(fs.existsSync(filePath)).to.be.true;
  });
  // PRUEBA PARA EL CONSTRUCTOR
  it('should create a new instance of FileManager', () => {
    expect(fileManager).to.be.an.instanceOf(FileManager);
  });
  // el constructor debe 
  it('should have a username', () => {
    expect(fileManager).to.have.property('username');
  });
  // prueba para el getFilePath
  it('should return the path of the file', () => {
    const filePath = fileManager.getFilePath(card.id);
    expect(filePath).to.be.a('string');
  });
  // TODOS los ficheros deben terminar en.json
  it('should return a path that ends in .json', () => {
    const filePath = fileManager.getFilePath(card.id);
    expect(filePath.endsWith('.json')).to.be.true;
  });
  // pruebas para la funcion save
  it('should save the collection', () => {
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    expect(fs.existsSync(filePath)).to.be.true;
  });

  // Test para comprobar si se escribe correctamente los datos de la carta en el archivo
  it('should correctly write the card data to the file', () => {
    fileManager.save(collection);
    for (const [cardId, card] of collection) {
      const filePath = fileManager.getFilePath(cardId);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const cardData = JSON.parse(fileContent);
      expect(cardData).to.deep.equal(card);
    }
  });

  // Test para comprobar si se sobreescribe el archivo si se guarda una carta con el mismo id
  it('should overwrite the existing file if a card with the same id is saved again', () => {
    const card: Card = {
      id: 1,
      name: 'test2',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Encantamiento,
      rarity: Rarity.Mítica,
      rulesText: 'test2',
      marketValue: 2
    };
    collection.set(card.id, card);
    fileManager.save(collection);
    const filePath = fileManager.getFilePath(card.id);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const cardData = JSON.parse(fileContent);
    expect(cardData).to.deep.equal(card);
  });

  // comporbamos que tiene un atributo privado
  it('should have a private attribute', () => {
    expect(fileManager).to.not.have.property('collection');
  });

  // comporbamos que load devuelve un Map 
  it('should return a Map', () => {
    const loadedCollection = fileManager.load();
    expect(loadedCollection).to.be.an.instanceOf(Map);
  });
  // tenemo un getter para el nombre del usuario del directorio
  it('should have a getter for the username', () => {
    const userDir = fileManager.getUserDir();
    const userDirUsername = userDir.split('/').pop(); // assuming userDir is in the format '/path/to/username'
    expect(userDirUsername).to.equal(username);
  });

  // PRUEBA PARA LA FUNCOIN SAVE
  // Test to check if the save method creates the user directory if it does not exist
  it('should create the user directory if it does not exist', () => {
    if (fs.existsSync(fileManager.getUserDir())) {
      fs.rmdirSync(fileManager.getUserDir(), { recursive: true });
    }
    fileManager.save(collection);
    expect(fs.existsSync(fileManager.getUserDir())).to.be.true;
  });

  // Test to check if the save method writes the correct data to the file
  it('should write the correct data to the file', () => {
    fileManager.save(collection);
    for (const [cardId, card] of collection) {
      const filePath = fileManager.getFilePath(cardId);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const cardData = JSON.parse(fileContent);
      expect(cardData).to.deep.equal(card);
    }
  });

  // Test to check if the save method creates a file for each card in the collection
  it('should create a file for each card in the collection', () => {
    fileManager.save(collection);
    for (const cardId of collection.keys()) {
      const filePath = fileManager.getFilePath(cardId);
      expect(fs.existsSync(filePath)).to.be.true;
    }
  });

});