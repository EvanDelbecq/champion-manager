import './App.css';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import ChampForm from "./pages/ChampForm";
import ChampList from "./pages/ChampList";


function App() {
  return (
    <div className='dark text-foreground bg-background min-h-screen p-2'>
      <Tabs>
      <Tab title='Ajouter un champion'>
      <Card>
        <CardBody>
          <h2 className="text-2xl font-bold mb-5">Ajouter un nouveau champion</h2>
          <ChampForm/>
        </CardBody>
      </Card>   
      </Tab>
      <Tab title='Liste des champions'>
        <Card>
          <CardBody>
            <h2 className='text-2xl font-bold mb-5'>Liste des champions</h2>
            <ChampList/>
          </CardBody>  
        </Card>
      </Tab>
      </Tabs>    
    </div>
  );
}

export default App;
