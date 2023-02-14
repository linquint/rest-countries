import { A } from 'solid-start';
import './Card.css';
import Icon from './Icon';

export default function Card(props) {
  const data = props.data;

  return (
    <A class="country-card" href={`/country/${data.cca3}`}>
      <img src={data.flags.svg} alt={data.flags.alt} />
      <div class="country-data">
        <span class="country-name">{ data.name.common }</span>
        <span class="country-details"><span class="label">Population:</span>{ data.population }</span>
        <span class="country-details"><span class="label">Region:</span>{ data.region }</span>
        <span class="country-details"><span class="label">Capital:</span>{ data.capital }</span>
        <div class="read-more">
          <Icon size={16} name="readmore" />
          <span>Read more</span>
        </div>
      </div>
    </A>
  );
}