/***************************************************************
 * Nombre: connection.ts
 *
 * Descripción:
 * Módulo encargado de inicializar y gestionar
 * la conexión con la base de datos SQLite local.
 * Copia el archivo .db desde los assets si no
 * existe en el dispositivo.
 *
 * Autor: Grupo 3
 *
 * Fecha: 17/05/2026
 ***************************************************************/


import { Asset } from 'expo-asset';
import { Directory, File, Paths } from 'expo-file-system';
import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

export let db: SQLiteDatabase;

export async function initDatabase(): Promise<void> {
  const dbName = 'cam_mundial.db';


  const sqliteDir = new Directory(Paths.document, 'SQLite');
  const dbFile = new File(sqliteDir, dbName);

  console.log(' sqliteDir:', sqliteDir.uri);
  console.log(' dbFile:', dbFile.uri);

  if (!dbFile.exists) {
    
    if (!sqliteDir.exists) {
      sqliteDir.create();
      console.log(' Directorio creado');
    }


    const asset = Asset.fromModule(require('../../../assets/cam_mundial.db'));
    await asset.downloadAsync();

    console.log(' asset.localUri:', asset.localUri);

    if (!asset.localUri) {
      throw new Error('No se pudo cargar el asset de la base de datos');
    }

    const assetFile = new File(asset.localUri);
    assetFile.copy(dbFile);

    console.log(' DB copiada a:', dbFile.uri);
  } else {
    console.log(' DB ya existe');
  }

  
  db = openDatabaseSync(dbName);
  console.log(' DB abierta');
}

export function checkConnection(): boolean {
  try {
    if (!db) return false;
    const result = db.getFirstSync<{ result: number }>('SELECT 1 as result');
    return result?.result === 1;
  } catch (error) {
    console.error('Error al verificar conexión:', error);
    return false;
  }
}

export async function testDatabaseConnection(): Promise<void> {
  try {
    await initDatabase();
    console.log(' Base de datos inicializada');

    if (checkConnection()) {
      console.log(' Conexión verificada');
      const tables = db.getAllSync<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table'"
      );
      console.log(' Tablas:', tables);
    }
  } catch (error) {
    console.error(' Error:', error);
    throw error;
  }
}