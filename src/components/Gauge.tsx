import GaugeComponent from "react-gauge-component";

export interface IGaugeProps {
  value: number;
}

export const Gauge = ({ value }: IGaugeProps) => {
  return <GaugeComponent
    type="semicircle"
    arc={{
      colorArray: ["#FF2121", "#00FF15"],
      padding: 0.02,
      subArcs:
        [
          { limit: 70 },
          { limit: 90 },
          {},
        ],
    }}
    pointer={{ type: "blob", animationDelay: 0 }}
    value={value}
  />;
};