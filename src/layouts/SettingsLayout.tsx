// src/layouts/SettingsLayout.tsx
import { Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div>
      {/* You can add a sidebar or header for settings here */}
      <Outlet />
    </div>
  );
}