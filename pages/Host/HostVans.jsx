import { defer, Link, useLoaderData, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { AuthRequired } from "../../utils";
import { Suspense } from "react";
export async function loader({ request }) {
  await AuthRequired(request);
  return defer({ vans: getHostVans() });
}
export default function HostVans() {
  const dataPromise = useLoaderData();

  function hostVansEls(vans) {
    return vans.map((van) => (
      <Link
        to={`/host/vans/${van.id}`}
        key={van.id}
        className="host-van-link-wrapper"
      >
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <Suspense fallback={<h2>Loading ...</h2>}>
          <section>
            <Await resolve={dataPromise.vans}>{hostVansEls}</Await>
          </section>
        </Suspense>
      </div>
    </section>
  );
}
