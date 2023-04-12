var TXT;
TXT = {}
// Een of andere te coderen tekst, bijvoorbeeld een die uitlegt waardoor de prijs van sombrero's sterk gestegen is:
TXT.oud = `Messier 104, ook wel het Sombrero sterrenstelsel, ligt op 31 miljoen lichtjaar afstand aan de rand van de Corvus constellatie. Door dit sterrenstelsel naar de beroemde mexicaanse hoed te noemen is de gemiddelde afmeting van de sombrero sterk toegenomen:
Aangenomen dat er erg veel sombrero's bestaan, dat speelgoed ook meetelt, en dat er veel meer speelgoedpoppetjes met sombrero's bestaan dan echte: 3 miljard sombrero's met een gemiddelde doorsnede van 10 cm.
M104 heeft een doorsnee van ca. 49 000 lichtjaar, dat is ca. 460 triljoen meter.
Dus de gemiddelde maat van alle sombrero's samen is (1 x 460 triljoen + 3 miljard x 0.1) m / (3 miljard + 1).
De bijdrage van de 3 miljard kleine sombrero's is verwaarloosbaar (0,000000000065%)
460 triljoen / 3 miljard = 151 miljard meter = ca. 1 AU.
Dat kan geen toeval zijn: de hoed die tegen de zon moet beschermen past precies tussen de aarde en de zon!
Dit heeft ook tot gevolg dat de prijs van een gemiddelde sombrero bijgesteld moet worden naar 64 quadriljoen Pesos.`;

// omkeer demo
// verhaspel: verHaspel(TXT.oud, pwd, 0) - waar pwd = password string
// ontwarren kan daarna met verHaspel(TXT.niw, pwd, 1)
export function verHaspel(txt, pwd, vercijfer) {
    var i, li;
    li = pwd.length;
    lj = txt.length;
    if (!vercijfer) {// decrypt: achterstevoren omgekeerd omkeren
        for (i=li-1; i>=0; i--) txt = keerOm(txt, lj, 2+pwd.charCodeAt(i));
        for (i=li-1; i>=0; i--) txt = keerOm(txt, lj, 2+pwd.charCodeAt(i)%10);
        return txt;
    }
    else {// encrypt
        // eerst een klein getal om op woordniveau te verhaspelen
        for (i=0; i<li; i++) txt = keerOm(txt, lj, 2+pwd.charCodeAt(i)%10);
        for (i=0; i<li; i++) txt = keerOm(txt, lj, 2+pwd.charCodeAt(i));
    }
    TXT.niw = txt;
    return txt;
}
// draai de volgorde van txt in blokjes van nr letters om
function keerOm(txt, lj, nr){
    var i, j, lj, dj, niw;
    dj = nr+1;
    niw = '';
    for (j=0; j<lj; j+=dj) {
        for(i=nr; i>=0; i--) niw += txt.charAt(j+i);
    }
    // laatste restje toevoegen
    for (i=j; i<lj; i++) niw += txt.charAt(i);
    return niw;
}