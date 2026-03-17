# 🦖 Contributing to dino-events

dino-events에 기여해주셔서 감사합니다!

## 행사 추가하기

### 방법 1: 이슈로 요청

[행사 추가 요청](../../issues/new?template=add-event.yml) 이슈를 등록하면, 메인테이너가 검토 후 추가합니다.

### 방법 2: 직접 PR 보내기

1. 이 레포를 **Fork** 합니다
2. `events.json`에 행사를 추가합니다
3. **PR**을 보냅니다

### events.json 스키마

```json
{
  "name": "행사명",
  "category": "ai | blockchain | both",
  "date_start": "YYYY-MM-DD",
  "date_end": "YYYY-MM-DD",
  "country": "🇰🇷 South Korea",
  "city": "Seoul",
  "url": "https://공식사이트.com",
  "description": "한 줄 설명",
  "tags": ["tag1", "tag2"],
  "confirmed": true
}
```

### 규칙

- **아시아 개최 행사만** 추가해주세요
- **참가자 500명 이상** 대형 행사
- **공식 URL** 필수
- 날짜 미확정 시 `confirmed: false`
- `date_start` 기준으로 **날짜순 정렬** 유지
- 이미 지난 행사는 추가하지 마세요

### 카테고리

| 카테고리 | 설명 |
|----------|------|
| `ai` | AI, ML, 데이터 관련 행사 |
| `blockchain` | 블록체인, 크립토, Web3 행사 |
| `both` | AI + 블록체인 모두 다루는 행사 |

## 행사 수정 / 삭제

- 날짜 변경, URL 변경 등은 직접 PR로 수정해주세요
- 취소된 행사는 이슈를 등록하거나 PR로 삭제해주세요

## 개발 환경

```bash
# 의존성 설치
pip install -r requirements.txt

# calendar.ics 생성 + README 업데이트
python scripts/generate.py
```

`scripts/generate.py`는 다음을 수행합니다:
- 지난 행사 자동 제거
- `calendar.ics` 생성
- `README.md`의 행사 테이블 자동 업데이트
- `README.md`의 타임라인 자동 업데이트
- 뱃지의 행사 수 자동 업데이트
