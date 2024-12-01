import { Header } from "@/components/Header";
import { Counter } from "@/components/Counter";
import { TopBanner } from "@/components/TopBanner";

import { IS_DEV } from "./constants";
import MainGame from "./components/scenes/maingame";
import StartPage from "./components/scenes/startpage";
import GameScreen from "./components/scenes/gamescene";

function App() {
  return (
    <>
      {/* {IS_DEV && <TopBanner />}
      <Header />
      <div className="flex items-center justify-center flex-col">
        <Counter />
      </div> */}
      {/* <MainGame /> */}
      {/* <StartPage /> */}
      <GameScreen/>
    </>
  );
}

export default App;
