# Historie návrhu

## Zamítnuté návrhy

- **Stavy „Prašno“, „Vyvětrat“ a „Větrá se“:** „Prašno“ bylo zavádějící, protože PM2.5 může pocházet i z vaření, krbu, svíček nebo venkovního znečištění. „Vyvětrat“ a „Větrá se“ byly odmítnuty, protože stav okna je na kartě vidět samostatně. Nahradily je názvy „Znečištěný vzduch“, „Vydýchaný vzduch“ a „Silně vydýchaný vzduch“.
- **Jedna karta jen pro právě preferovaný systém nebo souběžné karty Klima a Radiátor:** návrh počítal s jediným viditelným systémem vytápění či klimatizace, případně s klimatizací a radiátorovou kartou vedle sebe. Nahradilo jej zobrazení obou řádků, jejichž pořadí a váha se mění podle režimu domu.
- **Sezónní označení Zima/Léto v hlavičce:** bylo navrženo jako textový podtitulek. Bylo vypuštěno, protože sezónní režim je patrný z pořadí řádků vytápění a klimatizace.
- **Výpis 5 °C při vypnutém Tado:** při vypnutém topení měl být vidět jeho ochranný cíl. Nahradil jej pouze stav „Vypnuto“, aby cílová teplota nepůsobila jako aktivní požadavek.
- **Rozložení pro počítač nebo čtyři horní místnosti v jednom stísněném řádku:** bylo navrženo před mobilním přepracováním. Nahradila je mobilní struktura bez vodorovného posouvání; důvodem je priorita iPhonu a čitelnosti.

## Nahrazená řešení

- **Prototypy Mushroom a button-card:** první návrh používal nativní nadpisovou kartu a karty Mushroom, později byl navržen styl „button card hero“. Výsledkem je požadavek na vlastní kartu hostovanou na GitHubu, připravenou k instalaci a ladění. Přesný technický důvod změny platformy není v paměti zaznamenán.
- **Obecné klepnutí na kartu místnosti pro detail a dlouhý stisk pro přepínání:** návrh z 19. 10. 2026 byl nahrazen konkrétnějšími akcemi pro jednotlivé hodnoty: teplota otevře 24hodinovou historii, CO₂/PM2.5 společný graf a panel žaluzie standardní ovládání krytu. Aktuální chování dlouhého stisku pro vytápění a klimatizaci není v novějším návrhu potvrzeno.
- **Dvě samostatné indikace či posuvníky žaluzií:** byly nahrazeny jedním svislým obrázkem žaluzie, který současně znázorňuje polohu i naklopení a je vedle informačních řádků. Poznámky neuvádějí samostatný důvod této vizuální změny.
- **Zobrazení teploty z Tado a původní Core Tado:** pro pokojovou teplotu byla zvolena ALPSTUGA, protože je umístěna ve volném prostoru, zatímco Tado je u radiátoru pod oknem. Jako zdroj vytápění se používá Tado CE; Core Tado se má odstranit.
- **Původní řídicí přepínač `input_boolean.zaluzie_leto`:** byl nahrazen obecným výběrem `input_select.house_mode` s hodnotami Zima/Léto, který řídí pořadí řádků vytápění a klimatizace a komfortní pásmo.
- **Komfortní pásmo 19,5–23,5 °C v zimě:** bylo nahrazeno osobním rozsahem 20–24 °C v zimě; letní pásmo zůstalo 21–25 °C.
- **Původní entity místností Core Tado:** v původním seznamu byly uvedeny `climate.obyvak_obyvak`, `climate.loznice_loznice`, `climate.pracovna_pracovna`, `climate.miki_miki` a `climate.maxik_maxik`. Aktuální paměť potvrzuje jako Tado CE pouze Ložnici (`climate.loznice_tado_ce_loznice`); aktuální ID ostatních místností nejsou doložena.
- **Stará ID žaluzií:** 18. 10. 2026 byly žaluzie přejmenovány z neprůhledných nebo pracovních ID na čitelnější ID `cover.loznice_zaluzie_loznice`, `cover.pracovna_zaluzie_pracovna`, `cover.mikulas_zaluzie_mikulas` a `cover.maxik_zaluzie_maxik`. Jednotlivá přiřazení starých a nových ID nejsou v poznámce jednoznačně zaznamenána.
- **Původní pomocné entity `sensor.prumerna_teplota_domu` a `cover.zaluzie_dum`:** byly uvedeny ve starším seznamu, ale v aktuálním návrhu karty nemají určenou roli.

## Vývoj návrhu

- **Říjen 2026 – první nástěnka:** cílem bylo mít všech pět místností na jedné stránce, použít Mushroom, zobrazit ovládání klimatizace, radiátorů a žaluzií a mít viditelné teplotu, vlhkost a okno.
- **19. 10. 2026 – karta místnosti:** návrh přešel ke stylu button-card hero, doplnil ALPSTUGA a MYGGBETT, sezónní výběr vytápění a klimatizace a otevření detailu klepnutím.
- **21. 10. 2026 – mobilní přepracování:** stanovena hlavní obrazovka „Domov“, přednost mobilního zobrazení, stavy místností, ALPSTUGA jako zdroj údajů o prostředí, Tado CE a samostatné zobrazení obou soustav vytápění a klimatizace.
- **21. 10. 2026 večer – sjednocení pravidel:** uzavřen seznam stavů, konečná komfortní pásma, zobrazení Tado CE a pravidla pro barvy a neznámý stav.
- **22. 10. 2026 – specifikace prototypu:** vlastní karta na GitHubu, mikrotrendy, jednotný obrazový panel žaluzií a konkrétní akce pro 24hodinové grafy a ovládání krytu. Paleta zůstala pouze návrhem k ověření, nikoli konečným rozhodnutím.
