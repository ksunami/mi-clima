import axios from "axios";

/**
 * Obtiene el clima de una ciudad específica.
 * @param city Nombre de la ciudad a consultar.
 * @returns Datos del clima o un error en caso de fallo.
 */
export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=es`
    );
    return response.data;
  } catch (error) {
    throw new Error("Ciudad no encontrada. Intenta nuevamente.");
  }
};
