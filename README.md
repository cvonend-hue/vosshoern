# Das Vosshörn — Website-Demo

Neugestaltung der Ferienwohnungen [Das Vosshörn](https://www.vosshoern.de/) in Cuxhaven-Duhnen. Die Gestaltung greift die großzügige, bildbetonte Aufmachung von [biehrer.com/de](https://biehrer.com/de) auf und verwendet eine hellere, zur bestehenden Vosshörn-Seite passende Farbpalette. Texte und Bilder stammen ausschließlich aus dem Vosshörn-Kontext.

## Lokal ansehen

Node.js starten und dann `http://127.0.0.1:4173` öffnen:

```sh
node preview-server.js
```

Die Website liegt ohne Build-Schritt unter `site/`. Der lokale Server liefert auch direkte Aufrufe der Unterseiten aus.

## Seiten

- Startseite
- Wohnungsübersicht und vier Wohnungsdetails mit den vollständigen Fotogalerien der Bestandsseite (44, 25, 41 und 22 Bilder)
- Das Haus, Gästehaus am Brockeswald, Region, Wissenswertes, Kontakt

Die Navigation bleibt beim Scrollen sichtbar. Die Sprachwahl im Header wechselt auf jeder Unterseite zwischen Deutsch und Englisch; englische Seiten liegen unter `/en/`. Das Logo im Header stammt aus der von der Inhaberin bereitgestellten Originaldatei `Logo_mit Namen V32.jpg`. Der Darkfather-Schriftzug ist damit originalgetreu im Bild enthalten.

Anfragen führen per E-Mail, Telefon oder zum bestehenden Kontaktformular. Die veröffentlichten Preisangaben sind als Orientierung gekennzeichnet; verbindliche Konditionen werden individuell angefragt. Für die Demo verweist der Footer auf die Rechtstexte der bestehenden Website. Vor einem produktiven Wechsel müssen sie an das neue Hosting angepasst werden.

## Cloudflare-Demo

`cloudflare/worker.js` sichert jede Anfrage per HTTP Basic Auth. Der Benutzername ist `gast`; das Passwort wird als Cloudflare-Secret `DEMO_PASSWORD` gesetzt und gehört nie ins Repository. `SOURCE_REVISION` verweist auf den geprüften Git-Commit, dessen Dateien der Worker aus GitHub lädt. Die produktive Domain bleibt unberührt.

## Dokumentation

- [Bestandsaufnahme](docs/bestandsaufnahme.md)
- [Bildquellen](docs/bildquellen.json)
- [Quellen der Wohnungsfotos](docs/gallery-sources.json)
- [Manrope-Lizenz](docs/manrope-OFL.txt)
