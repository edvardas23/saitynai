# Sprendžiamo uždavinio aprašymas
## Sistemos paskirtis
Projekto tikslas – Sukurti informacinę sistemą, kuri padėtų kurti įvariausius turnyrus ir juos valdyti.

Veikimo principas – informacinę sistemą sudarys naudotojo sąsaja, kuri bus pasiekiama per internetinę aplikaciją, ir kuria naudosis visi sistemos naudotojai bei aplikacijų programavimo sąsaja (angl. trump. *API*).

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

## Turnyrų API metodai

### Gauti visus turnyrus

<table>
  <tr><td>API metodas </td><td>Get All Tournaments (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti visus turnyrus ir jų informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
        "id": 1,
        "name": "Geras turnyras",
        "description": "Labai puikus turnyras",
        "prize": 10000
    },
    {
        "id": 2,
        "name": "Turnyras Nr.2",
        "description": "Vidutinis Turnyras",
        "prize": 5000
    }</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią</td></tr>
</table>

### Gauti vieną turnyrą

<table>
  <tr><td>API metodas </td><td>Get Tournament (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti turnyrą ir jo informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 1,
    "name": "Geras turnyras",
    "description": "Labai puikus turnyras",
    "prize": 10000
  }</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. </td></tr>
</table>

### Sukurti turnyrą

<table>
  <tr><td>API metodas </td><td>Create Tournament (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Sukurti naują turnyrą</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Turnyras Nr.6",
    "description": "Prastas Turnyras",
    "prize": 1000
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 1,
    "name": "Geras turnyras",
    "description": "Labai puikus turnyras",
    "prize": 10000
  }</td></tr>
   <tr><td>Atsakymo kodas</td><td>201 - Created</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Redaguoti turnyrą

<table>
  <tr><td>API metodas </td><td>Update Tournament (PUT)</td></tr>
  <tr><td>Paskirtis</td><td>Redaguoti turnyro informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Turnyras Nr. 4",
    "description": "Blogas Turnyras",
    "prize": 1000
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 1,
    "name": "Turnyras Nr. 4",
    "description": "Blogas Turnyras",
    "prize": 1000
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Pašalinti turnyrą

<table>
  <tr><td>API metodas </td><td>Delete Tournament (DELETE)</td></tr>
  <tr><td>Paskirtis</td><td>Pašalinti turnyrą</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>-</td></tr>
   <tr><td>Atsakymo kodas</td><td>204 - No Content</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. </td></tr>
</table>

## Komandų API metodai

### Gauti visas turnyro komandas

<table>
  <tr><td>API metodas </td><td>Get All Teams (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti visus komandas ir jų informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
        "id": 2,
        "name": "Komanda Nr. 2",
        "description": "Vidutinė komanda",
        "leader": "Komandos Lyderis 2",
        "userId": "55a8e5ce-031d-4a6c-8dba-e6948b0ba9d3"
    },
    {
        "id": 3,
        "name": "Gerulė komanda",
        "description": "labai gera komanda",
        "leader": "Edvardas",
        "userId": "55a8e5ce-031d-4a6c-8dba-e6948b0ba9d3"
    }</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią</td></tr>
</table>

### Gauti vieną turnyro komandą

<table>
  <tr><td>API metodas </td><td>Get Team (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti komandą ir jos informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 2,
    "name": "Komanda Nr. 2",
    "description": "Vidutinė komanda",
    "leader": "Komandos Lyderis 2",
    "userId": "55a8e5ce-031d-4a6c-8dba-e6948b0ba9d3"
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. </td></tr>
</table>

### Sukurti komandą

<table>
  <tr><td>API metodas </td><td>Create Team (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Sukurti naują komandą</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Komanda Nr. 6",
    "description": "Prasta komanda",
    "leader": "Komandos Lyderis 6"
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 21,
    "name": "Komanda Nr. 6",
    "description": "Prasta komanda",
    "leader": "Komandos Lyderis 6"
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>201 - Created</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Redaguoti komandą

<table>
  <tr><td>API metodas </td><td>Update Team (PUT)</td></tr>
  <tr><td>Paskirtis</td><td>Redaguoti komandos informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Komanda Nr. 6",
    "description": "Prasta komanda",
    "leader": "Komandos Lyderis 6"
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 8,
    "name": "Komanda Nr. 6",
    "description": "Prasta komanda",
    "leader": "Komandos Lyderis 6"
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Pašalinti komandą

<table>
  <tr><td>API metodas </td><td>Delete Team (DELETE)</td></tr>
  <tr><td>Paskirtis</td><td>Pašalinti komandą</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>-</td></tr>
   <tr><td>Atsakymo kodas</td><td>204 - No Content</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. </td></tr>
</table>

## Žaidėjų API metodai

### Gauti visus turnyro komandos žaidėjus

<table>
  <tr><td>API metodas </td><td>Get All Players (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti visus žaidėjus ir jų informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}/players</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
        "id": 16,
        "name": "Edvardas",
        "sports": "Krepšinis",
        "age": 22,
        "userId": "f6b2f703-e93f-469e-97a3-feb92b87ed31"
    },
    {
        "id": 17,
        "name": "Rokas",
        "sports": "Krepšinis",
        "age": 23,
        "userId": "f6b2f703-e93f-469e-97a3-feb92b87ed31"
    }</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią</td></tr>
</table>

### Gauti vieną turnyro komandos žaidėją

<table>
  <tr><td>API metodas </td><td>Get Player (GET)</td></tr>
  <tr><td>Paskirtis</td><td>Gauti žaidėją ir jo informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}/players/{playerId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 16,
    "name": "Edvardas",
    "sports": "Krepšinis",
    "age": 22
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. </td></tr>
</table>

### Sukurti naują žaidėją

<table>
  <tr><td>API metodas </td><td>Create Player (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Sukurti naują žaidėją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}/players</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Žaidėjas5",
    "sports": "Futbolas",
    "age": 40
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 18,
    "name": "Žaidėjas5",
    "sports": "Futbolas",
    "age": 40
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>201 - Created</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Redaguoti žaidėją

<table>
  <tr><td>API metodas </td><td>Update Player (PUT)</td></tr>
  <tr><td>Paskirtis</td><td>Redaguoti žaidėjo informaciją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}/players/{playerId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "name": "Edvardas",
    "sports": "Tinklinis",
    "age": 50
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": 18,
    "name": "Edvardas",
    "sports": "Tinklinis",
    "age": 50
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. 400 - Bad request, neįvesta privaloma užklausos informacija </td></tr>
</table>

### Pašalinti žaidėją

<table>
  <tr><td>API metodas </td><td>Delete Player (DELETE)</td></tr>
  <tr><td>Paskirtis</td><td>Pašalinti žaidėją</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/tournaments/{tournamentId}/teams/{teamId}/players/{playerId}</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>-</td></tr>
   <tr><td>Atsakymo kodas</td><td>204 - No Content</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. </td></tr>
</table>

## Naudotojo API metodai

### Prisijungti prie sistemos

<table>
  <tr><td>API metodas </td><td>Login (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Prisijungti prie sistemos</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/login</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "userName": "admin",
    "password": "Password1!"
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJqdGkiOiJkYzk1NzJjNi01ZWQxLTQyMGItYjYwMS1jNDY0NTRjYzMwYmQiLCJzdWIiOiJmNmIyZjcwMy1lOTNmLTQ2OWUtOTdhMy1mZWI5MmI4N2VkMzEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiVGVhbU93bmVyIiwiQWRtaW4iLCJHdWVzdCJdLCJleHAiOjE2NzE2Mjk2NjV9.CWI2cHT3AUe-qZ67EW3C8CZIQz5keNHwzBIlPzWwzkE"
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - OK</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 400 - Bad request, neįvesti arba įvesti neteisingi prisijungimo duomenys.</td></tr>
</table>

### Prisiregistruoti prie sistemos

<table>
  <tr><td>API metodas </td><td>Register (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Prisiregistruoti prie sistemos</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/register</td></tr>
  <tr><td>Užklausos struktūra</td><td>{
    "userName": "EdvardasTEST",
    "email": "edvardaitis1@gmail.com",
    "password": "Teststring1!"
}</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>-</td></tr>
  <tr><td>Atsakymo struktūra</td><td>{
    "id": "d2d82049-03cb-4f82-996e-1167b2c6fb7a",
    "userName": "Edvar11dasTEST",
    "email": "edvardai11tis1@gmail.com"
}</td></tr>
   <tr><td>Atsakymo kodas</td><td>201 - Created</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 400 - Bad request, neįvesti duomenys arba naudotojas tokiu paštu jau egzistuoja.</td></tr>
</table>

### Atsijungti nuo sistemos

<table>
  <tr><td>API metodas </td><td>Logout (POST)</td></tr>
  <tr><td>Paskirtis</td><td>Atsijungti nuo sistemos</td></tr>
  <tr><td>Kelias iki metodo (angl. route)</td><td>/api/logout</td></tr>
  <tr><td>Užklausos struktūra</td><td>-</td></tr>
  <tr><td>Užklausos „header“ dalis</td><td>Authorization: Bearer {token}</td></tr>
  <tr><td>Atsakymo struktūra</td><td>-</td></tr>
   <tr><td>Atsakymo kodas</td><td>200 - Ok</td></tr>
   <tr><td>Galimi atsakymo kodai</td><td>404 - Not Found, įvedus neteisingą kelią. 401 - Unauthorized, netinkamas arba neegzistuojantis token. </td></tr>
</table>
