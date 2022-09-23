// components/LinkItem.tsx
import { useMutation } from "@apollo/client";
import { timeDifferenceForDate } from "../utils";
import { AUTH_TOKEN } from "../utils/constants";
import { FEED_QUERY, VOTE_MUTATION } from "../utils/queries";
import type { Feed, Link, Vote } from "../utils/types";

interface Props {
  link: Link;
  index: number;
}

export default function LinkItem(props: Props) {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation<{ vote: Vote }>(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      const feedQuery = cache.readQuery<{ feed: Feed }>({
        query: FEED_QUERY,
      });
      if (!feedQuery) {
        return;
      }

      const { vote } = data;
      const { feed } = feedQuery;
      const updatedLinks = feed.links.map(feedLink => {
        return feedLink.id !== link.id
          ? feedLink
          : { ...feedLink, votes: [...feedLink.votes, vote] };
      });

      cache.writeQuery<{ feed: { links: Link[] } }>({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
}
