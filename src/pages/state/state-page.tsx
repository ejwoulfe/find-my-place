import { useParams } from "react-router-dom";

export function StatePage() {
  const { state } = useParams();
  return (
    <main className="states__container">
      <h1>{state}</h1>
    </main>
  );
}
