import axios from "axios";
import { mockWeatherData } from "./weatherDataMock";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

mockAxios.get.mockImplementation((url) => {
  if (url.includes("q=Ciudad Ejemplo")) {
    return Promise.resolve({ data: mockWeatherData });
  }
  if (url.includes("q=Ciudad Error")) {
    return Promise.reject(new Error("Ciudad no encontrada"));
  }
  if (url.includes("q=Ciudad Vacia")) {
    return Promise.reject(new Error("Parámetro de ciudad vacío"));
  }
  if (url.includes("q=Ciudad Lenta")) {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout de solicitud")), 1000)
    );
  }
  if (url.includes("q=Error 500")) {
    return Promise.reject({ response: { status: 500, data: "Error interno" } });
  }
  return Promise.reject(new Error("Error de red desconocido"));
});

// 📌 Implementa DELETE para que devuelva una promesa válida
mockAxios.delete.mockImplementation((url) => {
  if (url === "/delete/error") {
    return Promise.reject(new Error("Error específico al eliminar recurso"));
  }
  if (url === "/delete") {
    return Promise.reject(new Error("ID no proporcionado"));
  }
  return Promise.resolve({ status: 204 });
});

// 📌 Verificamos que POST y PUT también manejen errores
mockAxios.post.mockImplementation((url, data) => {
  if (!data) return Promise.reject(new Error("Datos inválidos"));
  if (url.includes("/error")) return Promise.reject(new Error("Error al crear recurso"));
  return Promise.resolve({ status: 201, data: { message: "Recurso creado" } });
});

mockAxios.put.mockImplementation((url, data) => {
  if (!data) return Promise.reject(new Error("Datos inválidos para actualización"));
  if (url.includes("/error")) return Promise.reject(new Error("Error al actualizar recurso"));
  return Promise.resolve({ status: 200, data: { message: "Recurso actualizado" } });
});

export default mockAxios;
