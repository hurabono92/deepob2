import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // middleware.ts가 /api/upload 요청도 거치는데, 기본 바디 복제 제한이 10MB라
    // 카메라 원본 사진(수~10MB대)이 막혔다. 업로드 라우트의 20MB 제한보다 여유
    // 있게 잡는다.
    middlewareClientMaxBodySize: "25mb",
  },
};

export default nextConfig;
