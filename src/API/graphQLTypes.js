import { gql } from "@apollo/client";
export const GET_LIBRARIES_TEMPLATES = gql`
  query {
    librariesTemplates {
      name
      id
      libUUID
      columns {
        type
        name
        order
        description
        defaultValue
        columnUUID
        usage
        sqlFieldName
        options {
          value
          index
          default
          dictionaryLibraryUUID
          dictionaryLibraryName
        }
      }
    }
  }
`;

export const GET_LIBRARIES_DATA = gql`
  query {
    librariesData {
      name
      id
      libUUID
      rows {
        rowUUID
        uniqueName
        creationDate
        modificationDate
        columns {
          value
          columnName
          columnUUID
          entryLinks {
            libUUID
            uniqueName
            rowUUID
          }
        }
      }
    }
  }
`;

export const GET_LIBRARIES_DATA_PG = gql`
  query {
    librariesDataPG {
      name
      id
      libUUID
      rows {
        rowUUID
        fe_title
        fe_description
        rowJSON
      }
    }
  }
`;
