import { ImgHTMLAttributes, SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src="/favicon.svg" alt="App Logo" width={54} height={54} {...props as ImgHTMLAttributes<HTMLImageElement>} />
    );
}
