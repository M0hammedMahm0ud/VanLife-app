import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { hVanD } = useOutletContext();

  return (
    <section className="host-van-detail-info">
      <h4>
        Name: <span>{hVanD.name}</span>
      </h4>
      <h4>
        Category: <span>{hVanD.type}</span>
      </h4>
      <h4>
        Description: <span>{hVanD.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}
