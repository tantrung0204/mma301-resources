import { ThemeProvider } from "./ThemeContext";
import App from "./App";

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
