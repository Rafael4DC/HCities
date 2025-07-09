import { useEffect, useState } from "react";
import type { CountryData } from "../models/CountryData";
import type { City } from "../models/City";

export const useCities = () => {
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
    const loadData = async () => {
        try {
            const res = await fetch('/major_cities.txt');
            const text = await res.text();

            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

            //a bit space heavy, but garantees that duplicates are not added
            //while being o(n). Even then space is just o(n), but while I was testing i dupped the elements in the file, and thats a credible thing to happen
            //the hashset is here to avoid it, but could EASILY be removed.
            const lines = text.trim().split('\n');
            const dataMap: Record<string, City[]> = {};
             // Keep track of city-country combos to avoid duplicates (two countries can have two cities with the same name)
            const seen = new Set<string>();

            lines.forEach(line => {
                const [cityRaw, countryRaw, popRaw, capitalRaw] = line.split(',');
                const city = cityRaw.replace(/"/g, '').trim();
                const country = countryRaw.replace(/"/g, '').trim();
                const population = Number(popRaw.trim());
                const isCapital = capitalRaw.replace(/"/g, '').trim().toUpperCase() === 'Y';
                
                // Unique key for checking duplicates
                const cityKey = `${country}|${city}`;
                if (seen.has(cityKey)) return;
                seen.add(cityKey);

                const cityObj: City = { name: city, population, isCapital };
                if (!dataMap[country]) dataMap[country] = [];
                dataMap[country].push(cityObj);
            });

            // Convert map into array of CountryData objects and sort by country name
            const parsed: CountryData[] = Object.entries(dataMap).map(
                ([country, cities]) => ({ country, cities })
            );

            setCountries(parsed.sort((a, b) => a.country.localeCompare(b.country)));
            } catch (err) {
            setError(err as Error);
        }
    };

  loadData(); // Call the async function
}, []);
  return { countries, error };
};
