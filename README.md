# TIE Probeaufgabe Frontend

Im Grundlegenden ist dies eine "leere" Basisinstallation von Ionic. Startbar ist diese mit `npm run start`.
Der [unauthorized-interceptor.ts](/src/interceptors/unauthorized.interceptor.ts) leitet an den auth-service weiter sobald man nicht mehr eingeloggt ist. Dort meldest du dich mit den von uns zur Verfügung gestellten Credentials an und wirst dann wieder auf die App zurückgleitet.

Im [tab1](/src/app/tab1/tab1.module.ts) findest du den Einstiegspunkt für deine Aufgabe.
Dieser gibt dir eine Dokumentenliste zurück. Und zeigt auch auf wie die 3 Aufrufsarten funktionieren. Die Funktion an sich entspricht nicht unseren Coding Guidelines und ist nur zu illustrativen zwecken.

### Die Aufgabe

Sukzessive kann man jetzt folgende Punkte umsetzen:
1. Responsive und ansprechende Darstellung der Liste
2. Responsive und ansprechende Darstellung der verschiedenen Dokumente(narten)
3. Anzeigen des Menüs auf Listenelemente
4. Den Aktivitäten im Menü folgen - "follow the rabbit hole".

Der Umfang der Aufgabe richtet sich nach verfügbarer Zeit und Lust sich zu vertiefen. 
Dir sind dabei keine Grenzen gesetzt deine bisherigen "best practices" Erfahrungen einzubringen, welche du dir in der Vergangenheit angeeignet hast!
