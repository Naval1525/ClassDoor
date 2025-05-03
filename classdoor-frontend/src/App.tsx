import { Button } from "./components/ui/button";
import {  toast } from "sonner";

const App = () => {
  const handleClick = () => {
    toast("sexsux");
  };

  return (
    <>
      <Button onClick={handleClick}>Show Toast</Button>
    </>
  );
};

export default App;
