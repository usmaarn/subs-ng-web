// global.d.ts
import { IStaticMethods } from "flyonui/flyonui";
// import { HSAccordion } from "flyonui/flyonui";

declare global {
    interface Window {
        // Optional third-party libraries
        _;
        $: typeof import("jquery");
        jQuery: typeof import("jquery");
        DataTable;
        Dropzone;

        HSStaticMethods: IStaticMethods;
        // HSAccordion: typeof HSAccordion;
    }
}

export { };