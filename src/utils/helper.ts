import { jwtDecode } from "jwt-decode";

const checkRefreshTokenValidity: (refreshToken: string) => boolean = (
  refreshToken: string,
) => {
  const decodeRefreshToken = jwtDecode(refreshToken);
  const currentTime = Date.now() / 1000;

  if (typeof decodeRefreshToken.exp !== "number") {
    return false;
  }

  if (decodeRefreshToken.exp < currentTime) {
    return false;
  }

  return true;
};

const logOnDev = (message: string) => {
  if (import.meta.env.MODE === "development") {
    console.log(message);
  }
};

const openNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const scrollToElement: (id: string) => void = (idElement) => {
  const element = document.getElementById(idElement);
  if (element) {
    const classAddition = "highLight";
    element.style.transition = "background-color 1s linear";
    element.scrollIntoView({ behavior: "smooth" });
    element.classList.add(classAddition);

    setTimeout(() => {
      element.classList.remove(classAddition);
    }, 1000);
  }
};

const calculateTimeLeft = (timestamp: number) => {
  const targetTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();
  const difference = targetTime - currentTime;

  if (difference <= 0) {
    return null;
  }

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { hours, minutes, seconds };
};

export {
  logOnDev,
  openNewTab,
  scrollToElement,
  calculateTimeLeft,
  checkRefreshTokenValidity,
};
