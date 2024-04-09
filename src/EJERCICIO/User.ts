import chalk from 'chalk';
import { Card } from './Card.js';
import { FileManager } from './FileManager.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase para la colección de cartas
 * Esta clase se utiliza para gestionar la colección de cartas de un usuario
 * @param collection: Card[] - Colección de cartas
 * @param user: string - Nombre de usuario
 * @param fileManager: FileManager - Instancia de la clase FileManager
 * @param loadCollection: void - Cargar la colección de cartas
 * @param addCard: void - Añadir una carta a la colección
 * @param updateCard: void - Actualizar una carta de la colección
 * @param removeCard: void - Eliminar una carta de la colección
 * @param listCards: void - Listar las cartas de la colección
 * @param readCard: void - Leer la información de una carta
 */
export class CardCollection {
  /**
   * Colección de cartas del usuario
   * Es privado y solo se puede acceder desde la clase
   */
  private collection: Card[] = [];

  /**
   * Usuario propietario de la colección
   * Es privado y solo se puede acceder desde la clase
   */
  private user: string;

  /**
   * Instancia de la clase FileManager
   * Es privado y solo se puede acceder desde la clase
   */
  private fileManager: FileManager;

  /**
   * Constructor de la clase CardCollection
   * Se encarga de inicializar el usuario y la instancia de FileManager
   * Luego carga la colección de cartas
   */
  constructor(user: string) {
    this.user = user;
    this.fileManager = new FileManager(user);
    this.loadCollection(); 
  }

  /**
   * Método que retorna el color en formato hexadecimal.
   * Suponemos que el gris es el color incoloro y el magenta es el multicolor.
   * Si el color no se encuentra en el mapa de colores será negro.
   * @param colorName nombre del color
   * @returns retorna el color en formato hexadecimal
   */
  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      blanco: '#FFFFFF',
      azul: '#0000FF',
      negro: '#000000',
      rojo: '#FF0000',
      verde: '#00FF00',
      amarillo: '#FFFF00',
      naranja: '#FFA500',
      morado: '#800080',
      rosa: '#FFC0CB',
      marron: '#A52A2A',
      incoloro: '#CCCCCC', 
      multicolor: '#FF00FF'
    };
    return colorMap[colorName.toLowerCase()] || '#000000'; 
  }
    
  /**
   * Metodo que se encarga de cargar la collecion
   * desde los ficheros.
   */
  private loadCollection(): void {
    this.collection = Array.from(this.fileManager.load().values());
  }

  /**
   * Método para añadir una carta a la colección
   * Este método añade una nueva carta a la colección del usuario. Si la carta ya existe en la colección,
   * se muestra un mensaje de error. Si la carta no existe, se añade a la colección y se guarda en el sistema de archivos.
   * @param card La carta que se va a añadir a la colección.
   * @returns void no devuelve nada
   */
  public addCard(card: Card): void {
    // Si ya existe en la coleccion
    if (this.collection.some(c => c.id === card.id)) {
      console.log(chalk.red.bold(`La carta con ID ${card.id} ya existe en la colección de ${this.user}.`));
    } else {
      // si no existe la añadimos
      this.collection.push(card);
      const filePath = this.fileManager.getFilePath(card.id);
      // si no existe el directorio lo creamos
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      // guardamos la carta en el sistema de archivos
      fs.writeFileSync(filePath, JSON.stringify(card, null, 2));
      console.log(chalk.green.bold(`Nueva carta añadida a la colección de ${this.user}.`));
    }
  }

  /**
   * Método para actualizar una carta en la colección
   * Este método actualiza una carta en la colección del usuario. Si la carta no existe en la colección,
   * se muestra un mensaje de error. Si la carta existe, se actualiza en la colección y se guarda en el sistema de archivos.
   * @param updatedCard La carta actualizada que se va a añadir a la colección.
   * @returns void no devuelve nada
   */
  public updateCard(updatedCard: Card): void {
    const cardIndex = this.collection.findIndex(c => c.id === updatedCard.id);
    if (cardIndex === -1) {
      console.log(chalk.red.bold(`La carta con ID ${updatedCard.id} no existe en la colección de ${this.user}.`));
    } else {
      this.collection[cardIndex] = updatedCard;
      fs.writeFileSync(this.fileManager.getFilePath(updatedCard.id), JSON.stringify(updatedCard, null, 2));
      console.log(chalk.green.bold(`Carta actualizada en la colección de ${this.user}.`));
    }
  }

  /**
   * Método para eliminar una carta de la colección
   * Este método elimina una carta de la colección del usuario. Si la carta no existe en la colección,
   * se muestra un mensaje de error. Si la carta existe, se elimina de la colección y 
   * se borra del sistema de archivos. 
   * @param id El identificador de la carta que se va a eliminar de la colección.
   * @returns void no devuelve nada
   */
  public removeCard(id: number): void {
    // Buscamos la carta en la coleccion
    const cardIndex = this.collection.findIndex(c => c.id === id);
    // Si no existe mostramos un mensaje de error
    if (cardIndex === -1) {
      console.log(chalk.red.bold(`La carta con ID ${id} no existe en la colección de ${this.user}.`));
    } else {
      // Si existe la eliminamos
      this.collection.splice(cardIndex, 1);
      const filePath = this.fileManager.getFilePath(id);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(chalk.green.bold(`Carta eliminada de la colección de ${this.user}.`));
      } else {
        console.log(chalk.red.bold(`El archivo de la carta con ID ${id} no existe.`));
      }
    }
  }

  /**
   * Método para listar las cartas de la colección
   * Este método muestra por consola la información de todas las cartas de la colección del usuario.
   * Muestra cada uno de los atributos de la carta, como el nombre, el coste de mana, el color, 
   * el tipo de carta, etc. Aqui hacemos uso del metodo para obtener el color en hexadecimal.
   * @returns void no devuelve nada
   */
  public listCards(): void {
    console.log(chalk.bold(`\nColección de cartas de ${this.user}\n`));
    this.collection.forEach(card => {
      const colorCode = this.getColorCode(card.color);
      console.log(chalk.bold.italic(chalk.white(`ID: ${card.id}`)));
      console.log(chalk.bold.italic(chalk.cyan(`Nombre: ${card.name}`)));
      console.log(chalk.bold.italic(`Coste de Mana: ${card.manaCost}`));
      console.log(chalk.bold.italic(`Color: ${chalk.hex(colorCode)(card.color)}`));
      console.log(chalk.bold.italic(`Tipo de Línea: ${card.cardType}`));
      console.log(chalk.bold.italic(`Rareza: ${card.rarity}`));
      console.log(chalk.bold.italic(`Texto de Reglas: ${card.rulesText}`));
      if (card.cardType === 'Criatura' && card.power && card.toughness) {
        console.log(chalk.bold.italic(`Fuerza/Resistencia: ${card.power}/${card.toughness}`));
      }
      if (card.loyalty && card.cardType === 'Planeswalker') {
        console.log(chalk.bold.italic(`Marcas de Lealtad: ${card.loyalty}`));
      }
      console.log(chalk.bold.italic(`Valor de Mercado: ${card.marketValue}`));
      console.log("");
    });
  }

  /**
   * Método para leer la información de una carta
   * Este método muestra por consola la información de una carta de la colección del usuario.
   * Muestra cada uno de los atributos de la carta, como el nombre, el coste de mana, el color,
   * el tipo de carta, etc. Aqui hacemos uso del metodo para obtener el color en hexadecimal.
   * Si la carta no existe en la colección, se muestra un mensaje de error.
   * @param id El identificador de la carta que se va a leer.
   * @returns void no devuelve nada
   */
  public readCard(id: number): void {
    const card = this.collection.find(c => c.id === id);
    if (!card) {
      console.log(chalk.red.bold(`La carta con ID ${id} no existe en la colección de ${this.user}.`));
    } else {
      const colorCode = this.getColorCode(card.color);
      console.log(chalk.bold.italic(`\nInformación de la carta con ID ${id}\n`));
      console.log(chalk.bold.italic(chalk.cyan(`Nombre: ${card.name}`)));
      console.log(chalk.bold.italic(`Coste de Mana: ${card.manaCost}`));
      console.log(chalk.bold.italic(`Color: ${chalk.hex(colorCode)(card.color)}`));
      console.log(chalk.bold.italic(`Tipo de Carta: ${card.cardType}`));
      console.log(chalk.bold.italic(`Rareza: ${card.rarity}`));
      console.log(chalk.bold.italic(`Texto de Reglas: ${card.rulesText}`));
      if (card.cardType === 'Criatura' && card.power && card.toughness) {
        console.log(chalk.bold.italic(`Fuerza/Resistencia: ${card.power}/${card.toughness}`));
      }
      if (card.loyalty && card.cardType === 'Planeswalker') {
        console.log(chalk.bold.italic(`Marcas de Lealtad: ${card.loyalty}`));
      }
      console.log(chalk.bold.italic(`Valor de Mercado: ${card.marketValue}`));
    }
  }
}
