Kauno technologijos universitetas
Informatikos fakultetas
T120B165 Saityno taikomųjų programų projektavimas
Projekto „Turnyrai“ ataskaita
	
Edvardas Židelevičius IFF9/9
Autorius	
	
dėst. Petras Tamošiūnas
dėst. Rasa Mažutienė
Vertintojai	
 
1.	Sprendžiamo uždavinio aprašymas
1.1.	Sistemos paskirtis
Projekto tikslas – Sukurti informacinę sistemą, kuri padėtų kurti įvariausius turnyrus ir aktyviai juos valdyti.
Veikimo principas – informacinę sistemą sudarys naudotojo sąsaja, kuri bus pasiekiama per internetinę aplikaciją, ir kuria naudosis visi sistemos naudotojai bei aplikacijų programavimo sąsaja (angl. trump. API).
	Sistemos administratorius galės sukurti ir administruoti turnyrą į kurį komandų atstovai galės registruoti savo atstovaujamas komandas. Komanda yra įregistruojama jos atstovo ir sudaroma iš tam tikro žaidėjų kiekio, kuriuos į ją registruoja jos atsotvas. Komandos atstovas gali administruoti savo komandą redaguodamas žaidėjų duomenis, pridėdamas naujus žaidėjus ar pašalindamas esamus. Administratorius turės visus įmanomus sistemos funkcionalumus, taip pat galės administruoti sistemos naudotojus – priskirti komandos atstovo statusą naudotojui. Neužsiregistravęs naudotojas ir naudotojas turintis svečio rolę galės peržiūrėti esamus turnyrus, komandas, rungtynių informaciją, tačiau negalės atlikti pakeitimų sistemoje. 
1.2.	Funkciniai reikalavimai
Neregistruotas informacinės sistemos naudotojas galės:
1.	Peržiūrėti prisijungimo puslapį;
2.	Užsiregistruoti į sistemą;
3.	Peržiūrėti turnyrus, komandas, žaidimus, žaidėjus;
Registruotas informacinės sistemos naudotojas galės:
1.	Prisijungti prie sistemos;
2.	Redaguoti savo paskyros duomenis;
3.	Peržiūrėti turnyrus, komandas, žaidimus, žaidėjus;
4.	Atsijungti nuo sistemos.
Komandos atstovas galės:
1.	Peržiūrėti turnyrus;
2.	Įregistruoti savo komandą į turnyrą;
3.	Pridėti, pašalinti, redaguoti, peržiūrėti savo komandos žaidėjus;
4.	Peržiūrėti kitus žaidėjus;
5.	Peržiūrėti kitas komandas;
6.	Peržiūrėti visus žaidimus;
7.	Peržiūrėti, atšaukti savo komandos žaidimus;
Administratorius galės:
1.	Peržiūrėti sistemos naudotojus;
2.	Pakeisti naudotojo rolę;
3.	Pašalinti naudotojo paskyrą;
4.	Sukurti, ištrinti, redaguoti, peržiūrėti turnyrą;
5.	Sukurti, ištrinti, redaguoti, peržiūrėti, administruoti komandą;
6.	Sukurti, ištrinti, redaguoti, peržiūrėti žaidimus.
7.	Sukurti, ištrinti, redaguoti, peržiūrėti žaidėjus.
2.	Sistemos architektūra
Sistemos sudedamosios dalys:
•	Kliento pusė (angl. Front-end) – bus realizuojama naudojant Angular karkasą.
•	Serverio pusė (angl. Back-end) – bus realizuojama naudojant C#. Duomenų bazė MySQL.
1 pav. pavaizduota kuriamos informacinės sistemos diegimo diagrama. Sistemos talpinimui bus naudojamas serveris. Kiekviena sistemos dalis yra diegiama tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTP protokolą. Šios sistemos sistemos veikimui yra reikalingas sistemos API, kuris būtų pasiekiamas per aplikacijų programavimo sąsają ir padėtų atlikti įvarias operacijas su duomenų baze.
