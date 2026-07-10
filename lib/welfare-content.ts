export const WELFARE_BANNER_KEY = "welfare-banner";

export const WELFARE_INTRO_KEY = "welfare-intro";
export const WELFARE_SERVICES_KEY = "welfare-services";
export const WELFARE_QUOTE_KEY = "welfare-quote";
export const WELFARE_QUOTE_SUB_KEY = "welfare-quote-sub";
export const WELFARE_RULES_KEY = "welfare-rules";
export const WELFARE_TRAITS_KEY = "welfare-traits";
export const WELFARE_STEPS_KEY = "welfare-steps";

export const WELFARE_INTRO_DEFAULT =
  "지역사회에 건강하고 행복한 가정이 많아지도록 다양한 복지서비스를 제공하며 안전망 역할을 합니다.";

export const WELFARE_SERVICES_DEFAULT = [
  "저소득 취약계층 의료비 지원",
  "저소득 취약계층 자녀 교육 지원",
  "지역의 복지시설을 통한 저소득 취약계층 자립지원",
  "저소득 취약계층 무상급식 및 생활지원",
].join("\n");

export const WELFARE_QUOTE_DEFAULT = "사랑과 봉사 나눔과 섬김을 실천합니다.";

export const WELFARE_QUOTE_SUB_DEFAULT =
  "사단법인 깊은순종은 이웃에 대한 그리스도의 사랑을 실천하기 위해 설립된 비영리법인입니다.";

export const WELFARE_RULES_DEFAULT = [
  "책임감을 가지고 봉사한다.",
  "봉사활동 시간을 지킨다.",
  "봉사활동 중 부득이한 사정이 생겼을 때 기관에 연락한다.",
  "대상자와 상하관계를 만들지 않는다.",
  "개인의 정보 보호법 시행에 따라 대상자 개인정보를 누설, 타인에게 제공해서는 안된다.",
].join("\n");

export const WELFARE_TRAITS_DEFAULT = [
  "자발성|자신의 의사로써 시간과 재능, 경험을 도움이 필요한 이웃과 지역사회 공동체 형성에 아무런 대가 없이 활동하는 것입니다.",
  "무보수성|경제적 보상과 관련되는 것으로 자원봉사 활동에 대해 금전적 대가를 받지 않음을 뜻합니다.",
  "공익성|이웃과 지역사회내에 산재하고 있는 문제를 해결하여 삶의 질을 향상시키기 위하여 활동하는 것을 의미합니다.",
  "지속성|자원봉사활동에 참여하게 되면 일정기간 동안 지속성과 장기적으로 봉사활동에 참여하는 것을 의미합니다.",
].join("\n");

export const WELFARE_STEPS_DEFAULT = [
  "STEP 01|전화 또는 방문상담",
  "STEP 02|자원봉사신청서 작성",
  "STEP 03|자원봉사교육",
  "STEP 04|배치 및 활동",
].join("\n");

export function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parsePairs(value: string): { title: string; description: string }[] {
  return parseLines(value).map((line) => {
    const [title, ...rest] = line.split("|");
    return { title: title.trim(), description: rest.join("|").trim() };
  });
}

export function parseSteps(value: string): { step: string; label: string }[] {
  return parseLines(value).map((line) => {
    const [step, ...rest] = line.split("|");
    return { step: step.trim(), label: rest.join("|").trim() };
  });
}
