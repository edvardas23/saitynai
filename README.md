# Sprendžiamo uždavinio aprašymas
## Sistemos paskirtis
Projekto tikslas – Sukurti informacinę sistemą, kuri padėtų kurti įvariausius turnyrus ir juos valdyti.

Veikimo principas – informacinę sistemą sudarys naudotojo sąsaja, kuri bus pasiekiama per internetinę aplikaciją, ir kuria naudosis visi sistemos naudotojai bei aplikacijų programavimo sąsaja (angl. trump. API).

Sistemos administratorius galės sukurti ir administruoti turnyrą į kurį komandų atstovai galės registruoti savo atstovaujamas komandas. Komanda yra įregistruojama jos atstovo ir sudaroma iš tam tikro žaidėjų kiekio, kuriuos į ją registruoja jos atsotvas. Komandos atstovas gali administruoti savo komandą redaguodamas žaidėjų duomenis, pridėdamas naujus žaidėjus ar pašalindamas esamus. Administratorius turės visus įmanomus sistemos funkcionalumus. Neužsiregistravęs naudotojas ir naudotojas turintis svečio rolę galės peržiūrėti esamus turnyrus, komandas, rungtynių informaciją, tačiau negalės atlikti pakeitimų sistemoje. 

## Funkciniai reikalavimai
Neregistruotas informacinės sistemos naudotojas galės:
1.	Peržiūrėti prisijungimo puslapį;
2.	Užsiregistruoti į sistemą;
3.	Peržiūrėti turnyrus, komandas, žaidimus, žaidėjus;


Registruotas informacinės sistemos naudotojas galės:
1.	Prisijungti prie sistemos;
2.	Peržiūrėti turnyrus, komandas, žaidimus, žaidėjus;
3.	Atsijungti nuo sistemos;


Komandos atstovas galės:
1.	Peržiūrėti turnyrus;
2.	Įregistruoti savo komandą į turnyrą;
3.	Pridėti, pašalinti, redaguoti, peržiūrėti savo komandos žaidėjus;
4.	Peržiūrėti kitus žaidėjus;
5.	Peržiūrėti kitas komandas;


Administratorius galės:
1.	Sukurti, ištrinti, redaguoti, peržiūrėti turnyrą;
2.	Sukurti, ištrinti, redaguoti, peržiūrėti komandą;
3.	Sukurti, ištrinti, redaguoti, peržiūrėti žaidėjus;

# Sistemos architektūra

Sistemos sudedamosios dalys:

+ Kliento pusė (angl. *Front-end*) – bus realizuojama naudojant *React* karkasą. Nuoroda į repozitoriją: https://github.com/edvardas23/saitynai/tree/master/turnyrai-frontend.

+ Serverio pusė (angl. *Back-end*) – bus realizuojama naudojant C#. Duomenų bazė MSSQL. Nuoroda į repozitoriją: https://github.com/edvardas23/saitynai/tree/master/Turnyrai%20API.

Paveikslėlyje pavaizduota kuriamos informacinės sistemos diegimo diagrama. Sistemos talpinimui bus naudojamas serveris. Kiekviena sistemos dalis yra diegiama tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTP protokolą. Šios sistemos sistemos veikimui yra reikalingas sistemos API, kuris būtų pasiekiamas per aplikacijų programavimo sąsają ir padėtų atlikti įvarias operacijas su duomenų baze.

![Diegimo diagrama](Photos/diagram.png)

# Naudotojo sąsajos projektas
## Pagrindinis puslapis - Turnyrų sąrašas
| Wireframe |
| --- |
| ![Turnyrų wireframe](Photos/Turnyrai.png) |

| Realizacija |
| --- |
| ![Turnyrų realizacija](Photos/Turnyraireal.png) |

## Komandų sąrašas
| Wireframe |
| --- |
| ![Komandų wireframe](Photos/Komandos.png) |

| Realizacija |
| --- |
| ![Komandų realizacija](Photos/Komandosreal.png) |

## Žaidėjų sąrašas
| Wireframe |
| --- |
| ![Žaidėjų wireframe](Photos/Zaidejai.png) |

| Realizacija |
| --- |
| ![Žaidėjų realizacija](Photos/Zaidejaireal.png) |

## Prisijungimas
| Wireframe |
| --- |
| ![Prisijungimo wireframe](Photos/Prisijungimas.png) |

| Realizacija |
| --- |
| ![Prisijungimo realizacija](Photos/Prisijungimasreal.png) |

## Registracija
| Wireframe |
| --- |
| ![Registracijos wireframe](Photos/Registracija.png) |

| Realizacija |
| --- |
| ![Registracijos realizacija](Photos/Registracijareal.png) |

## Turnyro pridėjimo/redagavimo/pašalinimo langai
Kitų sistemos objektų pridėjimo, redagavimo ir pašalinimo operacijos taip pat realizuotos naudojant modalinius langus.

| Pridėti turnyrą |
| --- |
| ![Pridėti turnyrą realizacija](Photos/create.png) |

| Redaguoti turnyrą |
| --- |
| ![Redaguoti turnyrą realizacija](Photos/edit.png) |

| Pašalinti turnyrą |
| --- |
| ![Pašalinti turnyrą realizacija](Photos/delete.png) |

# API specifikacija


<table>
  <tr><td>Atsakymo formatas</td><td>JSON</td></tr>
  <tr><td>Norma ribota?</td><td>Neribota</td></tr>
</table>


