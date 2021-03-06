import { useSelector } from "react-redux";
import { selectFieldByName } from "../store/editedEntry-slice";
import { getRowsDataByIds } from "../store/librariesData-slice";
import { selectLibraryById } from "../store/templateLibraries-slice";

const useField = (searchedFieldName) => {
  const field = useSelector((state) =>
    selectFieldByName(state, searchedFieldName)
  );
  if (field?.type !== "libEntry") {
    return field?.field?.value;
  }
};

export const useLinkToEntryField = (searchedFieldName) => {
  const field = useSelector((state) =>
    selectFieldByName(state, searchedFieldName)
  );

  let link_libUUID;
  if (field?.field?.entryLinks && field?.field?.entryLinks?.length > 0) {
    link_libUUID = field?.field?.entryLinks[0]?.libUUID;
  }
  const listRowsUUID = [];
  field?.field?.entryLinks?.forEach((entry) => {
    listRowsUUID.push(entry.rowUUID);
  });
  const templateColumns = useSelector((state) =>
    selectLibraryById(state, link_libUUID)
  );

  const rowsData = useSelector((state) =>
    getRowsDataByIds(state, { libUUID: link_libUUID, listRowsUUID })
  );

  const { value } = useScriptField(
    field?.columnTemplate?.options[0]?.script,
    field?.type
  );
  if (field?.type === "script") return value;
  if (field?.type !== "libEntry") return field?.field?.value;

  function getFieldValue(fieldName) {
    const sqlFieldName = templateColumns.columns.find(
      (column) => column.name.toLowerCase() === fieldName.toLowerCase()
    )?.sqlFieldName;
    return this[sqlFieldName];
  }

  return (
    rowsData?.map((row) => {
      const entry = {
        ...row,
      };
      entry.fieldLink = getFieldValue;
      return entry;
    }) || []
  );
};

export const useScriptField = (script, fieldType) => {
  let scriptValue;
  const ScriptResult = {
    status: "InProgress",
    value: null,
    error: null,
  };
  if (fieldType !== "script") return ScriptResult;
  // eslint-disable-next-line
  const useLinkToEntryField_t = (searchedFieldName) => {
    return useLinkToEntryField(searchedFieldName);
  };
  let scriptJSON = script;

  const scriptObject = JSON.parse(scriptJSON);
  let scriptCode = scriptObject.expr;
  scriptCode = scriptCode.replaceAll("].field(", "]?.fieldLink(");
  scriptCode = scriptCode.replaceAll("field(", " useLinkToEntryField_t(");
  scriptCode = scriptCode.replaceAll("srd(", " return(");
  scriptCode = scriptCode.replaceAll("src", " ");
  const code = [];
  if (!scriptCode.includes("return")) {
    let lastLine = true;
    scriptCode
      .split("\n")
      .reverse()
      .forEach((line) => {
        if (line.trim().length > 3) {
          if (lastLine) code.push(` return ${line}`);
          else code.push(line);
          lastLine = false;
        }
      });
    scriptCode = code.reverse().join("\n");
  }
  console.log("before eval", scriptCode);

  const evalCode = `
const functionScript = () => {
  ${scriptCode}
  return 'Ups no return'
};
// console.log(functionScript());
scriptValue = functionScript();

`;

  try {
    // eslint-disable-next-line
    eval(evalCode);
    ScriptResult.value = scriptValue;
    ScriptResult.status = "success";
  } catch (e) {
    ScriptResult.error = e;
    ScriptResult.status = "error";
    if (e instanceof SyntaxError) {
      console.error(e.message);
    }
  }

  return ScriptResult;
};

export default useField;
