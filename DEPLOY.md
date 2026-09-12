# GitHub 업로드부터 데모 링크까지

## 1. 내 컴퓨터에서 먼저 실행

Node.js 24 설치 → ZIP 압축 해제 → `teong-defense` 폴더를 VS Code에서 열기 → 터미널 열기.

```bash
cp .env.example .env
npm test
npm start
```

Windows는 첫 줄을 `Copy-Item .env.example .env`로 바꿉니다. `http://localhost:3000`에 접속해 회원가입하고 기록을 추가합니다. '서버에 저장됨' 확인 후 새로고침해 복원되는지 확인하세요.

## 2. GitHub Public 저장소 만들기

GitHub 로그인 → 오른쪽 위 `+` → `New repository` → 이름 `teong-defense` → **Public** → Create repository.

웹 업로드: `uploading an existing file` 또는 `Add file → Upload files` → 압축 안의 **폴더 내부 파일과 public/test/.github 폴더**를 올립니다. ZIP 파일 자체를 올리는 것이 아닙니다. 숨김 파일이 빠지지 않았는지 확인하세요. 최상위에 package.json, Dockerfile, server.mjs가 보이면 맞습니다.

대안: 로컬 Git이 있다면 빈 저장소 생성 후 아래 명령을 실행합니다. URL은 자신의 실제 저장소 주소로 바꾸세요.

```bash
git init
git add .
git commit -m "Build Teong Defense hackathon demo"
git branch -M main
git remote add origin https://github.com/YOUR_ID/teong-defense.git
git push -u origin main
```

`.env`, `data/`, 실제 이메일·개인정보가 채워진 보고서는 공개 GitHub에 올리지 마세요. 보고서는 대회 제출 경로로 별도 제출합니다. `.gitignore`는 로컬 Git을 쓸 때 제외를 도와주지만 웹에서 직접 올리는 파일까지 막아주지는 않습니다.

## 3. GitHub 코드로 서버 배포 (Render)

[Render Dashboard](https://dashboard.render.com/) 로그인 → `New → Web Service` → GitHub 연결 → 해당 저장소 선택.

| 설정 | 값 |
|---|---|
| Branch | main |
| Root Directory | 비움 (저장소 루트에 package.json) |
| Runtime / Language | Docker |
| Dockerfile Path | ./Dockerfile |
| Health Check Path | /api/health |
| 인스턴스 | 영구 디스크를 지원하는 플랜 |
| Disk Mount Path | /app/data |

영구 디스크와 인스턴스는 비용이 발생합니다. [Render 영구 디스크 안내](https://render.com/docs/disks)에서 현재 요금을 확인하고 선택하세요. 무료·임시 파일 시스템에서는 재배포/재시작 때 계정이 없어질 수 있어, '백에 정보가 저장됨'을 지속적으로 시연하려면 영구 디스크가 필요합니다. SQLite는 디스크가 연결된 단일 인스턴스로 운영합니다.

환경변수 설정:

```text
NODE_ENV=production
DATA_DIR=/app/data
APP_ORIGIN=https://실제로-발급된-서비스주소.onrender.com
OPENAI_MODEL=gpt-4.1-mini
OPENAI_API_KEY=본인의_API_키
```

`APP_ORIGIN`은 끝에 `/` 없이 정확한 서비스 주소를 입력합니다. 처음 주소를 모르겠다면 서비스 생성 후 표시된 주소를 복사하여 환경변수를 수정하고 재배포합니다. 이 값이 잘못되면 로그인/저장 요청이 거부됩니다. PORT는 Render가 주입하며 별도 고정하지 않습니다.

API 키는 Render의 Environment에서만 설정합니다. GitHub 파일이나 public 폴더에 넣지 마세요. API 사용량에 따른 비용은 키 소유자의 계정에 청구됩니다. 키 없이도 회원/계산/방 기능을 배포할 수 있습니다.

Deploy 완료 → 발급된 HTTPS 주소 접속 → 실제 회원가입 → 소비 기록 → 로그아웃/재로그인 → 기록 복원 → 교통 계산 → AI 사용 체크 후 질문 → 화면에 **AI 설명** 모드가 나오는지 확인. '계산 기반 안내'는 API 미설정/실패의 정상 대체 동작이지 실제 LLM 응답 확인이 아닙니다.

## 4. 제출 링크 3개 완성

1. GitHub 주소가 로그아웃 상태에서도 열리는지 확인합니다.
2. Render 데모에서 샘플 체험 버튼이 작동하고, 직접 회원가입이 가능한지 확인합니다.
3. DEMO_SCRIPT.md를 따라 화면 녹화 후 YouTube에 업로드합니다. 공개 또는 링크로 볼 수 있는 일부 공개로 설정하고 비공개는 피합니다.
4. 보고서의 인적사항과 링크를 채워 제출합니다. 마감: 2026년 9월 12일 21:30 (공지 기준).

## 자주 막히는 부분

- HTML 더블클릭 / GitHub Pages에서 로그인 실패: Node 서버가 필요합니다.
- 가입 오류 '요청 출처가 일치하지 않아요': APP_ORIGIN과 접속 주소를 일치시키세요.
- SQLite 권한 오류: /app/data 디스크의 실행 사용자 쓰기 권한을 확인하세요.
- 재시작 후 기록 사라짐: 영구 디스크가 /app/data에 연결되어 있는지 확인하세요.
- 저장 충돌: 다른 창을 닫고 미저장 입력을 별도 메모한 뒤 새로고침하세요.
- AI가 계산 안내만 표시: 서버 키·결제/할당량·모델 접근권한·외부 API 통신을 확인하세요. 키 값은 화면 캡처하지 마세요.

공식 문서: [Web Services](https://render.com/docs/web-services), [Node 배포](https://render.com/docs/deploy-node-express-app), [OpenAI 텍스트 생성](https://developers.openai.com/api/docs/guides/text).
