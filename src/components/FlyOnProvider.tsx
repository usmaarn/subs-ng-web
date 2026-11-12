import { type PropsWithChildren } from "react"
import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Optional third-party libraries
// import $ from 'jquery';
// import _ from 'lodash';
// import noUiSlider from 'nouislider';

// window.$ = $;
// window._ = _;
// window.jQuery = $;
// window.noUiSlider = noUiSlider;


async function loadFlyonUI() {
    return import('flyonui/flyonui');
}

export default function FlyOnProvider({ children }: PropsWithChildren) {
    const location = useLocation();

    useEffect(() => {
        const initFlyonUI = async () => {
            await loadFlyonUI();
        };

        initFlyonUI();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (
                window.HSStaticMethods &&
                typeof window.HSStaticMethods.autoInit === 'function'
            ) {
                window.HSStaticMethods.autoInit();
            }
        }, 100);
    }, [location.pathname]);
    return children
}