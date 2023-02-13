import { createResource, For, Show } from "solid-js";
import { Title } from "solid-start";
import Card from "~/components/Card";
import "./styles.css";

export default function Home() {
  const fetchCountryData = async () => (await fetch(`https://restcountries.com/v2/all`)).json();
  const [countries] = createResource(fetchCountryData);

  return (
    <main>
      <Title>Where in the world?</Title>
      <Show when={countries.loading}>
        <div class="loading"></div>
      </Show>
      <Show when={!countries.loading}>
        <form action="">
          <input type="text" placeholder="Search for a country..." />
        </form>

        <div class="countries-list">
          <For each={countries()}>{c => 
            <Card data={c} />
          }</For>
        </div>
      </Show>
    </main>
  );
}

