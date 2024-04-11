import yargs from 'yargs';
import { CardCollection } from './User.js';
import { Color } from './EnumerationColor.js';
import { LineType } from './EnumerationLineType.js';
import { Rarity } from './EnumerationRarity.js';
import net from 'net';

// Conectar al servidor el cliente
const client = net.connect({ port: 60300 });

// Escuchar datos del servidor
client.on('data', data => {
  console.log(data.toString());
});

// Definir comandos y opciones utilizando yargs
/**
 * Comando para gestionar la colección de cartas
 * Se pueden añadir, listar, actualizar, leer y eliminar cartas de la colección
 * Los comandos disponibles son:
 * - add: Añade un nuevo usuario a la colección
 * - list: Lista todos los usuarios de la colección
 * - update: Actualiza un usuario de la colección
 * - read: Lee un usuario de la colección
 * - remove: Elimina un usuario de la colección
 * Para más información sobre los comandos, ejecutar el comando --help
 */
yargs(process.argv.slice(2))
  /**
   * Comando para añadir un nuevo usuario a la colección
   * Por parámetros se deben indicar el nombre del usuario, el ID, el nombre, 
   * el coste de mana, el color, el tipo de línea, la rareza, el texto de reglas y el valor de mercado.
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @param name: string - Nombre del usuario
   * @param manaCost: number - Coste de mana
   * @param color: string - Color del usuario
   * @param lineType: string - Tipo de línea del usuario
   * @param rarity: string - Rareza del usuario
   * @param rulesText: string - Texto de reglas del usuario
   * @param power: number - Poder del usuario
   * @param toughness: number - Resistencia del usuario
   * @param loyaltyMarks: number - Marcas de lealtad del usuario
   * @param marketValue: number - Valor de mercado del usuario
   */
  .command({
    command: 'add',
    describe: 'Añade un nuevo usuario a la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' },
      name: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      manaCost: { describe: 'Coste de mana', demandOption: true, type: 'number' },
      color: { describe: 'Color del usuario', demandOption: true, type: 'string', choices: Object.values(Color) },
      lineType: { describe: 'Tipo de línea del usuario', demandOption: true, type: 'string', choices: Object.values(LineType) },
      rarity: { describe: 'Rareza del usuario', demandOption: true, type: 'string', choices: Object.values(Rarity) },
      rulesText: { describe: 'Texto de reglas del usuario', demandOption: true, type: 'string' },
      power: { describe: 'Poder del usuario', type: 'array', default: [] },
      toughness: { describe: 'Resistencia del usuario', type: 'array', default: [] },
      loyaltyMarks: { describe: 'Marcas de lealtad del usuario', type: 'number' },
      marketValue: { describe: 'Valor de mercado del usuario', demandOption: true, type: 'number' }
    },
    // esto se ejecuta cuando se llama al comando
    handler: argv => {
      const collection = new CardCollection(argv.user);
      const user = {
        id: argv.id,
        name: argv.name,
        manaCost: argv.manaCost,
        color: argv.color,
        cardType: argv.lineType,
        rarity: argv.rarity,
        rulesText: argv.rulesText,
        power: argv.power,
        toughness: argv.toughness,
        loyalty: argv.loyaltyMarks,
        marketValue: argv.marketValue
      };
      collection.addCard(user);
      const data = JSON.stringify({ action: 'add', user: argv.user, card: user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para listar todos los usuarios de la colección
   * Por parámetros se debe indicar el nombre del usuario y se listan todos los usuarios de la colección
   * @param user: string - Nombre del usuario
   * @returns retorna la lista de usuarios de la colección
   */
  .command({
    command: 'list',
    describe: 'Lista todos los usuarios de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.listCards();
      const data = JSON.stringify({ action: 'list', user: argv.user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para actualizar un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario, el ID y los campos a actualizar
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @param name: string - Nombre del usuario
   * @param manaCost: number - Coste de mana
   * @param color: string - Color del usuario
   * @param lineType: string - Tipo de línea del usuario
   * @param rarity: string - Rareza del usuario
   * @param rulesText: string - Texto de reglas del usuario
   * @param power: number - Poder del usuario
   * @param toughness: number - Resistencia del usuario
   * @param loyaltyMarks: number - Marcas de lealtad del usuario
   * @param marketValue: number - Valor de mercado del usuario
   */
  .command({
    command: 'update',
    describe: 'Actualiza un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' },
      name: { describe: 'Nombre del usuario', type: 'string' },
      manaCost: { describe: 'Coste de mana', type: 'number' },
      color: { describe: 'Color del usuario', type: 'string', choices: Object.values(Color) },
      lineType: { describe: 'Tipo de línea del usuario', type: 'string', choices: Object.values(LineType) },
      rarity: { describe: 'Rareza del usuario', type: 'string', choices: Object.values(Rarity) },
      rulesText: { describe: 'Texto de reglas del usuario', type: 'string' },
      power: { describe: 'Poder  del usuario', type: 'array', default: [] },
      toughness: { describe: 'Resistencia del usuario', type: 'array', default: [] },
      loyaltyMarks: { describe: 'Marcas de lealtad del usuario', type: 'number' },
      marketValue: { describe: 'Valor de mercado del usuario', type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      const user = {
        id: argv.id,
        name: argv.name,
        manaCost: argv.manaCost,
        color: argv.color,
        cardType: argv.lineType,
        rarity: argv.rarity,
        rulesText: argv.rulesText,
        power: argv.power,
        toughness: argv.toughness,
        loyalty: argv.loyaltyMarks,
        marketValue: argv.marketValue
      };
      collection.updateCard(user);
      const data = JSON.stringify({ action: 'update', user: argv.user, card: user, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para leer un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario y el ID del usuario
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @returns retorna el usuario de la colección
   */
  .command({
    command: 'read',
    describe: 'Lee un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.readCard(argv.id);
      const data = JSON.stringify({ action: 'read', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    }
  })
  /**
   * Comando para eliminar un usuario de la colección
   * Por parámetros se deben indicar el nombre del usuario y el ID del usuario
   * @param user: string - Nombre del usuario
   * @param id: number - ID del usuario
   * @returns retorna el usuario eliminado de la colección
   */
  .command({
    command: 'remove',
    describe: 'Elimina un usuario de la colección',
    builder: {
      user: { describe: 'Nombre del usuario', demandOption: true, type: 'string' },
      id: { describe: 'ID del usuario', demandOption: true, type: 'number' }
    },
    handler: argv => {
      const collection = new CardCollection(argv.user);
      collection.removeCard(argv.id);
      const data = JSON.stringify({ action: 'remove', user: argv.user, cardID: argv.id, close: 'CLOSED' });
      client.write(data);
    }
  })
  // comandos de ayuda
  .help()
  .parse();
