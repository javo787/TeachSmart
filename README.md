# Қаҳрамони ҳафта (Hero of the Week) 🏆✨

A gamified, fully offline-compatible, single-file interactive classroom application developed for **1st-grade students in Tajikistan**. Designed for interactive smartboards, projectors, and offline computers to select weekly class helpers, helpers-in-training, or classroom monitors.

---

## 🇹🇬 Муаррифӣ / Introduction (Tajik)

**«Қаҳрамони ҳафта»** — ин барномаи шавқовар ва ҳавасмандкунанда барои хонандагони синфи 1 мебошад, ки ба муаллимон дар интихоби навбатдори синф ё ёрдамчии асосӣ кӯмак мерасонад. Барнома ба пуррагӣ бо забони тоҷикӣ сохта шудааст ва 100% автономӣ (бе пайвастшавӣ ба Интернет) кор мекунад.

### Хусусиятҳои асосӣ:
* **Чархи бахт (Рулетка):** Аниматсияи рангоранг ва шавқовар барои ҳавасманд кардани кӯдакон ҳангоми интихоб.
* **Толори шӯҳрат (Hall of Fame):** Намоиши рӯйхати қаҳрамононе, ки аллакай навбатдор шудаанд.
* **Вазифаҳои махфӣ (Secret Missions):** Интихоби тасодуфии 2-3 супориши махсус дар ҳар ҳафта (масалан: *Назоратчии тахтаи синф 🧹*, *Ёрдамчии асосии муаллим 📝*, *Нигоҳубинкунандаи гулҳо 💧*).
* **Панели муаллим бо қулфи муҳофизатӣ:** Барои пешгирӣ кардани пахшкунии тасодуфии кӯдакон, панел бо ҳалли масъалаи оддии математикӣ ($X + Y$) муҳофизат шудааст.
* **Таҳрири хонандагон:** Ислоҳи ном ё аватари хонанда бе аз даст додани таърихи навбатдориаш.
* **Таърихи пурраи қаҳрамонон:** Феҳристи ҳамаи қаҳрамонон бо сана ва рақами давр, ки ҳатто пас аз оғози давраи нав нигоҳ дошта мешавад.
* **Хотиррасонии нусхабардорӣ:** Барнома мустақилона пешниҳод медиҳад, ки нусхаи эҳтиётӣ (backup) гирифта шавад, агар муддате аз охирин экспорт гузашта бошад.
* **Мусиқӣ ва Овозҳои Сӯнъӣ (Web Audio API):** Овозҳои пахши тугмаҳо, бонгҳо ва фанфари ғолибият бе истифодаи файлҳои берунаи овозӣ.
* **Сад фоиз автономӣ:** Танҳо як файли `index.html` ки ҳама унсурҳо (HTML, CSS ва JS) дар дохилаш ҷойгиранд.

---

## 🇬🇧 Description (English)

**"Hero of the Week"** is a gamified and highly interactive tool crafted for primary classrooms (specifically 1st-grade students). It randomly selects a classroom monitor/helper using a playful "Roulette" spinner, assigning them custom, child-friendly missions.

### Key Features:
* **Suspenseful Spinner Roulette:** Visual cycling that slows down organically to build high classroom engagement and excitement.
* **Offline-First Audio Synthesis:** Utilizes the HTML5 Web Audio API to synthetically produce custom click taps, fail buzzers, and triumphal fanfare chords entirely offline.
* **Secure Teacher Lock:** Prevents curious kids from editing stats or student lists through an interactive addition puzzle block.
* **Editable Roster:** Fix a student's name or avatar in place without losing their monitor/absence history.
* **Persistent Cross-Cycle History:** A full log of every hero, with date and cycle number, that survives cycle resets.
* **Backup Reminder:** A dismissible nudge to export a JSON backup when it's been a while, since everything otherwise lives only in `localStorage` on one machine.
* **Local Persistence:** Retains list cycles and monitors within standard local storage without databases.

---

## 📁 Ассотсиатсияи Маълумот / State Schema
The system stores its operational schema under the `hero_week_state` key in `localStorage`:

```json
{
  "currentCycle": 1,
  "students": [
    {
      "id": "user-uuid",
      "name": "Сомон Иброҳимов",
      "avatar": "🚀",
      "hasBeenMonitor": false,
      "absentCount": 0
    }
  ],
  "history": [
    {
      "id": "user-uuid",
      "studentId": "user-uuid",
      "name": "Сомон Иброҳимов",
      "avatar": "🚀",
      "cycle": 1,
      "date": "2026-08-15T10:00:00.000Z"
    }
  ],
  "lastExportAt": "2026-08-15T10:00:00.000Z"
}
```

`history` and `lastExportAt` are backfilled automatically for older saved or imported files that predate them, so upgrading never breaks existing data.

---

## 🚀 Танзим ва Корбурд / Quick Start

1. Download the single [index.html](./index.html) file.
2. Double-click the file on any computer, projector, or interactive smartboard. No server, node modules, or deployment configurations required.
3. Access the discrete Lock Icon (`🔒`) at the top right to log in and set up your classroom student names.

---

## 🛠️ Барои таҳиягарон / For Developers

`index.html` is handmade + Tailwind-generated: the utility CSS is compiled from [`src/input.css`](./src/input.css) (which defines the `kidBlue`/`kidPink`/`kidYellow` theme colors and the custom `spin-slow`/`bounce-slow`/`pulse-slow`/`wiggle` animations) and injected directly into the `<style id="tailwind-generated">` block, so the app still ships as one offline-ready file.

To change styling or add new Tailwind classes:

```bash
npm install
# edit index.html and/or src/input.css as needed
npm run build   # recompiles Tailwind and re-embeds it into index.html
```

`canvas-confetti` is bundled the same way — vendored directly into its own `<script>` block rather than loaded from a CDN, to keep the app fully offline.
