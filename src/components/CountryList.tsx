import type { CountryData } from "../models/CountryData";

type Props = {
  countries: CountryData[];
  onSelect: (country: CountryData) => void;
  selectedCountry?: string;
};

const CountryList = ({ countries, onSelect, selectedCountry }: Props) => {
  return (
    <div>
        <h2>Countries</h2>
        <div className="country-list">
        {countries.map(country => (
            <div
                key={country.country} //using tabs is fun! and really useful, so why not?
                role="button"
                tabIndex={0}
                onClick={() => onSelect(country)}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(country);
                    }
                }}
                className={`country-item ${selectedCountry === country.country ? 'selected' : ''}`}
            >
            {country.country}
            </div>
        ))}
        </div>
    </div>
  );
};

export default CountryList;
