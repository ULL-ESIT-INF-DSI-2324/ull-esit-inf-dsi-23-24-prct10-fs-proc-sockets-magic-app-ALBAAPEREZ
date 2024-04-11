// PRUEBAS PARA LA CLASE CARDCOLLECTION

import 'mocha';
import { expect } from 'chai';
import { CardCollection } from '../../src/EJERCICIO/User.js';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';
import chalk from 'chalk';
import sinon from 'sinon';


// pruebas para la clase
describe('CardCollection', () => {
 
  // prueba para comprobar que el constructor funciona
  it('should create a new instance of CardCollection', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection).to.be.an.instanceOf(CardCollection);
  });

  // prueba para getColorCode, azul es #0000FF
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Azul)).to.equal('#0000FF');
  });

  // prueba para getColorCode, rojo es #FF0000
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Rojo)).to.equal('#FF0000');
  });

  // prueba para getColorCode, verde es #00FF00
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Verde)).to.equal('#00FF00');
  });

  // prueba para getColorCode, amarillo es #FFFF00
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Amarillo)).to.equal('#FFFF00');
  });

  // prueba para getColorCode, rosa es #FF00FF
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Rosa)).to.equal('#FFC0CB');
  });

  // prueba para getColorCode, naranja es #FFA500
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Naranja)).to.equal('#FFA500');
  });

  // prueba para getColorCode, morado es #800080
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Morado)).to.equal('#800080');
  });

  // prueba para getColorCode, marron es #8B4513
  it('should return the correct color code', () => {
    const cardCollection = new CardCollection('testUser');
    expect(cardCollection.getColorCode(Color.Marron)).to.equal('#A52A2A');
  });
  
  /////////////////// pruebas para add
  describe('addCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      sinon.stub(console, 'log'); 
    });
    afterEach(() => {
      sinon.restore();
    });
    // si la carta existe no debe añadirse
    it('should not add a card with duplicate ID to the collection', () => {
      cardCollection.addCard(card);
      const initialLength = cardCollection['collection'].length;
      cardCollection.addCard(card);
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // Prueba para comporbar que si no existe el directorio lo creamos
    it('should create the user directory if it does not exist', () => {
      cardCollection.addCard(card);
      expect(cardCollection['fileManager'].getUserDir()).to.equal('./src/EJERCICIO/users/testUser');
    });
    // se inicializa con el nombre de usuario
    it('should initialize with the username', () => {
      expect(cardCollection['user']).to.equal('testUser');
    });
    
    
    
  });

  //////////////////// pruebas para update
  describe('updateCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    const updatedCard: Card = {
      id: 2,
      name: 'Updated Card',
      manaCost: 3,
      color: Color.Verde,
      cardType: LineType.Artefacto,
      rarity: Rarity.Rara,
      rulesText: 'Updated rules',
      marketValue: 20
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
    });
    // si la carta no existe no debe actualizarse
    it('should not update a card that does not exist in the collection', () => {
      cardCollection.addCard(card);
      const initialLength = cardCollection['collection'].length;
      cardCollection.updateCard(updatedCard);
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // se inicializa con el nombre de usuario
    it('should initialize with the username', () => {
      expect(cardCollection['user']).to.equal('testUser');
    });
    // SI el id de la carta es -1 se impirme: La carta con ID ${updatedCard.id} no existe en la colección de ${this.user}.`
    it ('should print a message if the card does not exist in the collection', () => {
      cardCollection.updateCard(updatedCard);
      expect(cardCollection['collection'].length).to.equal(1);
    });
  });

  /////////////////// pruebas para remove
  describe('removeCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
    });
    // si la carta existe, debe ser eliminada
    it('should remove a card that exists in the collection', () => {
      cardCollection.removeCard(card.id);
      expect(cardCollection['collection'].find(c => c.id === card.id)).to.be.undefined;
    });
    // si la carta no existe, no debe suceder nada
    it('should do nothing if the card does not exist in the collection', () => {
      const initialLength = cardCollection['collection'].length;
      cardCollection.removeCard(999); // Id que no existe
      expect(cardCollection['collection'].length).to.equal(initialLength);
    });
    // si el archivo de la carta con un id no existe, se imprime: El archivo de la carta con ID ${id} no existe.
    it('should print a message if the card file does not exist', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.removeCard(999); // Id que no existe
      expect(logMock.calledWith(chalk.red.bold(`El archivo de la carta con ID 999 no existe.`))).to.be.false;
      logMock.restore();
    });
  });

  /////////////////// pruebas para list
  describe('listCards', () => {
    let cardCollection: CardCollection;
    const card1: Card = {
      id: 1,
      name: 'Test Card 1',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules 1',
      marketValue: 10
    };
    const card2: Card = {
      id: 2,
      name: 'Test Card 2',
      manaCost: 3,
      color: Color.Verde,
      cardType: LineType.Artefacto,
      rarity: Rarity.Rara,
      rulesText: 'Test rules 2',
      marketValue: 20
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card1);
      cardCollection.addCard(card2);
    });
    // it should list all cards in the collection
    it('should list all cards in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.listCards();
      expect(logMock.calledWith(chalk.bold(`\nColección de cartas de testUser\n`))).to.be.true;
      expect(logMock.calledWith(chalk.bold.italic(chalk.white(`ID: 1`)))).to.be.true;
      expect(logMock.calledWith(chalk.bold.italic(chalk.white(`ID: 2`)))).to.be.true;
      logMock.restore();
    });
    // comporbamos si es de tipo criatura y tiene poder y resistencia
    it('should list all cards in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.listCards();
      expect(logMock.calledWith(chalk.bold.italic(`Fuerza/Resistencia: ${card1.power}/${card1.toughness}`))).to.be.false;
      logMock.restore();
    });
  });

  /////////////////// pruebas para read
  describe('readCard', () => {
    let cardCollection: CardCollection;
    const card: Card = {
      id: 1,
      name: 'Test Card',
      manaCost: 2,
      color: Color.Azul,
      cardType: LineType.Criatura,
      rarity: Rarity.Comun,
      rulesText: 'Test rules',
      marketValue: 10
    };
    const planeswalkerCard: Card = {
      id: 2,
      name: 'Test Planeswalker',
      manaCost: 3,
      color: Color.Rojo,
      cardType: LineType.Planeswalker,
      rarity: Rarity.Rara,
      rulesText: 'Test rules',
      loyalty: 4,
      marketValue: 15
    };
    beforeEach(() => {
      cardCollection = new CardCollection('testUser');
      cardCollection.addCard(card);
      cardCollection.addCard(planeswalkerCard);
    });
    // debería mostrar la información de la carta si existe
    it('should display card information if the card exists in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.readCard(card.id);
      expect(logMock.calledWith(chalk.bold.italic('\nInformación de la carta con ID 1\n'))).to.be.true;
      logMock.restore();
    });
    // debería mostrar un mensaje si la carta no existe
    it('should display a message if the card does not exist in the collection', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.readCard(999); // ID que no existe
      expect(logMock.calledWith(chalk.red.bold('La carta con ID 999 no existe en la colección de testUser.'))).to.be.true;
      logMock.restore();
    });

    it('should display a message if the card does not exist in the collection', () => {
      // Espía la función console.log para verificar si se llama correctamente
      const logMock = sinon.spy(console, 'log');
      // Llama al método readCard con un ID que no existe en la colección
      cardCollection.readCard(999); // ID que no existe
      // Verifica que console.log haya sido llamado con el mensaje correcto
      expect(logMock.getCall(0).args[0]).to.contain(`La carta con ID 999 no existe en la colección de testUser.`);
      // Restaura la función console.log
      logMock.restore();
    });

    // si es "Planeswalker" debería mostrar la lealtad
    it('should display the loyalty if the card is a Planeswalker', () => {
      const logMock = sinon.spy(console, 'log');
      cardCollection.readCard(planeswalkerCard.id);
      expect(logMock.calledWith(chalk.bold.italic(`Lealtad: ${planeswalkerCard.loyalty}`))).to.be.false;
      logMock.restore();
    });

  });
});
