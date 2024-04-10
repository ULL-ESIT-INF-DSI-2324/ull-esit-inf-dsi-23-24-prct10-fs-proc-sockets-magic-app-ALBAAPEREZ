import { Card } from '../EJERCICIO/Card.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Método para añadir una carta a la colección de forma asíncrona.
 * Utiliza el patrón de programación asíncrona con callbacks.
 * @param card: Card - Carta a añadir 
 * @param callback: (error: Error | null, message?: string) => void - Función de retorno
 * @returns void no devuelve nada
 */
export function addCard(card: Card, callback: (error: Error | null, message?: string) => void): void {
  // Verificar si la carta ya existe en la colección
  if (this.collection.some((c: Card) => c.id === card.id)) {
    callback(null, `La carta con ID ${card.id} ya existe en la colección.`);
  } else {
    // Agregar la carta a la colección
    this.collection.push(card);
    const filePath = this.fileManager.getFilePath(card.id);
    // Verificar si el directorio existe, si no, crearlo de forma asíncrona
    fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
      // si hay un error, llamar al callback con el error
      if (err) {
        callback(err, `Error al crear el directorio para la carta en el sistema de archivos: ${err}`);
      } else {
        // Escribir la carta en el sistema de archivos de forma asíncrona
        fs.writeFile(filePath, JSON.stringify(card, null, 2), (err) => {
          if (err) {
            callback(err, `Error al escribir la carta en el sistema de archivos: ${err}`);
          } else {
            callback(null, `Nueva carta añadida a la colección.`);
          }
        });
      }
    });
  }
}

/**
 * Método para actualizar una carta de forma asíncrona.
 * Utiliza el patrón de programación asíncrona con callbacks.
 * @param updatedCard: Card - Carta actualizada 
 * @param callback: (error: Error | null, message?: string) => void - Función de retorno
 * @returns void no devuelve nada
 */
export function updateCard(updatedCard: Card, callback: (error: Error | null, message?: string) => void): void {
  const cardIndex = this.collection.findIndex((c: Card) => c.id === updatedCard.id);
  if (cardIndex === -1) {
    callback(null, `La carta con ID ${updatedCard.id} no existe en la colección.`);
  } else {
    // Actualizar la carta en la colección
    this.collection[cardIndex] = updatedCard;
    // Escribir la carta actualizada en el sistema de archivos de forma asíncrona
    fs.writeFile(this.fileManager.getFilePath(updatedCard.id), JSON.stringify(updatedCard, null, 2), (err) => {
      if (err) {
        callback(err, `Error al actualizar la carta en el sistema de archivos: ${err}`);
      } else {
        callback(null, `Carta actualizada en la colección.`);
      }
    });
  }
}

