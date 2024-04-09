import fs from 'fs';
import { Card } from './Card.js';
import * as path from 'path';

/**
 * Clase para la gestión de archivos
 * Esta clase se utiliza para guardar y cargar la información de las cartas en archivos JSON
 * Cada usuario tiene su propio directorio y cada carta se guarda en un archivo JSON
 * @param username: string - Nombre de usuario
 * @param userDir: string - Directorio del usuario
 * @param getFilePath: string - Ruta del archivo
 * @param save: void - Guardar la colección de cartas en archivos JSON
 * @param load: Map<number, Card> - Cargar la colección de cartas desde archivos JSON
 * @param collection: Map<number, Card> - Colección de cartas
 */
export class FileManager {
  /**
   * Directorio del usuario, donde se guardan los archivos JSON
   * Es privado y solo se puede acceder desde la clase
   */
  private readonly userDir: string;

  /**
   * Constructor de la clase FileManager
   * Se encarga de inicializar el directorio del usuario según el nombre de usuario
   * @param username username: string - Nombre de usuario
   */
  constructor(private username: string) {
    this.userDir = `./src/MAGICAPP/users/${username}`;
  }
  
  /**
   * Método que retorna el directorio del usuario
   * @returns Retorna el directorio del usuario 
   */
  public getUserDir(): string {
    return this.userDir;
  }

  /**
   * Retorna la ruta del archivo de la carta
   * Lo que hace es concatenar el directorio del usuario con el nombre del archivo
   * @param cardId cardId: number - Identificador de la carta
   * @returns retorna la ruta del archivo
   */
  public getFilePath(cardId: number): string {
    return path.join(this.userDir, `card${cardId}.json`);
  }

  /**
   * Método que guarda la colección de cartas en archivos JSON
   * Lo que hace es comprobar si el directorio del usuario existe, si no existe lo crea
   * Luego recorre la colección de cartas y guarda cada carta en un archivo JSON
   * @param collection collection: Map<number, Card> - Colección de cartas
   */
  public save(collection: Map<number, Card>): void {
    if (!fs.existsSync(this.userDir)) {
      fs.mkdirSync(this.userDir, { recursive: true });
    }
    for (const [cardId, card] of collection) {
      fs.writeFileSync(this.getFilePath(cardId), JSON.stringify(card, null, 2));
    }
  }
  
  /**
   * Método que carga la colección de cartas desde archivos JSON
   * Lo que hace es comprobar si el directorio del usuario existe, si no existe retorna un Map vacío
   * Luego lee los archivos JSON del directorio y los guarda en la colección
   * @returns retorna la colección de cartas
   */
  public load(): Map<number, Card> {
    const collection = new Map<number, Card>();
    if (fs.existsSync(this.userDir)) {
      const files = fs.readdirSync(this.userDir);
      for (const file of files) {
        const data = fs.readFileSync(`${this.userDir}/${file}`, 'utf-8');
        const card = JSON.parse(data) as Card;
        collection.set(card.id, card);
      }
    }
    return collection;
  }
}
