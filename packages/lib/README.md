## Installation

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

## Usage with server-side rendering

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
