import axios from 'axios';
import type { Spin } from '../../shared/types';
const baseUrl = `${import.meta.env.VITE_API_URL}/api/spin`;

const spin = async (): Promise<Spin> => {
    const res = await axios.post<Spin>(baseUrl)
    return res.data;
}

export default { spin }