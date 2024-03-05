import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, IconButton, Modal } from "@mui/material";
import Slide from "@mui/material/Slide";

import styles from "./Banner.module.scss";

interface BannerProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Banner({ open, setIsOpen }: BannerProps) {
  const handleClose = () => setIsOpen(false);
  const handleClick = () => {
    setIsOpen(false);
    const section = document.getElementById("spa");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: section.offsetTop - 128,
        behavior: "smooth",
      });
    }
  };

  return (
    <Modal
      closeAfterTransition
      open={open}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 900,
        },
      }}
    >
      <Slide direction="down" in={open} timeout={{ enter: 500, exit: 500 }}>
        <article className={styles.banner}>
          <IconButton
            onClick={handleClose}
            className={`${styles.banner__close}`}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <h2 className="heading-secundary">New service!</h2>
          <p
            className={`${styles.banner__description} text-primary u-padding-top-small`}
          >
            Now we have Spa, check it out!
          </p>
          <div className={`${styles.banner__button} u-padding-top-medium`}>
            <span
              className="text-primary"
              style={{ borderRadius: ".5rem" }}
              onClick={handleClick}
            >
              CHECK IT OUT
            </span>
          </div>
        </article>
      </Slide>
    </Modal>
  );
}
