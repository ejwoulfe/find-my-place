import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div id="not-found__container">
      <h1>404 Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
