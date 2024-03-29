import { useState } from "react";
import { useStateContext } from "./providers/state-provider";
import ClassSelectModal from "./components/class-select-modal";
import AppBar from "./components/app-bar";
import Stack from "./components/stack";
import Wallet from "./components/wallet";
import HitPoints from "./components/hit-points";
import HitDice from "./components/hit-dice";
import ExpBox from "./components/exp-box";
import { getExpToNextLevel } from "./utils/calculations";
import LevelUp from "./components/level-up";
import SpellSlots from "./components/spell-slots";
import LongRest from "./components/long-rest";
import ShortRest from "./components/short-rest";

function App() {

  const { firstLoad, playerExp, playerLevel } = useStateContext()


  const expToNextLevel = getExpToNextLevel(playerExp, playerLevel)

  const [modalOpen, setModalOpen] = useState(firstLoad)

  return (


    <div style={{
      fontSize: "14pt"
    }}>
      <ClassSelectModal isOpen={modalOpen} onClose={() => { setModalOpen(false) }} />
      <div style={{ position: "static" }}>
        <AppBar />
        <div style={{ padding: "20px", paddingRight: "40px" }}>
          <Stack direction="row" justify="space-evenly">
            <Stack align="stretch" justify="space-between" width={"44%"} gap="10px">

              <HitPoints />
              <HitDice />
              <Wallet />

            </Stack>
            <Stack align="stretch" justify="flex-start" width={"44%"} gap="10px">

              <ExpBox />
              {expToNextLevel <= 0 && <LevelUp />}
              <SpellSlots/>
            </Stack>
          </Stack>
          <div style={{marginTop:"20px"}}>
          <Stack direction="row" justify="center">
            <ShortRest/>
            <LongRest/>

          </Stack>
          </div>
          
        </div>

      </div>

    </div>

  );
}

export default App;
