import { Outlet } from "react-router-dom";

export function InfoPage() {
  return (
    <main className="info_container">
      <Outlet />
    </main>
  );
}
