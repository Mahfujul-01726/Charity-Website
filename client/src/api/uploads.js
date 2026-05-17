export const uploadApi = {
    uploadImage: async (file) => {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(file);
            setTimeout(() => resolve(url), 800);
        });
    },
};
