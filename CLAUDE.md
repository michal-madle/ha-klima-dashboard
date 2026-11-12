# CLAUDE.md

Klima Dashboard: Lovelace custom card pro Home Assistant (HACS). Odpovídej česky.

@../ha-config/AGENTS.md
@../ha-config/klima/AGENTS.md

## Kde co je

- Pravidla projektu a implementace karty: `.github/copilot-instructions.md` (přečti před změnou kódu v `src/`).
- Sestavení a testy: `npm run build`, `npm test`. `ha-klima-dashboard.js` v kořeni je generovaný, ručně se needituje.
- Soukromá data (spec `CURRENT_SPEC.md` a historie `DESIGN_HISTORY.md` karty v `klima/`, obraz Home Assistantu, mapa entit, hodinový export, konfigurace Home Assistantu) jsou v soukromém repozitáři `ha-config`. Karta v repozitáři je nemá.
- Agenti, společná pravidla a UX systém jsou v soukromém `ha-config` (`AGENTS.md`, `.claude/agents/`, `DASHBOARD_UX_SYSTEM.md`), omezení této karty v `ha-config/klima/AGENTS.md`. Session se otevírá v `ha-config` (postup v jeho `AGENTS.md`).
