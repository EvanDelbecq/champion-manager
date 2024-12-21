import { Card, CardBody, Image, Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import ModifyForm from '../components/ModifyForm'

const ChampList = () => {
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
    return (
        <div className='flex flex-row flex-wrap justify-center gap-5'>
            {champions.map(champion => (
                <Card key={champion.id}>
                    <CardBody key={champion.id} className='flex gap-2 flex-col items-center'>
                        {!changingCard[champion.id] && (
                            <>
                                <h2 className='font-bold'>{champion.name}</h2>
                                <p>{champion.lane}</p>
                                <p>{champion.type}</p>
                                <Image src={champion.image} alt={champion.name} width={240} />
                                <div className='flex gap-2'>
                                    <Button onPress={() => handleModify(champion.id)} > Modifier </Button>
                                    <Button onPress={() => handleDelete(champion)} color='danger'> Supprimer </Button>
                                </div>
                            </>
                        )
                        }
                        {changingCard[champion.id] && (
                            <ModifyForm champion={champion} handleModify={handleModify} setChampions={setChampions} />
                        )}

                    </CardBody>
                </Card>
            ))}
        </div>
    )
}

export default ChampList
