import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting/dist/splitting.min.js";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            Splitting,
        }
    }
});