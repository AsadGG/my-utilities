function rowsToJson(tableName, columns = []) {
  if (columns.length) {
    const columnsFormat = columns
      .map((column) => `'${column}', ${tableName}."${column}"`)
      .join(', ');
    return `json_build_object(${columnsFormat}) ${tableName}`;
  }
  return `row_to_json(${tableName}.*) AS ${tableName}`;
}
