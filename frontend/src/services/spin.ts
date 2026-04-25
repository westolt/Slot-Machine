import axios from 'axios';
import type { Spin } from '../../../shared/types';
const baseUrl = 'http://localhost:3000/api/spin';

const spin = async (): Promise<Spin> => {
    const res = await axios.post<Spin>(baseUrl)
    return res.data;
}

export default { spin }