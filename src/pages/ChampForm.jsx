import React from 'react'
import { Button, Input, Form, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Lanes, Types } from '../data/ChampionData';

const ChampForm = () => {
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
  return (
    <div>
      <Form onSubmit={handleSubmit} validationBehavior='native' className='flex gap-3'>
        <Input
          isRequired
          label="Nom"
          placeholder="Entrez le nom du champion"
        />
        <Autocomplete
          isRequired
          label="Lane"
          placeholder="Entrez la lane du champion"
          defaultItems={Lanes}
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Autocomplete
          isRequired
          label="Type"
          placeholder="Entrez le type du champion"
          defaultItems={Types}>
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Input
          isRequired
          label="Image"
          placeholder="Entrez l'url de l'image du champion"
          type='url'
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Créer
          </Button>
          <Button type="reset" variant="flat">
            Effacer
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ChampForm
