import "mocha";
import { expect } from "chai";
import { addCard, updateCard } from "../../src/MODIFICACION/Metodos.js";
import { Card } from "../../src/EJERCICIO/Card.js";
import { Color } from "../../src/EJERCICIO/EnumerationColor.js";
import { LineType } from "../../src/EJERCICIO/EnumerationLineType.js";
import { Rarity } from "../../src/EJERCICIO/EnumerationRarity.js";
import * as fs from "fs";
import * as sinon from "sinon";

// PRUEBAS ADDCARD
describe("Asynchronous function addCard tests", () => {
  // PRUEBA PARA EL MÉTODO addCard QUE AÑADE UNA CARTA A LA COLECCIÓN
  it("addCard should add a card to the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección vacía
    const collection: Card[] = [];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función addCard con el contexto adecuado y pasamos la colección
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("Nueva carta añadida a la colección.");
      done();
    });
  });
  // PRUEBA PARA EL MÉTODO addCard QUE INTENTA AÑADIR UNA CARTA QUE YA EXISTE EN LA COLECCIÓN
  it("addCard should not add a card that already exists in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección con una carta
    const collection: Card[] = [testCard];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función addCard con el contexto adecuado y pasamos la colección
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("La carta con ID 1 ya existe en la colección.");
      done();
    });
  });

  it('should return an error if the card already exists in the collection', (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    const collection: Card[] = [testCard];
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    addCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(message).to.equal(`La carta con ID ${testCard.id} ya existe en la colección.`);
      done();
    });
  });
  
});

// PRUEBAS UPDATECARD
describe("Asynchronous function updateCard tests", () => {
  // PRUEBA QUE ACTUALIZA UNA CARTA DE LA COLECCIÓN
  it("updateCard should update a card in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección con una carta
    const collection: Card[] = [testCard];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
    updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("Carta actualizada en la colección.");
      done();
    });
  });

  // prueba que intenta actualizar una carta que no existe en la colección
  it("updateCard should not update a card that does not exist in the collection", (done) => {
    const testCard: Card = {
      id: 1,
      name: "Test Card",
      manaCost: 5, 
      color: Color.Blanco,
      cardType: LineType.Criatura,
      rarity: Rarity.Rara,
      rulesText: "Texto de reglas de la carta.",
      marketValue: 10.0
    };
    // Simulamos la existencia de una colección vacía
    const collection: Card[] = [];
    // Simulamos la existencia de un objeto con la propiedad fileManager
    const fileManager = {
      getFilePath: () => "fake/filepath"
    };
    // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
    updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
      expect(error).to.be.null;
      expect(message).to.equal("La carta con ID 1 no existe en la colección.");
      done();
    });
  });
  describe("Asynchronous function updateCard tests", () => {
    // PRUEBA QUE ACTUALIZA UNA CARTA DE LA COLECCIÓN Y DEVUELVE UN MENSAJE DE ÉXITO
    it("updateCard should return a success message when updating a card in the collection", (done) => {
      const testCard: Card = {
        id: 1,
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      // Simulamos la existencia de una colección con una carta
      const collection: Card[] = [testCard];
      // Simulamos la existencia de un objeto con la propiedad fileManager
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(error).to.be.null;
        expect(message).to.equal("Carta actualizada en la colección.");
        done();
      });
    });

    // PRUEBA QUE DEVUELVE UN MENSAJE DE ERROR CUANDO SE INTENTA ACTUALIZAR UNA CARTA QUE NO EXISTE
    it("updateCard should return an error message when attempting to update a card that does not exist", (done) => {
      const testCard: Card = {
        id: 2, // Cambiamos el ID para que no exista en la colección
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      // Simulamos la existencia de una colección vacía
      const collection: Card[] = [];
      // Simulamos la existencia de un objeto con la propiedad fileManager
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      // Llamamos a la función updateCard con el contexto adecuado y pasamos la colección
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(error).to.be.null;
        expect(message).to.equal(`La carta con ID ${testCard.id} no existe en la colección.`);
        done();
      });
    });

    it('should return an error if the card does not exist in the collection', (done) => {
      const testCard: Card = {
        id: 1,
        name: "Test Card",
        manaCost: 5, 
        color: Color.Blanco,
        cardType: LineType.Criatura,
        rarity: Rarity.Rara,
        rulesText: "Texto de reglas de la carta.",
        marketValue: 10.0
      };
      const collection: Card[] = [];
      const fileManager = {
        getFilePath: () => "fake/filepath"
      };
      updateCard.call({ collection, fileManager }, testCard, (error: Error | null, message?: string) => {
        expect(message).to.equal(`La carta con ID ${testCard.id} no existe en la colección.`);
        done();
      });
    });
  });
});
