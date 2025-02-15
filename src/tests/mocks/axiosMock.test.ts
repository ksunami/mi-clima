import mockAxios from "./axiosMock";

describe("axiosMock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET éxito - Ciudad Ejemplo", async () => {
    const response = await mockAxios.get("/weather?q=Ciudad Ejemplo");
    expect(response.data).toBeDefined();
  });

  test("GET error - Ciudad no encontrada", async () => {
    await expect(mockAxios.get("/weather?q=Ciudad Error")).rejects.toThrow("Ciudad no encontrada");
  });

  test("GET error - Parámetro vacío", async () => {
    await expect(mockAxios.get("/weather?q=Ciudad Vacia")).rejects.toThrow("Parámetro de ciudad vacío");
  });

  test("GET error - Timeout", async () => {
    jest.setTimeout(6000);
    await expect(mockAxios.get("/weather?q=Ciudad Lenta")).rejects.toThrow("Timeout de solicitud");
  });

  test("POST éxito", async () => {
    const response = await mockAxios.post("/add", { name: "Ciudad Nueva" });
    expect(response.status).toBe(201);
  });

  test("POST error - Datos inválidos", async () => {
    await expect(mockAxios.post("/add", null)).rejects.toThrow("Datos inválidos");
  });

  test("PUT éxito", async () => {
    const response = await mockAxios.put("/update", { name: "Ciudad Editada" });
    expect(response.status).toBe(200);
  });

  test("PUT error - Sin datos", async () => {
    await expect(mockAxios.put("/update", null)).rejects.toThrow("Datos inválidos para actualización");
  });

  test("DELETE éxito", async () => {
    const response = await mockAxios.delete("/delete/1");
    expect(response.status).toBe(204);
  });

  test("DELETE error - ID no proporcionado", async () => {
    await expect(mockAxios.delete("/delete")).rejects.toThrow("ID no proporcionado");
  });

  test("DELETE error - Error en eliminación", async () => {
    await expect(mockAxios.delete("/delete/error")).rejects.toThrow("Error específico al eliminar recurso");
  });

  test("GET error - URL no reconocida", async () => {
    await expect(mockAxios.get("/desconocido")).rejects.toThrow("Error de red desconocido");
  });
});
