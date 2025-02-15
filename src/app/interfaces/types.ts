export interface SearchInputComponentProps {
    city: string;
    setCity: (city: string) => void;
    fetchWeather: () => void;
  }
  
  export interface ErrorMessageComponentProps {
    error: string | null;
  }
  
  export interface WeatherData {
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
  }
  
  export interface WeatherResponseComponentProps {
    weather: WeatherData;
  }
  