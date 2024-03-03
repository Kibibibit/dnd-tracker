import { useState } from "react";
import { useStateContext } from "./providers/state-provider";
import ClassSelectModal from "./components/class-select-modal";
import AppBar from "./components/app-bar";
import Stack from "./components/stack";
import Wallet from "./components/wallet";
import HitPoints from "./components/hit-points";
import HitDice from "./components/hit-dice";
import ExpBox from "./components/exp-box";

function App() {

  const { firstLoad } = useStateContext()

  const [modalOpen, setModalOpen] = useState(firstLoad)

  return (


    <div style={{
      fontSize: "14pt"
    }}>
      <ClassSelectModal isOpen={modalOpen} onClose={() => { setModalOpen(false) }} />
      <div style={{ position: "static" }}>
        <AppBar />
        <div style={{ padding: "20px", paddingRight:"40px"}}>
          <Stack direction="row" justify="space-evenly">
            <Stack align="stretch" justify="space-between" width={"44%"} gap="10px">
              
                <HitPoints />
                <HitDice />
                <Wallet />

            </Stack>
            <Stack align="stretch" justify="space-between" width={"44%"} gap="10px">
              
                <ExpBox/>

            </Stack>
          </Stack>
          <Stack direction="row" justify="center">
            <div>Short Rest</div>
            <div>Long Rest</div>
          </Stack>
        </div>

      </div>

    </div>

  );
}

export default App;
