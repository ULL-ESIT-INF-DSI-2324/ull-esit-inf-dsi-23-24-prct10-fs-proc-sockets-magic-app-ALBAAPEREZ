// PRUEBAS PARA LA INTERFAZ CARD

import 'mocha';
import { expect } from 'chai';
import { Card } from '../../src/EJERCICIO/Card.js';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';

// pruebas para la interfaz
describe('Card', () => {
  // pruebas para asegurarnos que tiene los atributos correctos
  it('should have the correct attributes', () => {
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
    expect(card).to.have.property('id');
    expect(card).to.have.property('name');
    expect(card).to.have.property('manaCost');
    expect(card).to.have.property('color');
    expect(card).to.have.property('cardType');
    expect(card).to.have.property('rarity');
    expect(card).to.have.property('rulesText');
    expect(card).to.have.property('marketValue');
  });
  // nos aseguramos de que son 8 atributos obligatorios
  it('should have 8 required attributes', () => {
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
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // nos aseguramos de que los atributos opcionales sean opcionales
  it('should have 3 optional attributes', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      power: 1,
      toughness: 1,
      loyalty: 1,
      marketValue: 1
    };
    expect(Object.keys(card)).to.have.lengthOf(11);
  });
  // nos aseguramos que todo es de tipo correcto
  it('should have correct types', () => {
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
    expect(card.id).to.be.a('number');
    expect(card.name).to.be.a('string');
    expect(card.manaCost).to.be.a('number');
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
    expect(card.rulesText).to.be.a('string');
    expect(card.marketValue).to.be.a('number');
  });
  // nos aseguramos que los valores de los enums sean correctos
  it('should have correct enum values', () => {
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
    expect(Object.values(Color)).to.include(card.color);
    expect(Object.values(LineType)).to.include(card.cardType);
    expect(Object.values(Rarity)).to.include(card.rarity);
  });
  // Nos aseguramos que el color es un color del enum y no otro
  it('should have a color from the enum', () => {
    const card: Card = {
      id: 1,
      name: 'test',
      manaCost: 1,
      color: Color.Amarillo,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: 'test',
      marketValue: 1
    };
    expect(Object.values(Color)).to.include(card.color);
  });
  // nos aseguramos de que nada devuelve null
  it('should not have null values', () => {
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
    expect(Object.values(card)).to.not.include(null);
  });
  // NADA devuelve undefined
  it('should not have undefined values', () => {
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
    expect(Object.values(card)).to.not.include(undefined);
  });
  // nos aseguramos de que la interfaz card es una interfaz
  it('should be an interface', () => {
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
    expect(card).to.be.an('object');
  });
  // Comprobamos que la interfaz card no es una funcion
  it('should not be a class', () => {
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
    expect(card).to.not.be.a('function');
  });
  //Nos aseguramos que todos los atributos son diferentes
  it('should have different attributes', () => {
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
    expect(Object.keys(card)).to.have.lengthOf(8);
  });
  // Nos aseguramos que son enumeraciones
  it('should have enums', () => {
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
    expect(card.color).to.be.a('string');
    expect(card.cardType).to.be.a('string');
    expect(card.rarity).to.be.a('string');
  });

});