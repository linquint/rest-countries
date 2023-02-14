import { createRenderEffect, createResource, createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
import "./styles.css";

export default function Home() {
  const fetchCountryData = async () => (await fetch(`https://restcountries.com/v3.1/all`)).json();
  const [countries] = createResource(fetchCountryData);
  const [searchQuery, setSearchQuery] = createSignal(getCookie("search"));

  function model(el, value) {
    const [field, setField] = value();
    createRenderEffect(() => (el.value = field()));
    el.addEventListener("input", (e) => {
      setField(e.target.value || '');
      document.cookie = `search=${field()}; SameSite=Lax; Secure; Max-Age=900`;
    });
  }

  function click(el, value) {
    const [field, setField] = value();
    el.addEventListener("click", (e) => {
      setField(e.target.value || "All");
      document.cookie = `region=${field()}; SameSite=Lax; Secure; Max-Age=900`;
    });
  }

  function getCookie(name, defaultValue = "") {
    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`))?.split('=')[1] ?? defaultValue;
    console.log(cookieValue);
    return cookieValue;
  }

  function search(name, query, region) {
    let show = (selected() == "All") ? true : (region == selected());
    return (
      (name.common.toLowerCase().includes(query.toLowerCase())
      ||
      name.official.toLowerCase().includes(query.toLowerCase()))
      &&
      show
    )
  }

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [selected, setSelected] = createSignal(getCookie("region", "All"));

  return (
    <main>
      <Title>Where in the world?</Title>
      <Show when={countries.loading}>
        <div class="loading"></div>
      </Show>
      <Show when={!countries.loading}>
        <form>
          <div>
            <label for="countrySearch">
              <Icon size={20} name="search" />
            </label>
            <input type="text" placeholder="Search for a country..." id="countrySearch" use:model={[searchQuery, setSearchQuery]} />
          </div>
        </form>

        <span style={"font-size: 1.5rem; font-weight: 600; text-align: left; display: block"}>Filter by Region</span>
        <div class="filter-regions">
          <For each={regions}>{region => 
            <button 
              class={((region == selected()) ? "filter-active ": "") + "filter-region"}
              use:click={[selected, setSelected]}
              value={region}>
                { region }
            </button>
          }</For>
        </div>
        
        <div class="countries-list">
          <For each={countries()}>{c =>
            <Show when={search(c.name, searchQuery(), c.region)}>
              <Card data={c} />
            </Show>
          }</For>
        </div>
      </Show>
    </main>
  );
}

