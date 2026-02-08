export const fbPixel = {
    track: (event, data = {}) => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", event, data);
        }
    },
};
