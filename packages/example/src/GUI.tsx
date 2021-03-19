import DatGui, { DatButton, DatNumber, DatSelect } from "react-dat-gui";
import { IAnimationConfig } from "@usertive/react-fluid-animation";

export interface IGUIProps {
  config: Partial<IAnimationConfig>;
  updateConfig: (newConfig: Partial<IAnimationConfig>) => void;
  resetConfig: () => void;
  makeRandomSplats: () => void;
}

export default function GUI(props: IGUIProps) {
  const {config, updateConfig, resetConfig, makeRandomSplats} = props;

  return (
    <DatGui data={config} onUpdate={updateConfig}>
      <DatSelect
        path="textureDownsample"
        label="Texture Downsample"
        options={[0, 1, 2]}
      />

      <DatNumber
        path="densityDissipation"
        label="Density Diffusion"
        min={0.9}
        max={1.0}
        step={0.01}
      />

      <DatNumber
        path="velocityDissipation"
        label="Velocity Diffusion"
        min={0.9}
        max={1.0}
        step={0.01}
      />

      <DatNumber
        path="pressureDissipation"
        label="Pressure Diffusion"
        min={0.0}
        max={1.0}
        step={0.1}
      />

      <DatNumber
        path="pressureIterations"
        label="Pressure Iterations"
        min={1}
        max={60}
        step={1}
      />

      <DatNumber
        path="curl"
        label="Curl"
        min={0}
        max={50}
        step={1}
      />

      <DatNumber
        path="splatRadius"
        label="Splat Radius"
        min={0.001}
        max={0.02}
        step={0.005}
      />

      <DatButton
        label="Random Splats"
        onClick={makeRandomSplats}
      />

      <DatButton
        label="Reset Config"
        onClick={resetConfig}
      />
    </DatGui>
  );
}
