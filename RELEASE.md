<!--- RELEASE file. La cura di questo file è in carico ai dev.
 Qui vanno inserite tutte le novità e bugfix, spiegati in un linguaggio comprensibile anche ai non dev.
 Se ci sono delle migliorie/novità per cui è stato aggiunto qualcosa nel manuale, linkarlo come nell'esempio sotto.
 -->

<!--- -----------------------------------------------------------------
  Esempio:
  ---------------------------------------------------------------------
## Versione 7.10.9 (31/08/2023)
### Migliorie
- Fissato il layout di stampa per pagine con Accordion
### Novità
- Nuovo blocco "Informazioni" [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.7ty110jumgmd)
### Fix
- il numero di telefono dentro card ufficio adesso è visibile anche senza indirizzo
-->

<!--- -----------------------------------------------------------------
 TEMPLATE PER RELEASE
 ----------------------------------------------------------------------

## Versione X.X.X (dd/mm/yyyy)
### Migliorie
- ...

### Novità
- ...  [`Istruzioni`](url della documentazione relativa alla novità)

### Fix
- ...
-->

## Versione X.X.X (dd/mm/yyyy)

### Migliorie

- Migliorata l'accessibilità del menu in versione mobile.

### Fix

- Quando si clicca sul bottone di login da una pagina specifica, dopo il login si viene reindirizzati alla pagina di provenienza.

## Versione 7.25.2 (04/03/2024)

### Fix

- Sistemata la visualizzazione mobile per il blocco tabella.
- Blocco icone: sistemata la visualizzazione del Titolo e Descrizione nel caso in cui siano vuoti.

## Versione 7.25.0 (20/02/2024)

### Novità

- Sono state aggiunte delle nuove proprietà nel blocco elenco con variazione Bandi in Evidenza per mostrare le Note di aggiornamento anche per i bandi scaduti e la Data di ultima modifica per tutti i bandi.
- Nella ricerca per Bandi sono stati implementati dei pre-filtri non visibili dall'utente configurabili dalla sidebar laterale per rendere la ricerca più specifica all'utente.

### Migliorie

- Nella ricerca per Bandi, i campi di tipo Tipologia/Categoria/Ufficio visibili all'utente, vengono valorizzati a partire dalla "Posizione in cui cercare" valorizzata nella sidebar laterale, non prendono più i valori generali del vocabolario.
- Nella ricerca per Bandi sono stati azzerati i filtri Data quando si atterra in pagina togliendo così la forzatura alla ricerca per data odierna.

### Fix

- Sono stati apportati alcuni aggiustamenti ai sottositi con l'intento di migliorare l'esperienza e aumentare l'accessibilità. In particolare le modifiche riguardano colori, visualizzazione della ricerca, blocchi info, blocco contenuto in primo piano e blocco icone e pulsanti.
- Sono stati corretti alcuni errori nel menu mobile per i sottositi. Ora la lente di ingrandimento è visibile nei sottositi con colori scuri e la freccia nei pulsanti "link ad altro" è del colore del sottosito.
- I link dei Social sono stati resi "parlanti" per motivi di accessibilità, ora viene riportato "Seguici su nome_del_social".
- Sistemato lo skiplink "Vai al contenuto" nella pagina principale di ricerca del sito.
- Migliorato l'HTML semantico per le card del blocco RSS per migliorare l'esperienza d'uso con Screen Reader.
- Rimossi gli heading per alcuni blocchi nel caso il titolo non sia presente al fine di migliorare l'esperienza con l'utilizzo degli Screen Reader.

## Versione 7.24.2 (11/01/2024)

### Migliorie

- sitemata la descrizione di una ricorrenza mensile e annuale

## Versione 7.23.0 (28/11/2023)

### Migliorie

- Aggiornata nuova icona di Twitter
- Nei template dei feed RSS ora viene mostrata la sorgente se presente.

### Fix

- Sistemata sovrapposizione della finestra di selezione blocchi con altri blocchi e con l'header del sito.

## Versione 7.22.2 (11/10/2023)

### Fix

- Sistemato il template degli Rss Card con immagine per mostrare la data corretta

## Versione 7.22.1 (27/09/2023)

### Migliorie

- Nel template Blocco link solo immagini con link esterni, icona accessibilità per link esterni ora è disattivabile attraverso opzione del template
- Migliorata l'accessibilità e il supporto Screen Reader per il menu a tendina "Ordina Per" nella pagina di ricerca
- Migliorata accessibilità del calendario nel blocco ricerca Eventi e ricerca Bandi

### Fix

- Fissato il layout del template Blocco link solo immagini con link esterni, icona accessibilità per link esterni ora è posizionata invece in overlay se presente
- Sistemata la visualizzazione dello stato di caricamento della pagina /search
- Fissata pagina Cartella Modulistica in caso di moduli all'interno di documenti

## Versione 7.21.0 (19/09/2023)

### Novità

- Aggiunto il release-log su panello di configurazioni [`Per accedere alla pagina con le informazioni sugli aggiornamenti accedere all'URL /release-log`]

### Fix

- Blocco info: Colori dentro editor di testo sistemati (bottoni draftJS)
- I link nella modulistica mostrano la remoteUrl

## Versione 7.20.4 (13/09/2023)

### Fix

Accessibilità - Migliorata l'accessibilità del calendario

## Versione 7.20.3 (12/09/2023)

### Fix

Accessibilità - Migliorata l'accessibilità dello Slider

## Versione 7.20.2 (11/09/2023)

### Fix

Sistemato il caricamento delle mappe in alcuni contenuti

## Versione 7.20.1 (06/09/2023)

### Fix

Sistemati i colori del blocco informazioni

## Versione 7.20.0 (05/09/2023)

### Migliorie

- Aggiunto limite di caratteri agli input della descrizione

### Fix

- Sistemato il problema per cui nell'area modulistica eventuali link che puntano
  a file non aprivano il file ma una pagina bianca del sito

<!--- -->

## Versione 7.19.1

### Migliorie

- fissato un problema nei blocchi elenco del megamenu, per cui se si passava ad una pagina diversa, i blocchi elenco nel megamenu rimanevano in 'stato di caricamento'.
<!--- -->

## Versione 7.19.0

### Migliorie

- Accessibilità - migliorie sulla variazione "Slider" dei blocchi elenco
- Accessibilità - migliorata la navigazione dentro al menu principale

### Fix

- fissato focus sul pannello di aggiunta blocchi, che in alcuni casi rimaneva al di sotto dei blocchi sottostanti, inibendo di fatto la possibilità di selezionarli
- Sistemata la visibilità dei CT Luogo nel navigatore: ora vengono proposti anche come voci del menù principale
  <!--- -->

## Versione 7.18.8

### Fix

- rimosso il link di contatto nelle pagine di errore "Non autorizzato" e "Non trovato"
<!--- -->

## Versione 7.18.7

### Fix

- Fissato un bug nella Card di testo con immagine, per cui non era possibile cambiare la dimensione dell'immagine.
<!--- -->

## Versione 7.18.6

### Migliorie

- Migliorata la gestione dei risultati di ricerca del sito (in caso di risultati su più pagine): ora ad esempio, cliccando su un risultato in terza pagina, e poi utilizzando il pulsante "Torna indietro" del browser, il numero di pagina della ricerca da cui si proveniva viene mantenuta.
<!--- -->

## Versione 7.18.5

### Fix

- Fissato un bug nella Cartella modulistica, per cui non si vedevano file, immagini e link inseriti come figli della cartella modulistica.
<!--- -->

## Versione 7.18.1

### Fix

- Fix sull'editor di testo per la gestione dei link
<!--- -->

## Versione 7.18.0

### Novità

- Aggiunto campo ricerca dentro al Content-type "Cartella Modulistica" - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.97ulwc4mjw7c)

### Fix

- Fissato comportamento della checkbox per impostare lo sfondo nei "Blocchi elenco"
<!--- -->

## Versione 7.15.2

### Novità

- Nuovo "Blocco Grid" - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.xfn2p1uq4gaw)
<!--- -->

## Versione 7.14.0

### Migliorie

- Migliorato il comportamento del "Blocco Accordion", per gestirne il corretto posizionamento in pagina sull'espansione delle voci
- Accessibilità migliorata per la ricerca in testata
<!--- -->

## Versione 7.13.1

### Novità

- Fissato Numero di slide da scorrere su mobile ("Blocco elenco" con variazione "Slider") settato a 1
- "Blocco Twitter" rimosso (per modifiche delle condizioni di utilizzo da parte di Twitter)
<!--- -->

## Versione 7.13.1

### Migliorie

- Accessibilità - migliorata sulla variazione "Slider" dei blocchi elenco
<!--- -->

## Versione 7.12.0

### Fix

- Fissato il meccanismo di focus del menù laterale, sulla selezione dei blocchi nella pagina
<!--- -->

## Versione 7.12.0

### Migliorie

- Accessibilità - aggiornato il cookie banner (focus)

### Fix

- fix varie inerenti l'Accessibilità
- numero di telefono dentro card ufficio adesso è visibile anche senza indirizzo
- fix stili per il cookie banner
<!--- -->

## Versione 7.11.1

### Migliorie

- Aggiunte le frecce per la navigazione su blocco calendario
<!--- -->

## Versione 7.11.0

### Fix

- Reintrodotto bottone "link ad altro" su "Blocco calendario"
- Gestione errori su blocco twitter
<!--- -->

## Versione 7.10.0

### Migliorie

- Fissato il layout di stampa per pagine con Accordion
- aggiunte nuove opzioni di ordinamento nel blocco di ricerca Bandi: data effettiva e data modificata

### Fix

- Minor fix sul meccanismo di "Stampa" dei contenuti
<!--- -->

## Versione 7.9.0

### Fix

- Minor fix su comportamenti "Blocco Form"
<!--- -->

## Versione 7.8.3

### Fix

- Fissato "Blocco indice dei contenuti"
<!--- -->

## Versione 7.6.0

### Novità

- Possibilità di dimensionare l'icona (S, M, L) associata al blocco Alert
<!--- -->

## Versione 7.5.1

### Fix

- Sistemato meccanismo di Copia/incolla per i blocchi
<!--- -->

## Versione 7.5.0

### Migliorie

- "Blocco icone" - le icone ora restano allineate in alto ed hanno un'altezza fissa
- Opzione per scegliere il colore per lo sfondo delle card nel "Blocco elenco" con variazione "Link completo" - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.xhyzg6rqxc5g)

### Novità

- Aggiunta opzione nel blocco "Blocco con icone" per centrare le card - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.fwmn2siovvzr)
- Nuovo blocco "Informazioni" - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.7ty110jumgmd)
- Aggiunta opzione per scegliere la dimensione dell'immagine su blocco "Alert"
- Aggiornato il selettore colori su "Blocco Alert" - [`Istruzioni`](https://docs.google.com/document/d/1SThuxa_ah0BuNXukWs564kKPfprK41WLQE8Mome-0xg/edit#heading=h.40rlr8tbssi)

### Fix

- Fissata immagine su editor del blocco HERO
<!--- -->

## Versione 7.3.0

### Migliorie

- Aggiunta descrizione per il campo select dentro al "Blocco Form"
  <!--- -->
