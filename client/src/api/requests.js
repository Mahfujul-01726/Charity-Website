export const requestApi = {
    list: async () => new Promise((resolve) => setTimeout(() => resolve([]), 500)),
    mine: async () => new Promise((resolve) => setTimeout(() => resolve([]), 500)),
    create: async (payload) =>
        new Promise((resolve) =>
            setTimeout(() => resolve({ ...payload, _id: `mock_req_${Date.now()}` }), 500)
        ),
};
