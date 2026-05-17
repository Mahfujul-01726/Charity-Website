export const donationApi = {
    create: async (payload) =>
        new Promise((resolve) =>
            setTimeout(() => resolve({ ...payload, _id: `mock_don_${Date.now()}` }), 500)
        ),
    mine: async () => new Promise((resolve) => setTimeout(() => resolve([]), 500)),
};
