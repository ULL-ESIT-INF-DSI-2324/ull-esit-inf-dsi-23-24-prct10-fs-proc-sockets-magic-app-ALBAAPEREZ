// PRUEBAS PARA LA ENUMERACION COLOR

import 'mocha';
import { expect } from 'chai';
import { Color } from '../../src/EJERCICIO/EnumerationColor.js';

// pruebas para la enumeración
describe('Color', () => {
  // pruebas para asegurarnos que tiene los colores correctos
  it('should have the correct colors', () => {
    expect(Color).to.have.property('Blanco');
    expect(Color).to.have.property('Azul');
    expect(Color).to.have.property('Rojo');
    expect(Color).to.have.property('Verde');
    expect(Color).to.have.property('Incoloro');
    expect(Color).to.have.property('Multicolor');
    expect(Color).to.have.property('Amarillo');
    expect(Color).to.have.property('Morado');
    expect(Color).to.have.property('Rosa');
    expect(Color).to.have.property('Marron');
    expect(Color).to.have.property('Naranja');
  });
  // Nos aseguramos de que son 12 colores
  it('should have 12 colors', () => {
    expect(Object.keys(Color)).to.have.lengthOf(12);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Color.Blanco).to.be.a('string');
    expect(Color.Azul).to.be.a('string');
    expect(Color.Rojo).to.be.a('string');
    expect(Color.Verde).to.be.a('string');
    expect(Color.Incoloro).to.be.a('string');
    expect(Color.Multicolor).to.be.a('string');
    expect(Color.Amarillo).to.be.a('string');
    expect(Color.Morado).to.be.a('string');
    expect(Color.Rosa).to.be.a('string');
    expect(Color.Marron).to.be.a('string');
    expect(Color.Naranja).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Color.Blanco).not.to.be.a('number');
    expect(Color.Azul).not.to.be.a('number');
    expect(Color.Rojo).not.to.be.a('number');
    expect(Color.Verde).not.to.be.a('number');
    expect(Color.Incoloro).not.to.be.a('number');
    expect(Color.Multicolor).not.to.be.a('number');
    expect(Color.Amarillo).not.to.be.a('number');
    expect(Color.Morado).not.to.be.a('number');
    expect(Color.Rosa).not.to.be.a('number');
    expect(Color.Marron).not.to.be.a('number');
    expect(Color.Naranja).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Color.Blanco).not.to.be.undefined;
    expect(Color.Azul).not.to.be.undefined;
    expect(Color.Rojo).not.to.be.undefined;
    expect(Color.Verde).not.to.be.undefined;
    expect(Color.Incoloro).not.to.be.undefined;
    expect(Color.Multicolor).not.to.be.undefined;
    expect(Color.Amarillo).not.to.be.undefined;
    expect(Color.Morado).not.to.be.undefined;
    expect(Color.Rosa).not.to.be.undefined;
    expect(Color.Marron).not.to.be.undefined;
    expect(Color.Naranja).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Color.Blanco).not.to.be.null;
    expect(Color.Azul).not.to.be.null;
    expect(Color.Rojo).not.to.be.null;
    expect(Color.Verde).not.to.be.null;
    expect(Color.Incoloro).not.to.be.null;
    expect(Color.Multicolor).not.to.be.null;
    expect(Color.Amarillo).not.to.be.null;
    expect(Color.Morado).not.to.be.null;
    expect(Color.Rosa).not.to.be.null;
    expect(Color.Marron).not.to.be.null;
    expect(Color.Naranja).not.to.be.null;
  });
  // no son bool
  it ('should not be bool', () => {
    expect(Color.Blanco).not.to.be.a('boolean');
    expect(Color.Azul).not.to.be.a('boolean');
    expect(Color.Rojo).not.to.be.a('boolean');
    expect(Color.Verde).not.to.be.a('boolean');
    expect(Color.Incoloro).not.to.be.a('boolean');
    expect(Color.Multicolor).not.to.be.a('boolean');
    expect(Color.Amarillo).not.to.be.a('boolean');
    expect(Color.Morado).not.to.be.a('boolean');
    expect(Color.Rosa).not.to.be.a('boolean');
    expect(Color.Marron).not.to.be.a('boolean');
    expect(Color.Naranja).not.to.be.a('boolean');
  });
  // nos aseguramos de que es una enumeracion
  it ('should be an enum', () => {
    expect(Color).to.be.an('object');
  });
  // no es una clase
  it ('should not be a class', () => {
    expect(Color).not.to.be.a('function');
  });
  // nos aseguramos de que no son arrays
  it ('should not be an array', () => {
    expect(Color).not.to.be.an('array');
  });
  // nos aseguramos de que todos los colores son distintos
  it ('should have different colors', () => {
    expect(Color.Blanco).not.to.be.equal(Color.Azul);
    expect(Color.Blanco).not.to.be.equal(Color.Rojo);
    expect(Color.Blanco).not.to.be.equal(Color.Verde);
    expect(Color.Blanco).not.to.be.equal(Color.Incoloro);
    expect(Color.Blanco).not.to.be.equal(Color.Multicolor);
    expect(Color.Blanco).not.to.be.equal(Color.Amarillo);
    expect(Color.Blanco).not.to.be.equal(Color.Morado);
    expect(Color.Blanco).not.to.be.equal(Color.Rosa);
    expect(Color.Blanco).not.to.be.equal(Color.Marron);
    expect(Color.Blanco).not.to.be.equal(Color.Naranja);
    expect(Color.Azul).not.to.be.equal(Color.Rojo);
    expect(Color.Azul).not.to.be.equal(Color.Verde);
    expect(Color.Azul).not.to.be.equal(Color.Incoloro);
    expect(Color.Azul).not.to.be.equal(Color.Multicolor);
    expect(Color.Azul).not.to.be.equal(Color.Amarillo);
    expect(Color.Azul).not.to.be.equal(Color.Morado);
    expect(Color.Azul).not.to.be.equal(Color.Rosa);
    expect(Color.Azul).not.to.be.equal(Color.Marron);
    expect(Color.Azul).not.to.be.equal(Color.Naranja);
    expect(Color.Rojo).not.to.be.equal(Color.Verde);
    expect(Color.Rojo).not.to.be.equal(Color.Incoloro);
    expect(Color.Rojo).not.to.be.equal(Color.Multicolor);
    expect(Color.Rojo).not.to.be.equal(Color.Amarillo);
    expect(Color.Rojo).not.to.be.equal(Color.Morado);
    expect(Color.Rojo).not.to.be.equal(Color.Rosa);
    expect(Color.Rojo).not.to.be.equal(Color.Marron);
    expect(Color.Rojo).not.to.be.equal(Color.Naranja);
    expect(Color.Verde).not.to.be.equal(Color.Incoloro);
    expect(Color.Verde).not.to.be.equal(Color.Multicolor);
    expect(Color.Verde).not.to.be.equal(Color.Amarillo);
    expect(Color.Verde).not.to.be.equal(Color.Morado);
    expect(Color.Verde).not.to.be.equal(Color.Rosa);
    expect(Color.Verde).not.to.be.equal(Color.Marron);
    expect(Color.Verde).not.to.be.equal(Color.Naranja);
    expect(Color.Incoloro).not.to.be.equal(Color.Multicolor);
    expect(Color.Incoloro).not.to.be.equal(Color.Amarillo);
    expect(Color.Incoloro).not.to.be.equal(Color.Morado);
    expect(Color.Incoloro).not.to.be.equal(Color.Rosa);
    expect(Color.Incoloro).not.to.be.equal(Color.Marron);
    expect(Color.Incoloro).not.to.be.equal(Color.Naranja);
    expect(Color.Multicolor).not.to.be.equal(Color.Amarillo);
    expect(Color.Multicolor).not.to.be.equal(Color.Morado);
    expect(Color.Multicolor).not.to.be.equal(Color.Rosa);
    expect(Color.Multicolor).not.to.be.equal(Color.Marron);
    expect(Color.Multicolor).not.to.be.equal(Color.Naranja);
    expect(Color.Amarillo).not.to.be.equal(Color.Morado);
    expect(Color.Amarillo).not.to.be.equal(Color.Rosa);
    expect(Color.Amarillo).not.to.be.equal(Color.Marron);
    expect(Color.Amarillo).not.to.be.equal(Color.Naranja);
    expect(Color.Morado).not.to.be.equal(Color.Rosa);
    expect(Color.Morado).not.to.be.equal(Color.Marron);
    expect(Color.Morado).not.to.be.equal(Color.Naranja);
    expect(Color.Rosa).not.to.be.equal(Color.Marron);
    expect(Color.Rosa).not.to.be.equal(Color.Naranja);
  });
  // el azul devuelve azul
  it ('should return blue', () => {
    expect(Color.Azul).to.be.equal('Azul');
  });
  // el blanco devuelve blanco
  it ('should return white', () => {
    expect(Color.Blanco).to.be.equal('Blanco');
  });
  // el rojo devuelve rojo
  it ('should return red', () => {
    expect(Color.Rojo).to.be.equal('Rojo');
  });
  // el verde devuelve verde
  it ('should return green', () => {
    expect(Color.Verde).to.be.equal('Verde');
  });
  // el incoloro devuelve incoloro
  it ('should return colorless', () => {
    expect(Color.Incoloro).to.be.equal('Incoloro');
  });
  // el multicolor devuelve multicolor
  it ('should return multicolor', () => {
    expect(Color.Multicolor).to.be.equal('Multicolor');
  });
  // el amarillo devuelve amarillo
  it ('should return yellow', () => {
    expect(Color.Amarillo).to.be.equal('Amarillo');
  });
  // el morado devuelve morado
  it ('should return purple', () => {
    expect(Color.Morado).to.be.equal('Morado');
  });
  // el rosa devuelve rosa
  it ('should return pink', () => {
    expect(Color.Rosa).to.be.equal('Rosa');
  });
  // el marron devuelve marron
  it ('should return brown', () => {
    expect(Color.Marron).to.be.equal('Marron');
  });
  // el naranja devuelve naranja
  it ('should return orange', () => {
    expect(Color.Naranja).to.be.equal('Naranja');
  });
});