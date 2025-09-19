import {
  defer,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  Await,
} from "react-router-dom";
import { getVan } from "../../api";
import { AuthRequired } from "../../utils";
import { Suspense } from "react";

export async function loader({ params, request }) {
  await AuthRequired(request);
  return defer({ hostVanDetail: getVan(params.id) });
}
export default function HostVanDetail() {
  const currentVan = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  function renderVanDetails(hVanD) {
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={hVanD.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${hVanD.type}`}>{hVanD.type}</i>
            <h3>{hVanD.name}</h3>
            <h4>${hVanD.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ hVanD }} />
      </div>
    );
  }
  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading ...</h2>}>
        <Await resolve={currentVan.hostVanDetail}>{renderVanDetails}</Await>
      </Suspense>
    </section>
  );
}
