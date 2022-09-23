// components/Main.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Login from "./Login";
import NotFound from "./NotFound";
import Search from "./Search";

export default function Main() {
  return (
    <div className="ph3 pv1 background-gray">
      <Routes>
        <Route path="/" element={<Navigate replace to="/new/1" />} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/top" element={<LinkList />} />
        <Route path="/new/:page" element={<LinkList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
