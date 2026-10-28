# AUDIT – Klima Dashboard

Rozpory a zjištění mezi zdroji. Stav po konsolidaci 28. 10.: sedmnáct konfliktů z konsolidace Memory (23. 10.: prahy vlhkosti, ID entit, Topení × radiátory, Boost, WindFree, název Obývák …) je uzavřeno rozhodnutím uživatele. Rozhodnutí jsou v `CURRENT_SPEC.md` a `ENTITY_MAP.md`, nahrazené znění v `DESIGN_HISTORY.md`. Otevřené body jsou jen v `TODO.md`.

## Otevřené

- Hranice „dobrý / zhoršený / špatný“ pro venkovní vzduch: [TODO C6](./TODO.md#c6).
- Co jsou „upozornění“ na Domov a odkud se berou: [TODO C14](./TODO.md#c14).
- Barvy a kontrast na displeji (venku, OLED): [TODO C3](./TODO.md#c3).
- Soubory jiného projektu v tomto repozitáři (`CLAUDE.md`, `AGENTS.md`, `.github/skills`, `.github/evals`, `.github/scripts`): [TODO C15](./TODO.md#c15).

## Doporučení pro údržbu

- Změna rozhodnutí se zapíše nejdřív do `CURRENT_SPEC.md`; staré znění se přesune do `DESIGN_HISTORY.md` s důvodem. Datum a krátký popis změny patří jen tam.
- `ENTITY_MAP.md` měnit jen z nového exportu entit (`HA entities/`); export obnovit po každém přejmenování entit.
- Pravidla nekopírovat do README, `copilot-instructions.md` ani komentářů v kódu; tam jen odkaz na `CURRENT_SPEC.md`.
- Prahy mají jedno místo, konfiguraci karty; `src/config.ts` a příklad YAML musí odpovídat specifikaci (test hlídá, že příklad obsahuje všechna nastavení a výchozí hodnoty).
- Po každém vydání ověřit vizuálně na iPhonu (kontrast, venkovní čitelnost, OLED) a výsledek zapsat do spec, oddíl Barvy.
