import { Forest } from './types';
import { mapForestSourceToForest } from './constants';

type PublicForestApiResponse = {
  response?: {
    header?: {
      resultCode?: string;
      resultMsg?: string;
    };
    body?: {
      items?: unknown[] | { item?: unknown[] };
    };
  };
};

const ENDPOINT = 'https://api.data.go.kr/openapi/tn_pubr_public_rcrfrst_api';

const extractItems = (payload: PublicForestApiResponse): Record<string, unknown>[] => {
  const nested = payload?.response?.body?.items;
  if (Array.isArray(nested)) return nested as Record<string, unknown>[];
  if (nested && typeof nested === 'object' && Array.isArray((nested as { item?: unknown[] }).item)) {
    return ((nested as { item?: unknown[] }).item || []) as Record<string, unknown>[];
  }
  return [];
};

export const fetchForestsFromPublicData = async (serviceKey: string): Promise<Forest[]> => {
  const params = new URLSearchParams({
    serviceKey,
    pageNo: '1',
    numOfRows: '1000',
    type: 'json'
  });

  const response = await fetch(`${ENDPOINT}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`공공데이터 API 호출 실패 (${response.status})`);
  }

  const text = await response.text();
  let payload: PublicForestApiResponse;
  try {
    payload = JSON.parse(text) as PublicForestApiResponse;
  } catch {
    throw new Error('공공데이터 API 응답을 JSON으로 해석하지 못했습니다.');
  }

  const resultCode = payload?.response?.header?.resultCode;
  if (resultCode && resultCode !== '00') {
    const resultMsg = payload?.response?.header?.resultMsg || '알 수 없는 오류';
    throw new Error(`공공데이터 API 오류: ${resultMsg}`);
  }

  const items = extractItems(payload);
  return items.map((item, index) => mapForestSourceToForest(item, index));
};
