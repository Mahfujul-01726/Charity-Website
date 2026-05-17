import { mockCampaigns } from "../data/mockCampaigns";

export const campaignApi = {
    list: async () =>
        new Promise((resolve) => setTimeout(() => resolve(mockCampaigns), 500)),
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const campaign = mockCampaigns.find((item) => item._id === id);
                if (campaign) {
                    resolve(campaign);
                } else {
                    reject(new Error("Campaign not found"));
                }
            }, 500);
        });
    },
    create: async (payload) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCampaign = {
                    _id: `mock${Date.now()}`,
                    ...payload,
                    raisedAmount: 0,
                    status: "active",
                    createdAt: new Date().toISOString(),
                };
                mockCampaigns.push(newCampaign);
                resolve(newCampaign);
            }, 500);
        });
    },
};
