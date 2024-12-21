# Gestionnaire de Champions
Ceci est un projet étudiant inspiré du jeu League of Legends et permet de créer et gérer ses propres personnage via une base de donnée virtuelle utilisant json-server
## Installation et execution du projet
``` bash
npm install
json-server --watch db.json -p 3000
npm start 
```

## Structure du projet
Le projet utilise le framwork React et est construit de cette manière :

```
champion-manager/
├── db.json
├── package.json
├── README.md
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
└──data
│    └── ChampionData.js
└──components.js
    └── ModifyForm.js
└── src/
    ├── App.jsx
    ├── data/
    │   └── ChampionData.js
    ├── pages/
    │   ├── ChampForm.jsx
    │   └── ChampList.jsx
    └── ...
```

## Fonctionnement du code
### ChampForm.jsx
Ce module React contient le formulaire de création de personnage
#### Fonctionnement
J'ai utilisé une librairie UI pour faciliter le frontend, on a donc un formulaire classique qui une fois soumis renvoie vers la fonction `handleSubmit()`. La fonction `handleSubmit()` envoie une requête POST à l'URL `http://localhost:3000/champions` avec les données du formulaire au format JSON.
#### Code
```javascript
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      fetch('http://localhost:3000/champions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target[0].value,
          lane: e.target[1].value,
          type: e.target[4].value,
          image: e.target[7].value
        })
      })
        .then(() => { e.target.reset() })
    } catch (error) {
      console.error('Error:', error);
    }
  }
```

### ChampList.jsx
Ce module React affiche la liste des personnages et permet de les modifier ou de les supprimer.
#### Fonctionnement
Le composant utilise les hooks `useState` et `useEffect` pour gérer l'état et les effets de bord. Lors du montage du composant, une requête GET est envoyée à l'URL `http://localhost:3000/champions` pour récupérer la liste des personnages et les stocker dans l'état `champions`.

Chaque personnage est affiché dans une carte avec ses informations et deux boutons : un pour modifier et un pour supprimer le personnage.

- **handleDelete(champion)** : Cette fonction envoie une requête DELETE à l'URL `http://localhost:3000/champions/${champion.id}` pour supprimer le personnage. Après la suppression, une nouvelle requête GET est envoyée pour mettre à jour la liste des personnages.
- **handleModify(championId)** : Cette fonction bascule l'état `changingCard` pour afficher ou masquer le formulaire de modification pour le personnage correspondant.

#### Code
```javascript
const [champions, setChampions] = useState([])
const [changingCard, setChangingCard] = useState([])

useEffect(() => {
    try {
        fetch('http://localhost:3000/champions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setChampions(data))
    } catch (error) {
        console.error('Error:', error);
    }
}, [])

const handleDelete = (champion) => {
    try {
        fetch(`http://localhost:3000/champions/${champion.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => {
                try {
                    fetch('http://localhost:3000/champions', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => setChampions(data))
                } catch (error) {
                    console.error('Error:', error);
                }
            })
    } catch (error) {
        console.error('Error:', error);
    }
}
const handleModify = (championId) => {
    setChangingCard(prevState => ({
        ...prevState,
        [championId]: !prevState[championId]
    }));
};
```

### ModifyForm.jsx
Ce module React contient le formulaire de modification de personnage.
#### Fonctionnement
Le composant `ModifyForm` sert a modfiier les personnages existant. prend en entrée un objet `champion`, une fonction `handleModify` et une fonction `setChampions`. Lors de la soumission du formulaire, la fonction `handleSubmit()` est appelée. Cette fonction envoie une requête PUT à l'URL `http://localhost:3000/champions/${champion.id}` pour modifier les informations du personnage. Ensuite, une requête GET est envoyée pour récupérer la liste mise à jour des personnages et mettre à jour l'état `champions`.

#### Code
```javascript
const handleSubmit = (e) => {
    e.preventDefault()
    try {
        /* D'abord on envoie une requête put pour modifier les infos du champion */
        fetch(`http://localhost:3000/champions/${champion.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target[0].value,
                lane: e.target[1].value,
                type: e.target[4].value,
                image: e.target[7].value
            })
        })
            .then(data => {
                try {
                    /* Ensuite on récupère la liste des champions pour mettre à jour l'affichage */
                    fetch('http://localhost:3000/champions', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => setChampions(data))
                }
                catch (error) {
                    console.error('Error:', error);
                }
            })
    } catch (error) {
        console.error('Error:', error);
    }
    handleModify(champion.id)
}
```