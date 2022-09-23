// components/CreateLink.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_LINK_MUTATION, FEED_QUERY } from "../utils/queries";
import { Feed, Link } from "../utils/types";

type Post = Pick<Link, "id" | "description" | "url" | "createdAt">;

export default function CreateLink() {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const navigate = useNavigate();

  const [createLink] = useMutation<{ post: Post }>(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    onCompleted: () => {
      navigate("/");
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

      const { post } = data;
      console.info(post);
      const { feed } = feedQuery;
      cache.writeQuery<{ feed: { links: (Post | Link)[] } }>({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...feed.links],
          },
        },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createLink();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={e => {
              setFormState({
                ...formState,
                description: e.target.value,
              });
            }}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={e => {
              setFormState({
                ...formState,
                url: e.target.value,
              });
            }}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
