import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { hVanD } = useOutletContext();
  return <img src={hVanD.imageUrl} className="host-van-detail-image" />;
}
