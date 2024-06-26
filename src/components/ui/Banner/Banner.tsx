import Image from "next/image";

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
      disableAutoFocus
      open={open}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Slide direction="down" in={open} timeout={{ enter: 400, exit: 400 }}>
        <article className={styles.banner}>
          <IconButton
            onClick={handleClose}
            className={`${styles.banner__close}`}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <h2 className="heading-secundary">FOREST SPA</h2>
          <p
            className={`${styles.banner__description} text-primary u-padding-top-small`}
          >
            Massage surrounded by nature and tailored to individual preferences.
          </p>
          <p className={`${styles.banner__description} text-primary`}>
            This immersive experience invites you to feel a deep connection with
            your inner self and the special rhythms around you.
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
