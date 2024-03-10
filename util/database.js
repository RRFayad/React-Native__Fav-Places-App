import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places(
                  id INTEGER PRIMARY KEY NOT NULL,
                  title TEXT NOT NULL,
                  imageUri TEXT NOT NULL,
                  address TEXT NOT NULL,
                  lat REAL NOT NULL,
                  lng REAL NOT NULL
    )`,
        [],
        () => {
          resolve();
        }, // if succedded
        (_, error) => {
          reject(error);
        }, // if there's an err - the blank ("_") suggests that I must have a 1st arg, but I don't wanna use it
      );
    });
  });

  return promise;
};

export const insertPlace = async (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.lat, place.lng],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => reject(error),
      );
    });
  });
  return promise;
};

/*  
export const crudFunction = async (args) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        ``,                                  // SQL QUERY (use "?" for each value)
        [],                                  // SQL Payload (one for each ? in the query)
        (_, result) => resolve(result),      // Promise resolve Callback (if succeded)
        (_, error) => reject(error),         // Promise reject callback  - if there's an err *the blank ("_") suggests that I must have a 1st arg, but I don't wanna use it   
      );
    });
  });
  return promise;
};
*/
