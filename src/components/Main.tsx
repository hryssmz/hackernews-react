// Main.tsx
import CreateLink from "./CreateLink";
import Login from "./Login";
import Search from "./Search";
import { Route, Routes, Navigate } from "react-router-dom";

export default function Main() {
  return (
    <div className="ph3 pv1 background-gray">
      <Routes>
        <Route path="/" element={<Navigate replace to="/new/1" />} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}
