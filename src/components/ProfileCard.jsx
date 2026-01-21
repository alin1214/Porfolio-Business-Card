import { useEffect, useState } from "react";
import "./ProfileCard.css";

const ICONS = {
  mail: "M4 6h16v12H4V6zm8 6L5.5 7.5h13L12 12z",
  globe:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm7.7 9h-3.1a15 15 0 00-1.3-5 8.05 8.05 0 014.4 5zM12 4c.9 0 2.2 2 3 7H9c.8-5 2.1-7 3-7zM4.3 11a8.05 8.05 0 014.4-5 15 15 0 00-1.3 5H4.3zm0 2h3.1a15 15 0 001.3 5 8.05 8.05 0 01-4.4-5zM12 20c-.9 0-2.2-2-3-7h6c-.8 5-2.1 7-3 7zm3.3-2a15 15 0 001.3-5h3.1a8.05 8.05 0 01-4.4 5z",
  phone:
    "M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.7.6 4.2.6.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.4 21.2 2.8 13.6 2.8 4.2 2.8 3.5 3.3 3 4 3h3.3c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.6 4.2.1.4 0 .9-.3 1.2l-2.2 2.2z",
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d={ICONS[name]} fill="currentColor" />
    </svg>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function getRole(companyName = "") {
  const s = companyName.toLowerCase();
  if (s.includes("group")) return "Frontend Engineer";
  if (s.includes("llc")) return "Full-Stack Developer";
  return "Web Developer";
}

export default function ProfileCard({ userId }) {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setUser(null);
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await res.json();
      if (!ignore) {
        setUser(data);
        setExpanded(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [userId]);

  if (!user) return <p className="loading">Loading…</p>;

  const userInitials = getInitials(user.name);
  const title = getRole(user.company?.name || "");

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="header">
          <div className="avatar" title={user.name}>
            {userInitials}
          </div>

          <div className="headerText">
            <h2 className="name">{user.name}</h2>
            <p className="title">{title}</p>

            <div className="chips">
              <span className="chip">Username: @{user.username}</span>
              <span className="chip">Location: {user.address?.city}</span>
              <span className="chip">Company: {user.company?.name}</span>
            </div>
          </div>
        </div>

        <p className="bio">
          Currently working with <strong>{user.company?.name}</strong>.
        </p>

        <div className="rows">
          <a className="row" href={`mailto:${user.email}`}>
            <span className="rowLeft">
              <Icon name="mail" /> <span>Email</span>
            </span>
            <span className="rowRight">{user.email}</span>
          </a>

          <a className="row" href={`https://${user.website}`} target="_blank" rel="noreferrer">
            <span className="rowLeft">
              <Icon name="globe" /> <span>Website</span>
            </span>
            <span className="rowRight">{user.website}</span>
          </a>

          <div className="row" role="button" tabIndex={0}>
            <span className="rowLeft">
              <Icon name="phone" /> <span>Phone</span>
            </span>
            <span className="rowRight">{user.phone}</span>
          </div>
        </div>

        <div className="actions">
          <a className="btn primary" href={`mailto:${user.email}`}>
            Contact
          </a>

          <button className="btn ghost" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Hide details" : "More details"}
          </button>
        </div>

        <div className={`expand ${expanded ? "open" : ""}`}>
          <div className="more">
            <div className="mini">
              <div className="miniLabel">Address</div>
              <div className="miniValue">
                {user.address?.suite}, {user.address?.street}, {user.address?.city}{" "}
                {user.address?.zipcode}
              </div>
            </div>

            <div className="mini">
              <div className="miniLabel">Company Focus</div>
              <div className="miniValue">{user.company?.bs}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
