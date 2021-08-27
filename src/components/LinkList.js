import { useAppContext } from "../contexts/appContext";
import LinkCard from "./LinkCard";

const LinkList = () => {
  const { links } = useAppContext();

  return (
    <div>
      <h2 className="my-4">Links</h2>

      {links
        .filter((link) => !link.archived)
        .map((link, index) => (
          <LinkCard link={link} key={index} />
        ))}

      <hr />

      <h2 className="my-4">Archived</h2>

      {links
        .filter((link) => link.archived)
        .map((link, index) => (
          <LinkCard link={link} key={index} />
        ))}
    </div>
  );
};

export default LinkList;
