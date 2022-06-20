export type AppState = {
  dataReducer: CountriesInitialState,
  favoriteReducer: {
    favoriteCart: Country[];
    // country: Country
  };
};

export type CountriesInitialState = {
  countriesData: Country[];
  country: Country[];
  error: null | string;
  filteredCountry: Country[];
  loading: boolean;
};

export type Country = {
  name: {
    common: string;
  };
  region: string;
  borders: string[];
  cca3: string;
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
  };
};
