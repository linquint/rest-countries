import { createEffect, createResource, createSignal } from "solid-js";
import { useParams, A, Title } from "solid-start";
import "./country.css";
import Icon from "~/components/Icon";

export default function CountryPage() {
  const [params] = createSignal(useParams());
  const [countryCode, setCountryCode] = createSignal(params().country);
  const fetchCountryData = async (code) => (await fetch(`https://restcountries.com/v3.1/alpha/${code}`)).json();
  const fetchCountryNames = async () => (await fetch(`https://restcountries.com/v3.1/all?fields=name,cca3`)).json();
  const [country] = createResource(countryCode, fetchCountryData);
  const [countryNames] = createResource(fetchCountryNames);
  const [mapUrl, setMapUrl] = createSignal('');

  createEffect(() => {
    setCountryCode(params().country)
  }, params())

  const getLanguages = (lang) => {
    let str = "";
    Object.keys(lang).map(el => {
      str += lang[el] + ", ";
    });
    str = str.slice(0, str.length - 2);
    return str;
  }

  const getCurrencies = (currencies) => {
    let str = "";
    Object.keys(currencies).map(el => {
      str += `[ ${currencies[el].symbol} ] ` + currencies[el].name + ", ";
    })
    str = str.slice(0, str.length - 2);
    return str;
  }

  const getCountryName = (names, cca3) => {
    let str = "";
    names.forEach(name => {
      if (name.cca3 == cca3) {
        str = name.name.common;
      }
    });
    return str;
  }

  const getTimezones = (zones) => {
    let str = "";
    zones.map(zone => {
      str += zone + " & ";
    })
    str = str.slice(0, str.length - 3);
    return str;
  }

  return (
    <main>
      <Show when={country.loading && countryNames.loading}>
        <Title>Traveling to {params.country}</Title>
        <div class="loading"></div>
      </Show>
      <Show when={!country.loading && !countryNames.loading}>
        <Title>{ country()[0].name.official }</Title>
        <A class="go-back" href="/">
          <Icon name="arrow-back" />
          Back
        </A>

        <div class="country-info">
          <img src={country()[0].flags.svg} alt={country()[0].flags.alt} />
          <div class="country-names">
            <span class="cinfo-title">{ country()[0].name.common }</span>
            <span class="cinfo-title-alt">{ country()[0].name.official } <span class="cinfo-title-hint">Official</span></span>

            <div class="cinfo-native">
              <For each={Object.keys(country()[0].name.nativeName)}>{key =>
                <span class="cinfo-title-alt">
                  { country()[0].name.nativeName[key.toLowerCase()].official }
                  <span class="cinfo-title-hint">
                    Official ({country()[0].languages[key.toLowerCase()]})
                  </span>
                </span>
              }</For>
            </div>
          </div>

          <div class="cinfo-details">
            <span class="cinfo-detail"><span class="cinfo-label">Population:</span>{ country()[0].population }</span>
            <span class="cinfo-detail"><span class="cinfo-label">Region:</span>{ country()[0].region }</span>
            <span class="cinfo-detail"><span class="cinfo-label">Subregion:</span>{ country()[0].subregion }</span>
            <span class="cinfo-detail"><span class="cinfo-label">Capital:</span>{ country()[0].capital[0] }</span>
          </div>

          <div class="cinfo-details">
            <span class="cinfo-detail"><span class="cinfo-label">Top Level Domain(s):</span>
              <For each={country()[0].tld}>{tld => tld + " "}</For>
            </span>
            <span class="cinfo-detail"><span class="cinfo-label">Currencies:</span>{ getCurrencies(country()[0].currencies) }</span>
            <span class="cinfo-detail"><span class="cinfo-label">Languages:</span>{ getLanguages(country()[0].languages) }</span>
          </div>
        </div>

        <span class="cinfo-section-title">Neighbors</span>
        <Show when={country()[0].borders == null}>
          <span>This country is all alone :(</span>
        </Show>
        <Show when={!country()[0].borders != null}>
          <div class="cinfo-neighbors">
            <For each={country()[0].borders}>{border =>
              <A class="cinfo-neighbor" href={`/country/${border}`}>{ getCountryName(countryNames(), border) }</A>
            }</For>
          </div>
        </Show>

        <span class="cinfo-section-title">Map</span>
        <div class="cinfo-details">
          <span class="cinfo-detail" style="gap: 0"><span class="cinfo-label" style="margin-right: 0.25rem">Area:</span>{country()[0].area} km<sup>2</sup></span>
          <span class="cinfo-detail" style="gap: 0"><span class="cinfo-label" style="margin-right: 0.25rem">Latitude:</span>{country()[0].latlng[0]}°</span>
          <span class="cinfo-detail" style="gap: 0"><span class="cinfo-label" style="margin-right: 0.25rem">Longitude:</span>{country()[0].latlng[1]}°</span>
          <span class="cinfo-detail" style="gap: 0"><span class="cinfo-label" style="margin-right: 0.25rem">Timezones:</span>{getTimezones(country()[0].timezones)}</span>
        </div>

        <span class="cinfo-section-title">Demonyms</span>
        <div class="cinfo-demonyms">
          <For each={Object.keys(country()[0].demonyms)}>{demo =>
            <div class="cinfo-demonym">
              <span class="cinfo-demonym-lang">{(demo == 'eng' ? "English" : "French")}</span>
              <span class="cinfo-detail"><span class="cinfo-label">Female:</span>{country()[0].demonyms[demo].f}</span>
              <span class="cinfo-detail"><span class="cinfo-label">Male:</span>{country()[0].demonyms[demo].m}</span>
            </div>
          }</For>
        </div>
      </Show>
    </main>
  );
}