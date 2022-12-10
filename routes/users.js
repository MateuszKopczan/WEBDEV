const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()


const uzytkownicy = [
    {
        id: uuidv4(),
        imie: "Jan",
        nazwisko: "Kowalski",
        email: "jankowalski@test.com",
        wiek: 23
    },
    {
        id: uuidv4(),
        imie: "Mateusz",
        nazwisko: "Kowalski",
        email: "Mateuszkowalski@test.com",
        wiek: 25
    }
]

router.get('/', (req, res) => {
    res.send(uzytkownicy)
})

router.post('/', (req, res) => {
    const uzytkownik = req.body;
    uzytkownik.id = uuidv4();
    uzytkownicy.push(uzytkownik);
    res.send(uzytkownicy);
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const uzytkownikPoImieniu = uzytkownicy.find((user) => user.id === id)
    res.send(uzytkownikPoImieniu)
})


router.put('/:id', (req, res) => {
    const {id} = req.params;
    const uzytkownik = req.body;
    const uzytkownikPoImieniu = uzytkownicy.find((user) => user.id === id)
    uzytkownicy.pop(uzytkownikPoImieniu);
    uzytkownikPoImieniu.imie = uzytkownik.imie;
    uzytkownikPoImieniu.nazwisko = uzytkownik.nazwisko;
    uzytkownikPoImieniu.email = uzytkownik.email;
    uzytkownikPoImieniu.wiek = uzytkownik.wiek;
    uzytkownicy.push(uzytkownikPoImieniu);
    res.send(uzytkownikPoImieniu)
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const uzytkownikPoImieniu = uzytkownicy.find((user) => user.id === id)
    uzytkownicy.pop(uzytkownikPoImieniu);
    res.send(uzytkownicy)
})

module.exports = router;