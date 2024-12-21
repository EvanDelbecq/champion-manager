import React from 'react'
import { Button, Input, Form, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Lanes, Types } from '../data/ChampionData';

const ModifyForm = ({ champion, handleModify, setChampions }) => {
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

    return (
        <div>
            <Form onSubmit={handleSubmit} validationBehavior='native' className='flex gap-3'>
                <Input
                    isRequired
                    label="Nom"
                    defaultValue={champion.name}
                    placeholder="Entrez le nom du champion"
                />
                <Autocomplete
                    isRequired
                    label="Lane"
                    placeholder="Entrez la lane du champion"
                    defaultInputValue={champion.lane}
                    defaultItems={Lanes}
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    isRequired
                    label="Type"
                    placeholder="Entrez le type du champion"
                    defaultInputValue={champion.type}
                    defaultItems={Types}>
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>
                <Input
                    isRequired
                    label="Image"
                    placeholder="Entrez l'url de l'image du champion"
                    defaultValue={champion.image}
                    type='url'
                />
                <div className="flex gap-2 w-full justify-center">
                    <Button color="primary" type="submit">
                        Modifier
                    </Button>
                    <Button variant="flat" onPress={() => handleModify(champion.id)}>
                        Annuler
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ModifyForm
