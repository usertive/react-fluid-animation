declare module '@usertive/react-fluid-animation' {
  import {Component} from 'react';

  export interface IAnimationConfig {
    textureDownsample: number;
    densityDissipation: number;
    velocityDissipation: number;
    pressureDissipation: number;
    pressureIterations: number;
    curl: number;
    splatRadius: number;
    colorsPool: string[];
  }
  export class Animation {
    get config(): IAnimationConfig;
    set config(config: IAnimationConfig);
    get width(): number;
    get height(): number;
    addRandomSplats(count: number): void;
  }
  export interface IFluidAnimationProps {
    content?: string;
    config?: Partial<IAnimationConfig>;
    style?: object;
    animationRef?: (animation: Animation) => void,
    size?: {
      width?: number,
      height?: number
    };
  }

  class ReactFluidAnimation extends Component<IFluidAnimationProps> {}
  const defaultConfig: IAnimationConfig;

  export default ReactFluidAnimation;
  export {defaultConfig};
}
