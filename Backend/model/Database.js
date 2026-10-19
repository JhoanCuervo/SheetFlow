const scriptProperties = PropertiesService.getScriptProperties();
const SPREADSHEET_ID = scriptProperties.getProperty('SPREADSHEET_ID');
let sheetDbCache = null;
let tablesCache = null;

/** Reutiliza una sola conexión al ORM durante la ejecución. */
const getDb = () => {
  if (!sheetDbCache) sheetDbCache = ORMN.openDb(SPREADSHEET_ID);
  return sheetDbCache;
};

/** Carga las tablas una vez y las mantiene en memoria. */
const getTables = () => {
  if (!tablesCache) tablesCache = getDb()._getTables();
  return tablesCache;
};