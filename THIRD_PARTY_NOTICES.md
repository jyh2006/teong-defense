# 외부 기술·자료 사용 내역

| 구성 | 사용 부분 | 출처/라이선스 |
|---|---|---|
| Node.js 24 | 서버 HTTP, 암호 해시(scrypt), 세션 난수, 파일 처리, 테스트 실행, SQLite 연결 | https://github.com/nodejs/node · MIT 및 내장 의존성별 라이선스 |
| SQLite | 회원·세션·생활정보를 단일 파일 DB에 보관 | https://www.sqlite.org/copyright.html · Public Domain |
| Noto Sans KR | UI 웹 폰트 (Google Fonts 로드; 실패 시 시스템 sans-serif) | https://github.com/notofonts/noto-cjk · SIL Open Font License 1.1 |
| actions/checkout, actions/setup-node | GitHub Actions 테스트 환경 구성 | https://github.com/actions/checkout / https://github.com/actions/setup-node · MIT |
| OpenAI Responses API | 사용자가 선택했을 때 계산 결과를 자연어로 설명 | 외부 유료 API, 오픈 소스 라이브러리가 아님. https://developers.openai.com/api/docs/guides/text |
| 정책 공식 안내 | 정책 조건과 계산 상수 확인 | README의 공식 출처 3곳, 확인일2026-09-12. 공고의 사진·로고·전체 본문은 재사용하지 않음 |
| 탕이·텅이·진화·방·소품 PNG | 캐릭터 및 방 UI 이미지 | 본 프로젝트를 위해 OpenAI 이미지 생성 도구로 생성. 외부 캐릭터/음악/영상 파일을 가져오지 않음 |

프런트엔드는 HTML/CSS/JavaScript로 작성했으며 외부 UI 템플릿·게임 엔진·LLM SDK를 복사하지 않았습니다. 코드와 보고서 작성에 Codex 생성형 AI 도움을 사용했습니다. 제출팀은 대회 AI 활용 규정과 실제 사용 내역을 최종 확인해 보고서에 유지하세요. 본 파일은 원저작물의 라이선스를 대체하지 않습니다.
