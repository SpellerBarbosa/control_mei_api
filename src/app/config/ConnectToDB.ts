import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI;

if (!URI) {
  throw new Error("Variavel de ambiente nao definida.");
}

const ConnectToDb = async () => {
  try {
    await mongoose.connect(URI, {
      dbName: "ControlMeiDB",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Banco de dados connectado.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error ao se contectar ao banco de dados: ", error.message);
    } else {
      console.error("Erro desconhecido");
    }
  }
};

export default ConnectToDb;
