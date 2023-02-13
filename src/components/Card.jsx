import { A } from 'solid-start';
import './Card.css';

export default function Card(props) {
  const data = props.data;

  return (
    <A class="country-card" href={`/country/${data.alpha3Code}`}>
      <img src={data.flag} />
      <div class="country-data">
        <span class="country-name">{ data.name }</span>
        <span class="country-details"><span class="label">Population:</span>{ data.population }</span>
        <span class="country-details"><span class="label">Region:</span>{ data.region }</span>
        <span class="country-details"><span class="label">Capital:</span>{ data.capital }</span>
      </div>
    </A>
  );
}