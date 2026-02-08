"use client"

export const fbPixel = {
    track: (event, data = {}) => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", event, data);
        } else {
            console.warn("FB Pixel not ready");
        }
    },
};
