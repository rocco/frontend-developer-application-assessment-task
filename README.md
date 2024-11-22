# TIE Probeaufgabe Frontend

Im Grundlegenden ist dies eine "leere" Basisinstallation von Ionic, welche mit `npm i && npm run start` startbar ist.
Der [unauthorized-interceptor.ts](/src/interceptors/unauthorized.interceptor.ts) leitet an den auth-service weiter sobald man nicht mehr eingeloggt ist. Dort meldet man sich mit den von uns zur Verfügung gestellten Credentials an und wird wieder auf die App zurückgleitet.

In [tab1](/src/app/tab1/tab1.module.ts) findest man den Einstiegspunkt für die Aufgabe.
Dieser gibt eine Dokumentenliste zurück und zeigt exemplarisch wie die verschiedenen Aufrufsarten funktionieren. Die Funktion an sich entspricht nicht unseren Coding Guidelines und ist nur zu illustrativen zwecken.

### Die Aufgabe

Sukzessive kann man jetzt folgende Punkte umsetzen:
1. Responsive und ansprechende Darstellung der Liste
2. Responsive und ansprechende Darstellung der Vorschau der verschiedenen Dokumente(narten)
3. Anzeigen des Menüs auf Listenelemente
4. Den Aktivitäten im Menü folgen - "follow the rabbit hole".

Der Umfang der Aufgabe richtet sich nach verfügbarer Zeit und Lust sich zu vertiefen. 
Dabei sind keine Grenzen gesetzt um die bisher erlernten "best practice" Erfahrungen einzubringen :-)
