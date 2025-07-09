import { useState } from 'react';
import { useCities } from './hooks/useCities';
import CountryList from './components/CountryList';
import CityTable from './components/CityTable';
import './App.css';
import type { CountryData } from './models/CountryData';

function App() {
  const { countries, error } = useCities();
  const [selected, setSelected] = useState<CountryData | null>(null);

  if (!countries.length) {
    return <p>{error ? 'Error loading data. Cant find countries' : 'Loading countries...'}</p>;
  }

  if (countries.length === 0 && !error) {
    return <p>No countries available.</p>;
  }

  return (
    <div className="container">
      <CountryList
        countries={countries}
        onSelect={setSelected}
        selectedCountry={selected?.country}
      />
      {selected && (
        <div className="city-table">
          <h2>{selected.country}</h2>
          <CityTable cities={selected.cities} />
        </div>
      )}
    </div>
  );
}

export default App;
