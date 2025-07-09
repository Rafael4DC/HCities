import type { City } from "../models/City";

type Props = {
  cities: City[];
};

function CityTable({ cities }: Props) {
  // Calculate total population by summing up all city populations
  // Calculate average population
  // Sort cities descending by population for display
  const total = cities.reduce((sum, c) => sum + c.population, 0);
  const avg = total / cities.length;
  const sorted = [...cities].sort((a, b) => b.population - a.population);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(city => (
            <tr key={city.name}>
              <td className={city.isCapital ? 'capital' : ''}>
                {city.name} {city.isCapital}
              </td>
              <td>{city.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total:</strong> {total.toLocaleString()}</p>
      <p><strong>Average:</strong> {avg.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p> 
      {/*converting to localeString lets me get the correct format for spaces, which looks cleaner, thats why I didnt use toFixed() */}

    </div>
  );
}

export default CityTable;
