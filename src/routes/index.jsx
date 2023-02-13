import { createEffect, createMemo, createRenderEffect, createResource, createSignal, For, Show } from "solid-js";
import { Title } from "solid-start";
import Card from "~/components/Card";
import Icon from "~/components/Icon";
import "./styles.css";

export default function Home() {
  const fetchCountryData = async () => (await fetch(`https://restcountries.com/v2/all`)).json();
  const [countries] = createResource(fetchCountryData);
  const [searchQuery, setSearchQuery] = createSignal('');

  function model(el, value) {
    const [field, setField] = value();
    createRenderEffect(() => (el.value = field()));
    el.addEventListener("input", (e) => setField(e.target.value || ''));
  }  

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

        <div class="countries-list">
          <For each={countries()}>{c => 
            <Show when={c.name.toLowerCase().includes(searchQuery().toLowerCase())}>
              <Card data={c} />
            </Show>
          }</For>
        </div>
      </Show>
    </main>
  );
}

