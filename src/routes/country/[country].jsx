import { useParams, A, Title } from "solid-start";

export default function CountryPage() {
  const params = useParams();

  return (
    <main>
      <Title>{ params.country }</Title>
      <A href="/">Back</A>
      <h1>{ params.country }</h1>
    </main>
  );
}