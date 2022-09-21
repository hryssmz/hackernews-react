// components/LinkItem.tsx
import type { Link } from "../utils/types";

interface Props {
  link: Link;
}

export default function LinkItem(props: Props) {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
}
