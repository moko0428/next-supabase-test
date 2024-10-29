'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        'https://itzip.co.kr/api/user/checkDuplicateEmail',
        {
          email: 'ljun925@naver.com',
        }
      );
      console.log(res);
      // 성공 처리 로직 추가
    } catch (err) {
      console.error(err);
      setError('이메일 인증 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleEmailAuth} disabled={loading}>
        {loading ? '처리 중...' : '이메일 인증'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
