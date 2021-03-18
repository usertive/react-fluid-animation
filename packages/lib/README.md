# react-fluid-animation ([demo](https://transitive-bullshit.github.io/react-fluid-animation/))

> Fluid media simulation for React powered by WebGL.

![NPM](https://img.shields.io/npm/v/@usertive/react-fluid-animation?color=red&label=NPM&logo=NPM&style=for-the-badge)

[![Demo](https://raw.githubusercontent.com/transitive-bullshit/react-fluid-animation/master/example/demo.gif)](https://github.com/usertive/react-fluid-animation)

This package provides a very fast, stable fluid simulation by iteratively solving the Navier-Stokes equations for incompressible flow.

## Install

```bash
npm install @usertive/react-fluid-animation
```

or

```bash
yarn add @usertive/react-fluid-animation
```

## Usage

Check out the [demo](https://usertive.github.io/react-fluid-animation/).

```jsx
import ReactFluidAnimation from '@usertive/react-fluid-animation';

export default function App() {
  return (
    <ReactFluidAnimation />
  );
}

```

## Usage with server-side rendering (ie. Next.js)

This package works only on client side because it depdends on WebGL technology.

We need to load package dynamically after the hydration process is complete.

Let's see how this can be done:

```jsx
const DynamicAnimation = dynamic(() => import('@usertive/react-fluid-animation'));

export default function App() {
  const [isAfterHydration, setIsAfterHydration] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isAfterHydration) setIsAfterHydration(true);
  }, [isAfterHydration, setIsAfterHydration]);

  return isAfterHydration ? <DynamicAnimation /> : null;
}

```

This workaround give us the opportunity to dynamically load the component and mount it right after hydration is complete to get around hydration errors from React.

## Props & types

#### Props of the `ReactFluidAnimation` component:

```typescript
export interface Props {
  config?: IAnimationConfig; // animation config
  style?: object; // styles object passed to container <div>
  animationRef?: (animation: Animation) => void, // function to capture animation object
}
```

#### Animation config

This options can be tweaked on the [demo site](https://usertive.github.io/react-fluid-animation/).

```typescript
export interface IAnimationConfig {
  textureDownsample: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  pressureIterations: number;
  curl: number;
  splatRadius: number;
}
```

#### Animation object

```typescript
export class Animation {
  config: IAnimationConfig; // current config of the animation
  width: number; // width of the canvas
  height: number; // height of the canvas
  addRandomSplats(count: number): void; // function to apply random splats on screen
}
```

## Credits

- [Travis Fischer](https://github.com/transitive-bullshit/react-fluid-animation) - The original repository created by Travis Fischer from which this project started.
- [Pavel Dobryakov](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) - Original WebGL fluid experiment by Pavel Dobryakov. This project is a direct port and extension of Pavel's excellent work.
- [GPU Gems Chapter 38](http://developer.download.nvidia.com/books/HTML/gpugems/gpugems_ch38.html) - Fast fluid dynamics simulation on the GPU.
- [jwagner](https://github.com/jwagner/fluidwebgl) - Similar WebGL implementation.
- [haxiomic](https://github.com/haxiomic/GPU-Fluid-Experiments) - Alternative WebGL fluid experiment.

## License

MIT © [Usertive](https://usertive.com)
