// PRUEBAS PARA LA ENUMERACION RARITY

import 'mocha';
import { expect } from 'chai';
import { Rarity } from '../../src/EJERCICIO/EnumerationRarity.js';

// pruebas para la enumeración
describe('Rarity', () => {
  // pruebas para asegurarnos que tiene las rarezas correctas
  it('should have the correct rarities', () => {
    expect(Rarity).to.have.property('Comun');
    expect(Rarity).to.have.property('Infrecuente');
    expect(Rarity).to.have.property('Rara');
    expect(Rarity).to.have.property('Mítica');
  });
  // Nos aseguramos de que son 4 rarezas
  it('should have 4 rarities', () => {
    expect(Object.keys(Rarity)).to.have.lengthOf(4);
  });
  // comporbamos que son strings
  it('should have string values', () => {
    expect(Rarity.Comun).to.be.a('string');
    expect(Rarity.Infrecuente).to.be.a('string');
    expect(Rarity.Rara).to.be.a('string');
    expect(Rarity.Mítica).to.be.a('string');
  });
  // nos aseguramos de que no son de otros tipos
  it ('should not have other types', () => {
    expect(Rarity.Comun).not.to.be.a('number');
    expect(Rarity.Infrecuente).not.to.be.a('number');
    expect(Rarity.Rara).not.to.be.a('number');
    expect(Rarity.Mítica).not.to.be.a('number');
  });
  // no son undefined
  it ('should not be undefined', () => {
    expect(Rarity.Comun).not.to.be.undefined;
    expect(Rarity.Infrecuente).not.to.be.undefined;
    expect(Rarity.Rara).not.to.be.undefined;
    expect(Rarity.Mítica).not.to.be.undefined;
  });
  // no son null
  it ('should not be null', () => {
    expect(Rarity.Comun).not.to.be.null;
    expect(Rarity.Infrecuente).not.to.be.null;
    expect(Rarity.Rara).not.to.be.null;
    expect(Rarity.Mítica).not.to.be.null;
  });
  // no son bool
  it ('should not be a boolean', () => {
    expect(Rarity.Comun).not.to.be.a('boolean');
    expect(Rarity.Infrecuente).not.to.be.a('boolean');
    expect(Rarity.Rara).not.to.be.a('boolean');
    expect(Rarity.Mítica).not.to.be.a('boolean');
  });
  // no son arrays
  it ('should not be an array', () => {
    expect(Rarity.Comun).not.to.be.an('array');
    expect(Rarity.Infrecuente).not.to.be.an('array');
    expect(Rarity.Rara).not.to.be.an('array');
    expect(Rarity.Mítica).not.to.be.an('array');
  });
  // es una enumeracion
  it ('should be an enumeration', () => {
    expect(Rarity).to.be.an('object');
  });
  // no es una funcion
  it ('should not be a function', () => {
    expect(Rarity).not.to.be.a('function');
  });
  // las rarezas son todas distintas
  it ('should have different rarities', () => {
    expect(Rarity.Comun).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Comun).not.to.equal(Rarity.Rara);
    expect(Rarity.Comun).not.to.equal(Rarity.Mítica);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Rara);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Mítica);
    expect(Rarity.Rara).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Infrecuente);
    expect(Rarity.Mítica).not.to.equal(Rarity.Rara);
    expect(Rarity.Mítica).not.to.equal(Rarity.Comun);
    expect(Rarity.Rara).not.to.equal(Rarity.Comun);
    expect(Rarity.Infrecuente).not.to.equal(Rarity.Comun);
  });
  // las rarezas son las correctas
  it ('should have the correct rarities', () => {
    expect(Rarity.Comun).to.equal('Comun');
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
    expect(Rarity.Rara).to.equal('Rara');
    expect(Rarity.Mítica).to.equal('Mítica');
  });
  // comun devuelve comun
  it ('should return Comun for Comun', () => {
    expect(Rarity.Comun).to.equal('Comun');
  });
  // infrecuente devuelve infrecuente
  it ('should return Infrecuente for Infrecuente', () => {
    expect(Rarity.Infrecuente).to.equal('Infrecuente');
  });
  // rara devuelve rara
  it ('should return Rara for Rara', () => {
    expect(Rarity.Rara).to.equal('Rara');
  });
  // mítica devuelve mítica
  it ('should return Mítica for Mítica', () => {
    expect(Rarity.Mítica).to.equal('Mítica');
  });
});
