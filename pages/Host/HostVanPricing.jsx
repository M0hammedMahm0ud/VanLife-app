import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { hVanD } = useOutletContext();
  return (
    <h3 className="host-van-price">
      ${hVanD.price}
      <span>/day</span>
    </h3>
  );
}
