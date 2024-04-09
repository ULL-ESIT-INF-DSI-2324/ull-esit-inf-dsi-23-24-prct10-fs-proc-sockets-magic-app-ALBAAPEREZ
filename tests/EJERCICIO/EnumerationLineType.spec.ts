//PRUEBAS PARA LA ENUMERACION LINETYPE

import 'mocha';
import { expect } from 'chai';
import { LineType } from '../../src/EJERCICIO/EnumerationLineType.js';

// pruebas para la enumeración
describe('LineType', () => {
  // pruebas para asegurarnos que tiene los tipos de cartas correctos
  it('should have the correct line types', () => {
    expect(LineType).to.have.property('Tierra');
    expect(LineType).to.have.property('Criatura');
    expect(LineType).to.have.property('Encantamiento');
    expect(LineType).to.have.property('Conjuro');
    expect(LineType).to.have.property('Instantáneo');
    expect(LineType).to.have.property('Artefacto');
    expect(LineType).to.have.property('Planeswalker');
  });
  // Nos aseguramos de que son 7 tipos de cartas
  it('should have 7 line types', () => {
    expect(Object.keys(LineType)).to.have.lengthOf(7);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(LineType.Tierra).to.be.a('string');
    expect(LineType.Criatura).to.be.a('string');
    expect(LineType.Encantamiento).to.be.a('string');
    expect(LineType.Conjuro).to.be.a('string');
    expect(LineType.Instantáneo).to.be.a('string');
    expect(LineType.Artefacto).to.be.a('string');
    expect(LineType.Planeswalker).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(LineType.Tierra).not.to.be.a('number');
    expect(LineType.Criatura).not.to.be.a('number');
    expect(LineType.Encantamiento).not.to.be.a('number');
    expect(LineType.Conjuro).not.to.be.a('number');
    expect(LineType.Instantáneo).not.to.be.a('number');
    expect(LineType.Artefacto).not.to.be.a('number');
    expect(LineType.Planeswalker).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(LineType.Tierra).not.to.be.undefined;
    expect(LineType.Criatura).not.to.be.undefined;
    expect(LineType.Encantamiento).not.to.be.undefined;
    expect(LineType.Conjuro).not.to.be.undefined;
    expect(LineType.Instantáneo).not.to.be.undefined;
    expect(LineType.Artefacto).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(LineType.Tierra).not.to.be.null;
    expect(LineType.Criatura).not.to.be.null;
    expect(LineType.Encantamiento).not.to.be.null;
    expect(LineType.Conjuro).not.to.be.null;
    expect(LineType.Instantáneo).not.to.be.null;
    expect(LineType.Artefacto).not.to.be.null;
    expect(LineType.Planeswalker).not.to.be.null;
  });
  // no son bool
  it ('should not be boolean', () => {
    expect(LineType.Tierra).not.to.be.a('boolean');
    expect(LineType.Criatura).not.to.be.a('boolean');
    expect(LineType.Encantamiento).not.to.be.a('boolean');
    expect(LineType.Conjuro).not.to.be.a('boolean');
    expect(LineType.Instantáneo).not.to.be.a('boolean');
    expect(LineType.Artefacto).not.to.be.a('boolean');
    expect(LineType.Planeswalker).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(LineType.Tierra).not.to.be.an('array');
    expect(LineType.Criatura).not.to.be.an('array');
    expect(LineType.Encantamiento).not.to.be.an('array');
    expect(LineType.Conjuro).not.to.be.an('array');
    expect(LineType.Instantáneo).not.to.be.an('array');
    expect(LineType.Artefacto).not.to.be.an('array');
    expect(LineType.Planeswalker).not.to.be.an('array');
  });
  // comporbamos que es una enumeracion
  it ('should be an enumeration', () => {
    expect(LineType).to.be.an('object');
  });
  // comporbamos que no es una funcion
  it ('should not be a function', () => {
    expect(LineType).not.to.be.a('function');
  });
  // comporbamos que todos los tipos son distintos
  it ('should have different types', () => {
    expect(LineType.Tierra).not.to.be.equal(LineType.Criatura);
    expect(LineType.Tierra).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Tierra).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Tierra).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Tierra).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Tierra).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Criatura).not.to.be.equal(LineType.Encantamiento);
    expect(LineType.Criatura).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Criatura).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Criatura).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Criatura).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Conjuro);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Encantamiento).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Instantáneo);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Conjuro).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Artefacto);
    expect(LineType.Instantáneo).not.to.be.equal(LineType.Planeswalker);
    expect(LineType.Artefacto).not.to.be.equal(LineType.Planeswalker);
  });
  // comprobamos que conjuro devuelve Conjuro
  it ('should return Conjuro', () => {
    expect(LineType.Conjuro).to.be.equal('Conjuro');
  });
  // comprobamos que criatura devuelve Criatura
  it ('should return Criatura', () => {
    expect(LineType.Criatura).to.be.equal('Criatura');
  });
  // comprobamos que tierra devuelve Tierra
  it ('should return Tierra', () => {
    expect(LineType.Tierra).to.be.equal('Tierra');
  });
  // comprobamos que encantamiento devuelve Encantamiento
  it ('should return Encantamiento', () => {
    expect(LineType.Encantamiento).to.be.equal('Encantamiento');
  });
  // comprobamos que instantaneo devuelve Instantáneo
  it ('should return Instantáneo', () => {
    expect(LineType.Instantáneo).to.be.equal('Instantáneo');
  });
  // comprobamos que artefacto devuelve Artefacto
  it ('should return Artefacto', () => {
    expect(LineType.Artefacto).to.be.equal('Artefacto');
  });
  // comprobamos que planeswalker devuelve Planeswalker
  it ('should return Planeswalker', () => {
    expect(LineType.Planeswalker).to.be.equal('Planeswalker');
  });
  // comprbamos que no devuelve un valor incorrecto
  it ('should not return an incorrect value', () => {
    expect(LineType.Tierra).not.to.be.equal('Criatura');
    expect(LineType.Tierra).not.to.be.equal('Encantamiento');
    expect(LineType.Tierra).not.to.be.equal('Conjuro');
    expect(LineType.Tierra).not.to.be.equal('Instantáneo');
    expect(LineType.Tierra).not.to.be.equal('Artefacto');
    expect(LineType.Tierra).not.to.be.equal('Planeswalker');
    expect(LineType.Criatura).not.to.be.equal('Encantamiento');
    expect(LineType.Criatura).not.to.be.equal('Conjuro');
    expect(LineType.Criatura).not.to.be.equal('Instantáneo');
    expect(LineType.Criatura).not.to.be.equal('Artefacto');
    expect(LineType.Criatura).not.to.be.equal('Planeswalker');
    expect(LineType.Encantamiento).not.to.be.equal('Conjuro');
    expect(LineType.Encantamiento).not.to.be.equal('Instantáneo');
    expect(LineType.Encantamiento).not.to.be.equal('Artefacto');
    expect(LineType.Encantamiento).not.to.be.equal('Planeswalker');
    expect(LineType.Conjuro).not.to.be.equal('Instantáneo');
    expect(LineType.Conjuro).not.to.be.equal('Artefacto');
    expect(LineType.Conjuro).not.to.be.equal('Planeswalker');
    expect(LineType.Instantáneo).not.to.be.equal('Artefacto');
    expect(LineType.Instantáneo).not.to.be.equal('Planeswalker');
    expect(LineType.Artefacto).not.to.be.equal('Planeswalker');
  });
});