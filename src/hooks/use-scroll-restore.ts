import { useEffect } from "react";

const useScrollToTop = (trigger: string,elementClassName?: string) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  document.querySelector(`${elementClassName}`)?.scrollTo({ top: 0, behavior: 'smooth' });

  }, [trigger]);
};

export default useScrollToTop;
