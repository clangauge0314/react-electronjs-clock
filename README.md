<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>REACT-ELECTRONJS-CLOCK</h1>
<p align="left">
	<em><code>❯ React와 Electron을 활용한 데스크톱 시계 애플리케이션</code></em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/clangauge0314/react-electronjs-clock?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/clangauge0314/react-electronjs-clock?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/clangauge0314/react-electronjs-clock?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/clangauge0314/react-electronjs-clock?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="left">사용된 기술 스택:</p>
<p align="left">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
</p>
</div>
<br clear="right">

## 📋 목차

- [🔍 개요](#-개요)
- [✨ 주요 기능](#-주요-기능)
- [📁 프로젝트 구조](#-프로젝트-구조)
  - [📂 프로젝트 인덱스](#-프로젝트-인덱스)
- [🚀 시작하기](#-시작하기)
  - [📋 사전 요구사항](#-사전-요구사항)
  - [⚙️ 설치](#-설치)
  - [🎯 사용법](#-사용법)
  - [🧪 테스트](#-테스트)
- [🗺️ 프로젝트 로드맵](#-프로젝트-로드맵)
- [🤝 기여하기](#-기여하기)
- [📄 라이선스](#-라이선스)
- [🙏 감사의 말](#-감사의-말)

---

## 🔍 개요

React와 Electron을 결합하여 개발된 크로스 플랫폼 데스크톱 시계 애플리케이션입니다. 시계, 알람, 타이머, 스톱워치 기능을 제공하며, 모던한 UI/UX와 함께 다양한 커스터마이징 옵션을 지원합니다.

---

## ✨ 주요 기능

- 🕐 **실시간 시계**: 정확한 시간 표시와 다양한 시간 형식 지원
- ⏰ **알람**: 반복 알람 설정 및 커스텀 알람음 지원
- ⏲️ **타이머**: 카운트다운 타이머와 알림 기능
- ⏱️ **스톱워치**: 정밀한 시간 측정 및 랩타임 기록
- 🎨 **테마 설정**: 다크/라이트 모드 및 커스터마이징
- 🔊 **사운드 설정**: 다양한 알람음과 볼륨 조절
- 📌 **항상 위에**: 창을 항상 최상단에 고정하는 기능

---

## 📁 프로젝트 구조

```sh
electionjs-clock-251318/                           # 프로젝트 루트 (Electron + React 시계 앱)
├── electron/                                      # Electron 메인 프로세스 관련 파일들
│   ├── assets/                                   # Electron 앱 아이콘 등 정적 자원
│   └── node_modules/                             # Electron 의존성 패키지들
│       ├── .bin/                                # 실행 가능한 바이너리들
│       ├── @types/                              # TypeScript 타입 정의들
│       ├── electron/                            # Electron 코어 패키지
│       ├── electron-builder/                    # 앱 빌드 도구
│       ├── lodash/                              # 유틸리티 라이브러리
│       ├── typescript/                          # TypeScript 컴파일러
│       └── ... (기타 Electron 관련 의존성들)
│
├── frontend/                                     # React 프론트엔드 애플리케이션
│   ├── public/                                  # 정적 파일들 (HTML, 아이콘 등)
│   │   └── sounds/                              # 오디오 파일들 (알람 소리 등)
│   ├── src/                                     # React 소스 코드
│   │   ├── Assets/                              # 이미지, 폰트 등 정적 자원
│   │   │   └── (react.svg 등)
│   │   │
│   │   ├── Components/                          # 재사용 가능한 React 컴포넌트들
│   │   │   ├── Modals/                         # 모달 컴포넌트들
│   │   │   │   └── (RingModal.jsx)
│   │   │   └── Ui/                             # 기본 UI 컴포넌트들
│   │   │       └── (Button, Input, Select, VolumeControl)
│   │   │
│   │   ├── Features/                           # 기능별 컴포넌트들
│   │   │   ├── Alarm/                          # 알람 기능
│   │   │   │   ├── Components/                 # 알람 관련 컴포넌트들
│   │   │   │   │   └── (AlarmCreateModal, AlarmComponents, AlarmHistoryModal)
│   │   │   │   ├── Utils/                      # 알람 유틸리티 함수들
│   │   │   │   │   └── (AlarmUtils.js)
│   │   │   │   └── Pages/                      # 알람 페이지 컴포넌트
│   │   │   │       └── (Alarm.jsx)
│   │   │   │
│   │   │   ├── Timer/                          # 타이머 기능
│   │   │   │   ├── Components/                 # 타이머 관련 컴포넌트들
│   │   │   │   │   └── (TimerEditModal, TimerComponents)
│   │   │   │   ├── Utils/                      # 타이머 유틸리티 함수들
│   │   │   │   │   └── (TimerUtils.js)
│   │   │   │   └── Pages/                      # 타이머 페이지 컴포넌트
│   │   │   │       └── (Timer.jsx)
│   │   │   │
│   │   │   ├── Stopwatch/                      # 스톱워치 기능
│   │   │   │   └── Pages/                      # 스톱워치 페이지 컴포넌트
│   │   │   │       └── (Stopwatch.jsx)
│   │   │   │
│   │   │   └── Settings/                       # 설정 기능
│   │   │       └── Pages/                      # 설정 페이지 컴포넌트
│   │   │           └── (Settings.jsx)
│   │   │
│   │   ├── Layout/                             # 레이아웃 관련 컴포넌트들
│   │   │   └── Sidebar/                        # 사이드바 컴포넌트
│   │   │       └── (Sidebar.jsx)
│   │   │
│   │   └── Shared/                             # 공통 유틸리티, 훅, 상태 관리
│   │       ├── Stores/                         # Zustand 상태 관리 스토어들
│   │       │   └── (AlarmStore, TimerStore, StopwatchStore, ThemeStore)
│   │       │
│   │       ├── Hooks/                          # 커스텀 React 훅들
│   │       │   └── (useTimeFormat, useAudioPlayer, useWindowControl)
│   │       │
│   │       ├── Styles/                         # 공통 스타일 파일들 (비어있음)
│   │       │
│   │       ├── Components/                     # 공통 컴포넌트들
│   │       │   ├── Display/                    # 디스플레이 관련 컴포넌트들
│   │       │   │   └── (TimeDisplay, DateDisplay, RecordList)
│   │       │   ├── Layout/                     # 레이아웃 관련 컴포넌트들
│   │       │   │   └── (PageContainer)
│   │       │   └── Buttons/                    # 버튼 관련 컴포넌트들
│   │       │       └── (PrimaryButton)
│   │       │
│   │       ├── Utils/                          # 공통 유틸리티 함수들
│   │       │   └── (ModalUtils.jsx)
│   │       │
│   │       └── Constants/                      # 상수 정의들
│   │           └── (Sounds.js)
│   │
│   └── node_modules/                           # 프론트엔드 의존성 패키지들
│       ├── .bin/                              # 실행 가능한 바이너리들
│       ├── @esbuild/                          # ESBuild 관련 패키지들
│       ├── @rollup/                           # Rollup 번들러 관련 패키지들
│       ├── react/                             # React 라이브러리
│       ├── react-dom/                         # React DOM 라이브러리
│       ├── vite/                              # Vite 번들러
│       ├── tailwindcss/                       # Tailwind CSS 프레임워크
│       ├── eslint/                            # ESLint 린터
│       ├── zustand/                           # 상태 관리 라이브러리
│       └── ... (기타 프론트엔드 의존성들)
│
└── node_modules/                              # 루트 레벨 의존성
    ├── .bin/                                 # 실행 가능한 바이너리들
    ├── concurrently/                         # 동시 스크립트 실행 도구
    ├── lodash/                               # 유틸리티 라이브러리
    ├── rxjs/                                 # 반응형 프로그래밍 라이브러리
    └── ... (기타 루트 의존성들)
```

### 📂 프로젝트 인덱스
<details open>
	<summary><b><code>REACT-ELECTRONJS-CLOCK/</code></b></summary>
	<details>
		<summary><b>루트 디렉토리</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ 의존성 잠금 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ 프로젝트 설정 및 스크립트</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details>
		<summary><b>electron</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/electron/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ Electron 의존성 잠금 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/electron/index.js'>index.js</a></b></td>
				<td><code>❯ Electron 메인 프로세스 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/electron/preload.js'>preload.js</a></b></td>
				<td><code>❯ 렌더러 프로세스 프리로드 스크립트</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/electron/package.json'>package.json</a></b></td>
				<td><code>❯ Electron 패키지 설정</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details>
		<summary><b>frontend</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/postcss.config.js'>postcss.config.js</a></b></td>
				<td><code>❯ PostCSS 설정 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ 프론트엔드 의존성 잠금 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td><code>❯ Tailwind CSS 설정</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/vite.config.js'>vite.config.js</a></b></td>
				<td><code>❯ Vite 번들러 설정</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/package.json'>package.json</a></b></td>
				<td><code>❯ 프론트엔드 패키지 설정</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/index.html'>index.html</a></b></td>
				<td><code>❯ HTML 템플릿 파일</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/clangauge0314/react-electronjs-clock/blob/master/frontend/eslint.config.js'>eslint.config.js</a></b></td>
				<td><code>❯ ESLint 린터 설정</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---

## 🚀 시작하기

### 📋 사전 요구사항

react-electronjs-clock을 시작하기 전에 다음 요구사항을 확인하세요:

- **프로그래밍 언어:** JavaScript
- **패키지 매니저:** npm
- **Node.js:** 16.0.0 이상

### ⚙️ 설치

다음 방법 중 하나를 사용하여 react-electronjs-clock을 설치하세요:

**소스에서 빌드:**

1. react-electronjs-clock 저장소를 클론합니다:
```sh
❯ git clone https://github.com/clangauge0314/react-electronjs-clock
```

2. 프로젝트 디렉토리로 이동합니다:
```sh
❯ cd react-electronjs-clock
```

3. 프로젝트 의존성을 설치합니다:

**`npm` 사용** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

### 🎯 사용법

다음 명령어를 사용하여 react-electronjs-clock을 실행하세요:

**개발 모드 실행:**
```sh
❯ npm run dev
```

**프로덕션 빌드 및 실행:**
```sh
❯ npm start
```

**개별 실행:**
- 프론트엔드만 실행: `npm run dev:react`
- Electron만 실행: `npm run dev:electron`

### 🧪 테스트

다음 명령어를 사용하여 테스트 스위트를 실행하세요:

**`npm` 사용** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```

---

## 🗺️ 프로젝트 로드맵

- [X] **`완료`**: <strike>기본 시계 기능 구현</strike>
- [X] **`완료`**: <strike>알람 기능 구현</strike>
- [X] **`완료`**: <strike>타이머 및 스톱워치 기능 구현</strike>
- [ ] **`진행중`**: 다국어 지원 추가
- [ ] **`계획`**: 위젯 모드 구현
- [ ] **`계획`**: 클라우드 동기화 기능

---

## 🤝 기여하기

- **💬 [토론 참여](https://github.com/clangauge0314/react-electronjs-clock/discussions)**: 인사이트를 공유하고, 피드백을 제공하거나 질문하세요.
- **🐛 [이슈 신고](https://github.com/clangauge0314/react-electronjs-clock/issues)**: 발견한 버그를 신고하거나 새로운 기능을 요청하세요.
- **💡 [풀 리퀘스트 제출](https://github.com/clangauge0314/react-electronjs-clock/blob/main/CONTRIBUTING.md)**: 오픈된 PR을 검토하고 자신만의 PR을 제출하세요.

<details closed>
<summary>기여 가이드라인</summary>

1. **저장소 포크**: 프로젝트 저장소를 자신의 GitHub 계정으로 포크하세요.
2. **로컬 클론**: 포크한 저장소를 로컬 머신에 클론하세요.
   ```sh
   git clone https://github.com/clangauge0314/react-electronjs-clock
   ```
3. **새 브랜치 생성**: 항상 새로운 브랜치에서 작업하며, 설명적인 이름을 사용하세요.
   ```sh
   git checkout -b new-feature-x
   ```
4. **변경사항 작성**: 로컬에서 변경사항을 개발하고 테스트하세요.
5. **변경사항 커밋**: 업데이트를 명확하게 설명하는 메시지로 커밋하세요.
   ```sh
   git commit -m '새로운 기능 x 구현'
   ```
6. **GitHub에 푸시**: 변경사항을 포크한 저장소에 푸시하세요.
   ```sh
   git push origin new-feature-x
   ```
7. **풀 리퀘스트 제출**: 원본 프로젝트 저장소에 대해 PR을 생성하세요. 변경사항과 동기를 명확히 설명하세요.
8. **검토**: PR이 검토되고 승인되면 메인 브랜치에 병합됩니다. 기여해주셔서 감사합니다!
</details>

<details closed>
<summary>기여자 그래프</summary>
<br>
<p align="left">
   <a href="https://github.com{/clangauge0314/react-electronjs-clock/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=clangauge0314/react-electronjs-clock">
   </a>
</p>
</details>
