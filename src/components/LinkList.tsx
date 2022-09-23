// components/LinkList.tsx
import { useQuery } from "@apollo/client";
import LinkItem from "./LinkItem";
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../utils/queries";
import type { Feed, Link, Vote } from "../utils/types";

export default function LinkList() {
  const { data, subscribeToMore } = useQuery<{ feed: Feed }>(FEED_QUERY);

  subscribeToMore<{ newLink: Link }>({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) {
        return prev;
      }

      const result = {
        feed: { ...prev.feed, links: [newLink, ...prev.feed.links] },
      };

      return result;
    },
  });

  subscribeToMore<{ newVote: Vote }>({
    document: NEW_VOTES_SUBSCRIPTION,
  });

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
