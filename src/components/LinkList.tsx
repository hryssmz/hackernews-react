// components/LinkList.tsx
import LinkItem from "./LinkItem";
import type { Feed } from "../utils/types";
import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default function LinkList() {
  const { data } = useQuery<{ feed: Feed }>(FEED_QUERY);

  return (
    <div>
      {data?.feed.links.map(link => (
        <LinkItem key={link.id} link={link}></LinkItem>
      ))}
    </div>
  );
}
