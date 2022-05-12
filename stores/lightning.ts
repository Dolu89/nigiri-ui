import { defineStore } from 'pinia'
import { LNBackend } from '@/enums/lightning';

export const useLightning = defineStore('lightning', {
    state: () => {
        return {
            nodes: [],
        }
    },
    actions: {
        add(address: string, type: LNBackend) {
            const pubKey = address.split("@")[0];
            if (!this.nodes.find(n => n.pubKey === pubKey)) {
                const obj = { pubKey, address, type };
                this.nodes = [...this.nodes, obj];
            }
        },
    },
});