// components/LinkList.tsx
import { useQuery } from "@apollo/client";
import LinkItem from "./LinkItem";
import { FEED_QUERY } from "../utils/queries";
import type { Feed } from "../utils/types";

export default function LinkList() {
  const { data } = useQuery<{ feed: Feed }>(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <LinkItem key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
}
