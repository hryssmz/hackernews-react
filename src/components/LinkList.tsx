// components/LinkList.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import LinkItem from "./LinkItem";
import { LINKS_PER_PAGE } from "../utils/constants";
import {
  FEED_QUERY,
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../utils/queries";
import type { Feed, Link, Vote } from "../utils/types";

export default function LinkList() {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewPage = location.pathname.includes("new");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]) || 1;
  const pageIndex = (page - 1) * LINKS_PER_PAGE;

  const { data, loading, error, subscribeToMore } = useQuery<{ feed: Feed }>(
    FEED_QUERY,
    {
      variables: {
        skip: isNewPage ? pageIndex : 0,
        take: isNewPage ? LINKS_PER_PAGE : 100,
        orderBy: { createdAt: "desc" },
      },
    }
  );

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
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {(isNewPage
            ? data.feed.links
            : data.feed.links
                .slice()
                .sort((link1, link2) => link2.votes.length - link1.votes.length)
          ).map((link, index) => (
            <LinkItem key={link.id} link={link} index={index + pageIndex} />
          ))}
          {isNewPage && (
            <div className="flex ml4 mv3 gray">
              <div
                className="pointer mr2"
                onClick={() => {
                  if (page > 1) {
                    navigate(`/new/${page - 1}`);
                  }
                }}
              >
                Prev
              </div>
              <div
                className="pointer"
                onClick={() => {
                  if (page <= data.feed.count / LINKS_PER_PAGE) {
                    navigate(`/new/${page + 1}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
