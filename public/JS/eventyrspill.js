document.getElementById("restart").onclick = start;

async function oppdaterspill(tekst) {
    document.getElementById("spilltekst").innerHTML = tekst;

    document.getElementById("svara").style.display = "";
    document.getElementById("svarb").style.display = "";
    document.getElementById("restart").style.display = "none";

    var promiseA = new Promise((resolve, reject) => {
        document.getElementById("svara").onclick = () => {resolve("a");};
    });
    var promiseB = new Promise((resolve, reject) =>  {
        document.getElementById("svarb").onclick = () => {resolve("b");};
    });

    var svar = await Promise.race([promiseA, promiseB]);

    return svar;
}

function ferdigspill(tekst) {
    document.getElementById("spilltekst").innerHTML = tekst;

    document.getElementById("svara").style.display = "none";
    document.getElementById("svarb").style.display = "none";
    document.getElementById("restart").style.display = "";
}
    
    // Transcrypt'ed from Python, 2018-10-08 14:29:09
async function samlingspunkt1a() {
    var svar = await oppdaterspill ('Turbinen slår følge. Etter å ha gått et stykke ser dere en koianistisk hær i ferd med å angripe en uskyldig vindturbinistisk landsby. Hva gjør du?<br><br>                 a: Du tenker at de er for mange, og skynder deg vekk så de ikke angriper deg også.<br><br>                 b: Du får med deg vindturbinen og angriper hæren for å forsvare den uskyldige landsbyen. Selv om de er mange, har du et lite håp om å overleve, men du tenker at det ikke handler om å overleve, men å gjøre det rette. Mens du løper mot dem, roper du: Turbinus Vult!<br><br> ');
    if (svar == 'a') {
        var svar = await oppdaterspill ('Vindturbinen er ikke fornøyd med ditt valg, og prøver å overtale deg til å hjelpe landsbyen. Du står på ditt og sier de er for mange. Du går til slutt lei, og får turbinen til å forsøke å hjelpe landsbyen på egen hånd. Det er dessverre for sent, og hele landsbyen blir ødelagt. Vindturbinen kjemper hardt og lenge mot hæren, men faller til slutt. Du er glad for at du ikke ble med og kjempet, men synes ikke synd på vindturbinen, som selv valgte å kjempe. Da ser en bueskytter deg og sikter. Hva gjør du?<br><br>                     a: Ber til Vindturbinguden om tilgivelse for at du ikke hjalp vindturbinen i kamp. Du innser nå at det var feil, og lar bueskytteren drepe deg.<br><br>                     b: Du legger deg ned for å bli vanskeligere å treffe. Du tenker at dette aldri hadde skjedd hvis du ikke hadde latt vindturbinen ta følge med deg, og prøver å krype vekk.<br><br>     ');
        if (svar == 'a') {
            ferdigspill ('Du blir drept av bueskytteren, men våkner opp på et fantastisk sted, med majestetiske vindturbiner over alt. Det er det peneste stedet du noen gang har sett, og overgår dine villeste fantasier. Du innser at du er i himmelen, og blir fylt av en evig lykke, mens du går inn i evigheten med et smil om munnen.');
        }
        else if (svar == 'b') {
            var svar = await oppdaterspill ('Hæren leter etter deg mens du kravler vekk. Du kommer til slutt til et stup og innser at det ikke er noen vei videre. Hæren finner deg til slutt og halshugger deg for å kvitte seg med alle vitner. Du er plutselig et helt annet sted, hvor alt brenner, og du ser en vindturbin som kan ta deg opp til et bedre sted. Du innser at du er i Helvete, og at vindturbinen kan ta deg til Himmelen. Hva gjør du?<br><br>                     a: Hopper etter ett av turbinbladene for å sitte på opp til Himmelen.<br><br>                     b: Aksepterer din skebne, og angrer på de valgene du tok i livet som førte deg hit.<br><br>     ');
            if (svar == 'a') {
                ferdigspill ('Hver gang du hopper etter et blad, vil det for deg alltid vike. Du blir stående slik i all evighet og hoppe etter bladet som alltid viker, hver gang med et håp om at den gangen skal bli annerledes.');
            }
            else if (svar == 'b') {
                ferdigspill ('Det er desverre for sent å endre på dine handlinger i livet. Du blir værende i de pinefulle flammene i all evighet.');
            }
        }
    }
    else if (svar == 'b') {
        ferdigspill ('Du løper inn i kamp med vindturbinen ved din side. Den koianistiske hæren kjemper hardt, og du innser at du kanskje ikke vil komme fra dette i live. Du tenker at det viktigste er å redde landsbyen, og fortsetter å kjempe. Koianistene faller én etter én, men det virker som det aldri skal ta slutt. Du stopper opp et øyeblikk for å puste, og kjenner plutselig en pil treffe deg i ryggen. Du fortsetter å kjempe, med fornyet raseri. Du trekker ut pilen av ryggen og kaster den mot bueskytteren som skjøt deg. Pilen går rett i hjertet hans, og han dør umiddelbart. Du merker at du er døende, men fortsetter å kjempe til alle koianistene er døde. Du legger deg nedd på bakken, stolt over at du har reddet en hel landsby. Du takker vindturbinen og legger deg ned for å dø. Du våkner opp på et fantastisk sted, med majestetiske vindturbiner over alt. Det er det peneste stedet du noen gang har sett, og overgår dine villeste fantasier. Du innser at du er i himmelen, og blir fylt av en evig lykke, mens du går inn i evigheten med et smil om munnen.');
    }
}
async function samlingspunkt1b() {
    var svar = await oppdaterspill ('Du forlater vindturbinen og går videre, mens du lurer på om du egentlig burde ha sagt ja til å få følge av vindturbinen. Du kommer til et veiskille med tre veier, men har ikke lyst til å gå rett frem. Hvilken vei tar du?<br><br>                 a: Høyre<br><br>                 b: Venstre<br><br> ');
    if (svar == 'a') {
        var svar = await oppdaterspill ('Du går et stykke og kommer inn i en mørk skog. Du ser ned, og ser plutselig mange firkløvere. Dette kan bare bety én ting:<br><br>            a: Masse hell og lykke! Dette er din lykkedag!<br><br>            b: Det er koianister i nærheten, du må være forsiktig.<br><br>     ');
        if (svar == 'a') {
            var svar = await oppdaterspill ("Du stopper for å plukke firkløvere for å ta dem med deg hjem. Du gleder deg til å vinne i lotto og alt annet som kommer til å skje med alt dette hellet. Du sitter i dine egne tanker en stund, før du hører en gren knekke. Du ser rundt deg og sperrer øynene opp. Rundt deg står et par titalls bevæpnede koianister. De binder deg på hendene og føttene og du får bind for øynene. De bærer deg et sted, men du vet ikke hvor. En stund senere blir du satt i en stol og bundet fast. Deretter fjernes bindet fra øynene dine. Du er i et grønt hus. Det er det styggeste huset du noen gang har sett, og innser at det må være koianistenes hovedkvarter. Plutselig braser en høyt dekorert soldat inn i rommet. Det er den koianistiske hærens general. Han roper: 'Hva er det som er så viktig at jeg måtte avbryte angrepet på en hel vindturbinistisk landsby?!' En liten stygg mann med ring i nesen og rufsete, uvasket hår går bort til generalen og bukker dypt, før han snakker med en stemme som skjærer i ørene dine: 'Vi har funnet en høyt rangert vindturbinist, så høyt rangert at han er mer verdt enn ti hele vindturbinistiske landsbyer til sammen! Han er den beste fangsten vi noen gang har fått!' Generalen ser fornøyd ut, og tar med seg alle koianistene i rommet ut for å diskutere hva de skal gjøre med deg. Du innser at dette er din sjanse til å unnslippe. Hva gjør du?<br><br>                         a: Prøver å få hendene løs.<br><br>                         b: Prøver å bevege stolen nærmere et bord med en kniv på, som du kan bruke til å skjære deg løs.<br><br>         ");
            if (svar == 'a') {
                var svar = await oppdaterspill ('Du prøver og prøver, men hendene kommer ingen vei. Koianistene var virkelig gode til å knyte stramt nok. Du prøver desperat å bevege stolen nærmere bordet med en kniv på, men gjør det for fort, og stolen velter. Koianistene kommer brasende inn døren. Det virker som de vil bruke deg som forhandling med vindturbinistene for å få utlevert noen krigsfanger. En av dem får plutselig en idé om at vindturbinistene sikkert synes det viktigste er å få deg i live, ikke nødvendigvis uskadet. De bestemmer seg derfor for å sage av deg armene dine. En av dem tar frem en vanlig metallsag. Hva gjør du?<br><br>                             a: Trygler dem om at de skal la være å sage av armene dine. Du skal avsløre alle de vindturbinistiske hemmelighetene du vet om, og til og med konvertere til koianismen, bare de lar være å skade deg og lar deg gå til slutt.<br><br>                             b: Du ber til Vindturbinguden og de tre vindgudene om å gi deg styrke til å komme deg løs og kjempe tilbake mot koianistene før de påfører deg uopprettelig skade og ødelegger dine muligheter for å kjempe i fremtiden.<br><br>             ');
                if (svar == 'a') {
                    var svar = await oppdaterspill ('Koianistene går med på forslaget ditt, og du forteller dem alle hemmelighetene om vindturbinismens planer og tilholdssteder, og du konverterer til koianismen. Plutselig blir det et voldsomt uvær, og du kan kjenne bygningen riste. Du ser ut vinduet, og ser de tre vindgudene. Vinden blåser opp i supersoniske hastigheter, og den begynner å lage sprekker i bygningen. Du tar med deg koianistene for å evauere bygningen, men før noen får stukket av faller hele bygget sammen, og alle dør. Du er plutselig et helt annet sted, hvor alt brenner, og du ser en vindturbin som kan ta deg opp til et bedre sted. Du innser at du er i Helvete, og at vindturbinen kan ta deg til Himmelen. Hva gjør du?<br><br>                     a: Hopper etter ett av turbinbladene for å sitte på opp til Himmelen.<br><br>                     b: Aksepterer din skebne, og angrer på de valgene du tok i livet som førte deg hit.<br><br>     ');
                    if (svar == 'a') {
                        ferdigspill ('Hver gang du hopper etter et blad, vil det for deg alltid vike. Du blir stående slik i all evighet og hoppe etter bladet som alltid viker, hver gang med et håp om at den gangen skal bli annerledes.');
                    }
                    else if (svar == 'b') {
                        ferdigspill ('Det er desverre for sent å endre på dine handlinger i livet. Du blir værende i de pinefulle flammene i all evighet.');
                    }
                }
                else if (svar == 'b') {
                    ferdigspill ('Du kjenner en ufattelig kraft bygge seg opp i kroppen din, og med et brøl river du opp tauene og kommer deg løs. Med et voldsomt raseri slår du løs på alle koianistene til de så vidt fortsatt puster. De ligger bevisstløse, uten å kunne bevege seg. Du går ut av bygget, samler styrke, og river ned hele bygget, og dreper alle koianistene inni. Du ser et annet mye mindre hus ved siden av, og går inn. Hele huset består av en enkelt fengselscelle, med plass til kanskje ti fanger. Det sitter likevel kun én stakkarslig liten jente der, med rufsete hår og røde øyne. Hun hadde åpenbart grått. På armen hennes gjenkjenner du symbolet for vindturbinisme. Du kjenner at kreftene snart forsvinner igjen, og bruker siste rest til å rive opp fengselsdøren og slippe jenten fri. Du bøyer deg rolig ned og gir henne en klem. Plutselig tar jenten frem en dolk, og dolker deg i ryggen. Hun begynner å le en hysterisk latter, og endrer utseende. Det er den stygge lille mannen med ring i nesen. Du kjenner livet sige ut av kroppen, og tar en siste kraftanstrengelse, tar ut dolken fra ryggen, og stikker den i hjertet på mannen. Du takker Vindturbinguden for å ha gitt deg styrke, faller sammen, og dør. Du våkner opp på et fantastisk sted, med majestetiske vindturbiner over alt. Det er det peneste stedet du noen gang har sett, og overgår dine villeste fantasier. Du innser at du er i himmelen, og blir fylt av en evig lykke, mens du går inn i evigheten med et smil om munnen.');
                }
            }
            else if (svar == 'b') {
                var svar = await oppdaterspill ('Du kommer deg sakte, men sikkert nærmere bordet, og får til slutt tak i kniven. Du skjærer deg løs, og sniker deg ut en lite bevoktet bakdør. Du dreper de to koianistiske vaktene, og sniker deg ut av bygningen, før du løper vekk. Du løper tilbake til vindturbinismens hovedkvarter. Du forteller dem at du vet hvor hovedkvarteret, samt hæren til koianismen, er, og dere forbereder et angrep.<br><br>                             *30 år senere*<br><br>                             Koianismen er utslettet. Fred og frihet preger verden, som nå er samlet i landet Vindturbinia. Dere har oppnådd deres største drømmer, og verden er perfekt. Så perfekt at Himmelen ikke lenger er noe man lengter etter mens man lever, men et sted man vil være når man ikke lenger kan være på Jorden.');
            }
        }
        else if (svar == 'b') {
            var svar = await oppdaterspill ('Du skynder deg og klatrer opp i et tre. Du ser to koianister som stopper og plukker firkløvere. Hva gjør du?<br><br>                         a: Hopper ned og angriper dem.<br><br>                         b: Venter til de går videre, vurderer situasjonen og følger etter dem.<br><br>         ');
            if (svar == 'a') {
                var svar = await oppdaterspill ("Du bekjemper lett de to koianistene, men innser plutselig at du er omringet av et titalls bevæpnede koianister. De binder deg på hendene og føttene og du får bind for øynene. De bærer deg et sted, men du vet ikke hvor. En stund senere blir du satt i en stol og bundet fast. Deretter fjernes bindet fra øynene dine. Du er i et grønt hus. Det er det styggeste huset du noen gang har sett, og innser at det må være koianistenes hovedkvarter. Plutselig braser en høyt dekorert soldat inn i rommet. Det er den koianistiske hærens general. Han roper: 'Hva er det som er så viktig at jeg måtte avbryte angrepet på en hel vindturbinistisk landsby?!' En liten stygg mann med ring i nesen og rufsete, uvasket hår går bort til generalen og bukker dypt, før han snakker med en stemme som skjærer i ørene dine: 'Vi har funnet en høyt rangert vindturbinist, så høyt rangert at han er mer verdt enn ti hele vindturbinistiske landsbyer til sammen! Han er den beste fangsten vi noen gang har fått!' Generalen ser fornøyd ut, og tar med seg alle koianistene i rommet ut for å diskutere hva de skal gjøre med deg. Du innser at dette er din sjanse til å unnslippe. Hva gjør du?<br><br>                         a: Prøver å få hendene løs.<br><br>                         b: Prøver å bevege stolen nærmere et bord med en kniv på, som du kan bruke til å skjære deg løs.<br><br>         ");
                if (svar == 'a') {
                    var svar = await oppdaterspill ('Du prøver og prøver, men hendene kommer ingen vei. Koianistene var virkelig gode til å knyte stramt nok. Du prøver desperat å bevege stolen nærmere bordet med en kniv på, men gjør det for fort, og stolen velter. Koianistene kommer brasende inn døren. Det virker som de vil bruke deg som forhandling med vindturbinistene for å få utlevert noen krigsfanger. En av dem får plutselig en idé om at vindturbinistene sikkert synes det viktigste er å få deg i live, ikke nødvendigvis uskadet. De bestemmer seg derfor for å sage av deg armene dine. En av dem tar frem en vanlig metallsag. Hva gjør du?<br><br>                                 a: Trygler dem om at de skal la være å sage av armene dine. Du skal avsløre alle de vindturbinistiske hemmelighetene du vet om, og til og med konvertere til koianismen, bare de lar være å skade deg og lar deg gå til slutt.<br><br>                                 b: Du ber til Vindturbinguden og de tre vindgudene om å gi deg styrke til å komme deg løs og kjempe tilbake mot koianistene før de påfører deg uopprettelig skade og ødelegger dine muligheter for å kjempe i fremtiden.<br><br>                 ');
                    if (svar == 'a') {
                        var svar = await oppdaterspill ('Koianistene går med på forslaget ditt, og du forteller dem alle hemmelighetene om vindturbinismens planer og tilholdssteder, og du konverterer til koianismen. Plutselig blir det et voldsomt uvær, og du kan kjenne bygningen riste. Du ser ut vinduet, og ser de tre vindgudene. Vinden blåser opp i supersoniske hastigheter, og den begynner å lage sprekker i bygningen. Du tar med deg koianistene for å evauere bygningen, men før noen får stukket av faller hele bygget sammen, og alle dør. Du er plutselig et helt annet sted, hvor alt brenner, og du ser en vindturbin som kan ta deg opp til et bedre sted. Du innser at du er i Helvete, og at vindturbinen kan ta deg til Himmelen. Hva gjør du?<br><br>                                     a: Hopper etter ett av turbinbladene for å sitte på opp til Himmelen.<br><br>                                     b: Aksepterer din skebne, og angrer på de valgene du tok i livet som førte deg hit.<br><br>                     ');
                        if (svar == 'a') {
                            ferdigspill ('Hver gang du hopper etter et blad, vil det for deg alltid vike. Du blir stående slik i all evighet og hoppe etter bladet som alltid viker, hver gang med et håp om at den gangen skal bli annerledes.');
                        }
                        else if (svar == 'b') {
                            ferdigspill ('Det er desverre for sent å endre på dine handlinger i livet. Du blir værende i de pinefulle flammene i all evighet.');
                        }
                    }
                    else if (svar == 'b') {
                        ferdigspill ('Du kjenner en ufattelig kraft bygge seg opp i kroppen din, og med et brøl river du opp tauene og kommer deg løs. Med et voldsomt raseri slår du løs på alle koianistene til de så vidt fortsatt puster. De ligger bevisstløse, uten å kunne bevege seg. Du går ut av bygget, samler styrke, og river ned hele bygget, og dreper alle koianistene inni. Du ser et annet mye mindre hus ved siden av, og går inn. Hele huset består av en enkelt fengselscelle, med plass til kanskje ti fanger. Det sitter likevel kun én stakkarslig liten jente der, med rufsete hår og røde øyne. Hun hadde åpenbart grått. På armen hennes gjenkjenner du symbolet for vindturbinisme. Du kjenner at kreftene snart forsvinner igjen, og bruker siste rest til å rive opp fengselsdøren og slippe jenten fri. Du bøyer deg rolig ned og gir henne en klem. Plutselig tar jenten frem en dolk, og dolker deg i ryggen. Hun begynner å le en hysterisk latter, og endrer utseende. Det er den stygge lille mannen med ring i nesen. Du kjenner livet sige ut av kroppen, og tar en siste kraftanstrengelse, tar ut dolken fra ryggen, og stikker den i hjertet på mannen. Du takker Vindturbinguden for å ha gitt deg styrke, faller sammen, og dør. Du våkner opp på et fantastisk sted, med majestetiske vindturbiner over alt. Det er det peneste stedet du noen gang har sett, og overgår dine villeste fantasier. Du innser at du er i himmelen, og blir fylt av en evig lykke, mens du går inn i evigheten med et smil om munnen.');
                    }
                }
                else if (svar == 'b') {
                    var svar = await oppdaterspill ('Du kommer deg sakte, men sikkert nærmere bordet, og får til slutt tak i kniven. Du skjærer deg løs, og sniker deg ut en lite bevoktet bakdør. Du dreper de to koianistiske vaktene, og sniker deg ut av bygningen, før du løper vekk. Du løper tilbake til vindturbinismens hovedkvarter. Du forteller dem at du vet hvor hovedkvarteret, samt hæren til koianismen, er, og dere forbereder et angrep.<br><br>                                 *30 år senere*<br><br>                                 Koianismen er utslettet. Fred og frihet preger verden, som nå er samlet i landet Vindturbinia. Dere har oppnådd deres største drømmer, og verden er perfekt. Så perfekt at Himmelen ikke lenger er noe man lengter etter mens man lever, men et sted man vil være når man ikke lenger kan være på Jorden.');
                }
            }
            else if (svar == 'b') {
                var svar = await oppdaterspill ('De går videre, og du ser etter hvert noen andre koianister som følger etter. Når de siste koianistene har gått, klatrer du ned og følger etter. Dere går et stykke, før dere kommer til et grønt hus. Du ser et firkløversymbol, og skjønner at det er koianistenes  hovedkvarter. Hva gjør du?<br><br>                             a: Drar tilbake til det vindturbinistiske hovedkvarteret for å fortelle hvor koianistenes hovedkvarter er og planlegge et angrep.<br><br>                             b: Utforsker videre.<br><br>             ');
                if (svar == 'a') {
                    ferdigspill ('Du forteller hvor hovedkvarteret til koianistene er, og dere planlegger et angrep.<br><br>                          *30 år senere*<br><br>                          Verden er i kaos. Angrepet mot hovedkvarteret var vellykket, men den koianistiske hæren var ikke der, og slapp unna. Generalen ble koianismens nye leder, og radikaliserte religionen til å bli verre enn den var før. Vindturbinismen tok kontroll over verden og samlet den til ett land, Vindturbinia, mens koianismen vokste i det skjulte. De lagde et helt hemmelig nettverk av radikale koianister, noen høyt oppe i vindturbinismens hierarki. En dag slo de til og forsøkte å ta over kontrollen av landet. Dere klarte så vidt å stoppe dem, men led store tap, og klarte ikke å hindre at koianistene tok kontroll over tidligere Midtøsten, og dannet landet Koianistan. Der utviklet de atomvåpen, og det er nå en slags terrorbalanse, hvor ingen av partene vil bruke atomvåpen, siden det vil bli besvart med atomangrep tilbake. Så selv om det er en nokså åpen krig, finnes det ingen god måte å ende krigen på. Selv kjenner du et voldsomt hat for koianismen, etter at noen radikale koianister drepte familien din i et selvmordsangrep. Du ser tilbake, og lurer på hva du kunne gjort annerledes, men klarer ikke å se hva.');
                }
                else if (svar == 'b') {
                    var svar = await oppdaterspill ("Du sniker deg inn en bakdør, og inn i en gang. Du hører noen koianister snakke sammen lenger fremme, så du sniker deg nærmere. Plutselig kjenner du noe slå deg i bakhodet, og alt blir svart. Du våkner opp, bundet fast til en stol og med bind for øynene. Noen fjerner bindet fra øynene, og du ser deg rundt. Rommet er helt grønt, og du innser at du fortsatt er i hovedkvarteret. Plutselig braser en høyt dekorert soldat inn i rommet. Det er den koianistiske hærens general. Han roper: 'Hva er det som er så viktig at jeg måtte avbryte angrepet på en hel vindturbinistisk landsby?!' En liten stygg mann med ring i nesen og rufsete, uvasket hår går bort til generalen og bukker dypt, før han snakker med en stemme som skjærer i ørene dine: 'Vi har funnet en høyt rangert vindturbinist, så høyt rangert at han er mer verdt enn ti hele vindturbinistiske landsbyer til sammen! Han er den beste fangsten vi noen gang har fått!' Generalen ser fornøyd ut, og tar med seg alle koianistene i rommet ut for å diskutere hva de skal gjøre med deg. Du innser at dette er din sjanse til å unnslippe. Hva gjør du?<br><br>                         a: Prøver å få hendene løs.<br><br>                         b: Prøver å bevege stolen nærmere et bord med en kniv på, som du kan bruke til å skjære deg løs.<br><br>         ");
                    if (svar == 'a') {
                        var svar = await oppdaterspill ('Du prøver og prøver, men hendene kommer ingen vei. Koianistene var virkelig gode til å knyte stramt nok. Du prøver desperat å bevege stolen nærmere bordet med en kniv på, men gjør det for fort, og stolen velter. Koianistene kommer brasende inn døren. Det virker som de vil bruke deg som forhandling med vindturbinistene for å få utlevert noen krigsfanger. En av dem får plutselig en idé om at vindturbinistene sikkert synes det viktigste er å få deg i live, ikke nødvendigvis uskadet. De bestemmer seg derfor for å sage av deg armene dine. En av dem tar frem en vanlig metallsag. Hva gjør du?<br><br>                             a: Trygler dem om at de skal la være å sage av armene dine. Du skal avsløre alle de vindturbinistiske hemmelighetene du vet om, og til og med konvertere til koianismen, bare de lar være å skade deg og lar deg gå til slutt.<br><br>                             b: Du ber til Vindturbinguden og de tre vindgudene om å gi deg styrke til å komme deg løs og kjempe tilbake mot koianistene før de påfører deg uopprettelig skade og ødelegger dine muligheter for å kjempe i fremtiden.<br><br>             ');
                        if (svar == 'a') {
                            var svar = await oppdaterspill ('Koianistene går med på forslaget ditt, og du forteller dem alle hemmelighetene om vindturbinismens planer og tilholdssteder, og du konverterer til koianismen. Plutselig blir det et voldsomt uvær, og du kan kjenne bygningen riste. Du ser ut vinduet, og ser de tre vindgudene. Vinden blåser opp i supersoniske hastigheter, og den begynner å lage sprekker i bygningen. Du tar med deg koianistene for å evauere bygningen, men før noen får stukket av faller hele bygget sammen, og alle dør. Du er plutselig et helt annet sted, hvor alt brenner, og du ser en vindturbin som kan ta deg opp til et bedre sted. Du innser at du er i Helvete, og at vindturbinen kan ta deg til Himmelen. Hva gjør du?<br><br>                                         a: Hopper etter ett av turbinbladene for å sitte på opp til Himmelen.<br><br>                                         b: Aksepterer din skebne, og angrer på de valgene du tok i livet som førte deg hit.<br><br>                         ');
                            if (svar == 'a') {
                                ferdigspill ('Hver gang du hopper etter et blad, vil det for deg alltid vike. Du blir stående slik i all evighet og hoppe etter bladet som alltid viker, hver gang med et håp om at den gangen skal bli annerledes.');
                            }
                            else if (svar == 'b') {
                                ferdigspill ('Det er desverre for sent å endre på dine handlinger i livet. Du blir værende i de pinefulle flammene i all evighet.');
                            }
                        }
                        else if (svar == 'b') {
                            ferdigspill ('Du kjenner en ufattelig kraft bygge seg opp i kroppen din, og med et brøl river du opp tauene og kommer deg løs. Med et voldsomt raseri slår du løs på alle koianistene til de så vidt fortsatt puster. De ligger bevisstløse, uten å kunne bevege seg. Du går ut av bygget, samler styrke, og river ned hele bygget, og dreper alle koianistene inni. Du ser et annet mye mindre hus ved siden av, og går inn. Hele huset består av en enkelt fengselscelle, med plass til kanskje ti fanger. Det sitter likevel kun én stakkarslig liten jente der, med rufsete hår og røde øyne. Hun hadde åpenbart grått. På armen hennes gjenkjenner du symbolet for vindturbinisme. Du kjenner at kreftene snart forsvinner igjen, og bruker siste rest til å rive opp fengselsdøren og slippe jenten fri. Du bøyer deg rolig ned og gir henne en klem. Plutselig tar jenten frem en dolk, og dolker deg i ryggen. Hun begynner å le en hysterisk latter, og endrer utseende. Det er den stygge lille mannen med ring i nesen. Du kjenner livet sige ut av kroppen, og tar en siste kraftanstrengelse, tar ut dolken fra ryggen, og stikker den i hjertet på mannen. Du takker Vindturbinguden for å ha gitt deg styrke, faller sammen, og dør. Du våkner opp på et fantastisk sted, med majestetiske vindturbiner over alt. Det er det peneste stedet du noen gang har sett, og overgår dine villeste fantasier. Du innser at du er i himmelen, og blir fylt av en evig lykke, mens du går inn i evigheten med et smil om munnen.');
                        }
                    }
                    else if (svar == 'b') {
                        var svar = await oppdaterspill ('Du kommer deg sakte, men sikkert nærmere bordet, og får til slutt tak i kniven. Du skjærer deg løs, og sniker deg ut en lite bevoktet bakdør. Du dreper de to koianistiske vaktene, og sniker deg ut av bygningen, før du løper vekk. Du løper tilbake til vindturbinismens hovedkvarter. Du forteller dem at du vet hvor hovedkvarteret, samt hæren til koianismen, er, og dere forbereder et angrep.<br><br>                                     *30 år senere*<br><br>                                     Koianismen er utslettet. Fred og frihet preger verden, som nå er samlet i landet Vindturbinia. Dere har oppnådd deres største drømmer, og verden er perfekt. Så perfekt at Himmelen ikke lenger er noe man lengter etter mens man lever, men et sted man vil være når man ikke lenger kan være på Jorden.');
                    }
                }
            }
        }
    }
    else if (svar == 'b') {
        var svar = await oppdaterspill ('Du kommer til et vann. Et stykke uti vannet ser du noen skip som tilhører skibsdommen. De oppdager deg, og kommer mot deg. Skibsdommen og vindturbinismen er fiender, men ikke i krig, så du tenker at de ikke kommer til å angripe deg. Plutselig løsner et av skipene likevel et skudd som treffer rett ved siden av deg. Hva gjør du?<br><br>                     a: Løper tilbake til hovedkvarteret og forteller at skibsdommen brøt fredsavtalen.<br><br>                     b: Kjemper tilbake, men prøver å forhindre full krig.<br><br>     ');
        if (svar == 'a') {
            var svar = await oppdaterspill ("Du forteller at skibsdommen brøt fredsavtalen. Du innser plutselig at ingen av vindgudene er der, og henvender deg til den høyeste rangerte der, som kun er ett nivå over deg. Han blir forskrekket av nyhetene, og spør deg om hva du synes dere skal gjøre. Hva svarer du?<br><br>                         a: 'Vi må svare med et motangrep. Et angrep betyr brudd på fredsavtalen, som betyr krig.'<br><br>                         b: 'Vi må kontakte ledelsen til skibsdommen, og fosøke å overtale dem til å holde fredsavtalen før det bryter ut full krig.'<br><br>         ");
            if (svar == 'a') {
                ferdigspill ('Dere går til angrep på skibsdommen, som virker overraskende uforberedt på situasjonen, men likevel kjemper hardt tilbake. De allierer seg med koianistene, og det blir en voldsom krig.<br><br>                      *30 år senere*<br><br>                      Det gikk galt. Fryktelig galt. Alt sammen. Alle dine håp og drømmer, borte. Du har gjemt deg bort dypt inne i en hule i fjellet, med nok mat til et par måneder. Sannsynligvis er du den siste gjenlevende vindturbinisten. Du vet at du sannsynligvis ikke kommer til å overleve når maten går tom og du må finne mer. Og selv hvis du skulle klare det, vil du sannsynligvis fryse ihjel når vinteren kommer. Du tenker sørgmodig på hvordan vindturbinismen virket som den ikke kunne stoppes av noe, da dere alle var uovervinnelige. En tåre renner nedover kinnet ditt. Tankene vender hele tiden tilbake til den gangen for 30 år siden. Det var din feil. Alt sammen. Din forhastede beslutning var årsaken til alt dette. Uten den kunne alt gått annerledes. Du lukker øynene, og ber til Vindturbinguden, hvis han virkelig eksisterer, om at vindturbinismen en dag i fremtiden skal komme igjen. At oppvåkningen skal skje på ny, når verden på nytt er klar, og at det denne gangen skal gå annerledes. Men innerst inne vet du, at ondskapen vant. At koianismen ikke vil tillate en ny oppvåkning. Likevel sitter du der og håper. Ber om at du tar feil, at dere skal få en ny sjanse. Du gruer deg til døden, i frykt for at din mislykkethet og svinnende tro skal hindre deg i å nå Himmelen, dersom den engang eksisterer.');
            }
            else if (svar == 'b') {
                ferdigspill ('Dere kontakter skibsdommen og forklarer situasjonen. Dere blir sjokkert når dere får høre at det ikke var et planlagt angrep eller en krigserklæring, men handlingen til en gruppe radikale medlemmer av skibsdommen som har brutt ut av skibsdommen. Det har allerede blitt satt ut en etterlysning, og de regner med å få tatt dem i løpet av et par dager. Du blir lettet over at dere unngikk krig, og er glad for at du ikke valgte å gå til krig, spesielt siden dere allerede har koianismen å kjempe mot. Du er fornøyd med hvordan dagen utviklet seg, selv om det føles som at du er tilbake der du startet, selv etter alt som skjedde.');
            }
        }
        else if (svar == 'b') {
            ferdigspill ('Du hopper ut i vannet, og svømmer under vann for at de ikke skal kunne se hvor du er og skyte deg. Når du kommer nærme nok skipene, går du opp til overfaten og får luft. Du har på veien lagt en plan for hvordan du kan forsøke å bekjempe skipene uten at skibsdommen tar det som en krigserklæring, ettersom du har konkludert med at dette er et engangstilfelle og ikke en krigserklæring. For å unngå krig må det være riktig, du må fullføre planen, og den må virke slik du tror den kommer til å virke. Du hopper opp på det ene skipet. Du tenker tilbake på hva du lærte i ToF1, og bruker kunnskapene dine til å minke GM-en til skipet til det blir under 0. Så gjør du det samme med de andre skipene, og ser dem velte og synke, én etter én. For medlemmene av skibsdommen kommer det til å se ut som skipene var dårlig laget, og at de veltet av seg selv, og ingen av dem vil tro at vindturbinismen har angrepet dem. Etter hvert som dagene går, skjønner du at planen var vellykket, ettersom det ikke bryter ut noen krig. Du er fornøyd med arbeidet ditt, spesielt siden du potensielt hindret at skipene angrep flere uskyldige mennesker som kunne tolke det som en krigserklæring.');
        }
    }
};

async function start() {

    var svar = await oppdaterspill ('Du går langs en vei. Plutselig møter du en vindturbin! Hva sier du?<br><br>             a: Jeg elsker koianismen!<br><br>             b: Ave Turbinus!<br><br>      ');

    if (svar == 'a') {
        var svar = await oppdaterspill ('Turbinen blir aggressiv og begynner å spinne raskere. Himmelen begynner å tordne og vinden begynner å blåse sterkt. Hva gjør du?<br><br>                 a: Sier: Unnskyld, det var en vits! Ave Turbinus!<br><br>                 b: Ber til de fire store og løper.<br><br> ');
        if (svar == 'a') {
            var svar = await oppdaterspill ('Vindturbinen roer seg ned, og det samme gjør været. Vindturbinen beklager for sin oppførsel og spør om den kan slå følge. Hva svarer du?<br><br>                     a: Ja, gjerne. Det er meg en stor ære å få følge av en vindturbin. Ave Turbinus!<br><br>                     b: Nei, desverre, jeg kan ikke akkurat nå. Kanskje en annen gang.<br><br>     ');
            if (svar == 'a') {
                samlingspunkt1a ();
            }
            else if (svar == 'b') {
                samlingspunkt1b ();
            }
        }
        else if (svar == 'b') {
            var svar = await oppdaterspill ('De fire store kan ikke hjepe deg, for de eksisterer ikke. Det gjør derimot vindturbinen, og den kapper deg i to med bladene sine. Du er plutselig et helt annet sted, hvor alt brenner, og du ser en vindturbin som kan ta deg opp til et bedre sted. Du innser at du er i Helvete, og at vindturbinen kan ta deg til Himmelen. Hva gjør du?<br><br>                     a: Hopper etter ett av turbinbladene for å sitte på opp til Himmelen.<br><br>                     b: Aksepterer din skebne, og angrer på de valgene du tok i livet som førte deg hit.<br><br>     ');
            if (svar == 'a') {
                ferdigspill ('Hver gang du hopper etter et blad, vil det for deg alltid vike. Du blir stående slik i all evighet og hoppe etter bladet som alltid viker, hver gang med et håp om at den gangen skal bli annerledes.');
            }
            else if (svar == 'b') {
                ferdigspill ('Det er desverre for sent å endre på dine handlinger i livet. Du blir værende i de pinefulle flammene i all evighet.');
            }
        }
    }
    else if (svar == 'b') {
        var svar = await oppdaterspill ('Turbinen blir fornøyd, og spør om den kan slå følge. Hva svarer du?<br><br>                 a: Ja, gjerne. Det er meg en stor ære å få følge av en vindturbin. Ave Turbinus!<br><br>                 b: Nei, desverre, jeg kan ikke akkurat nå. Kanskje en annen gang.<br><br> ');
        if (svar == 'a') {
            samlingspunkt1a ();
        }
        else if (svar == 'b') {
            samlingspunkt1b ();
        }
    }
}

start();

//# sourceMappingURL=Eventyrspill.map