"use client";

import { Carousel as CarouselReact } from "react-responsive-carousel";
import Image from "next/image";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  images: { id: string; url: string }[];
}
export function Carousel({ images }: CarouselProps) {
  return (
    <CarouselReact
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={6000}
      swipeable={false}
      animationHandler={"fade"}
      renderArrowPrev={(clickHandler) => (
        <IconButton
          onClick={clickHandler}
          className={`${styles["carousel__button"]} ${styles["carousel__button--previous"]}`}
        >
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
      )}
      renderArrowNext={(clickHandler) => (
        <IconButton
          onClick={clickHandler}
          className={`${styles["carousel__button"]} ${styles["carousel__button--next"]}`}
        >
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      )}
      className={`${styles["carousel"]} col-1-of-2`}
    >
      {images.map(({ id, url }) => (
        <div
          key={id}
          className={`${styles["carousel__image-container"]} col-1-of-2`}
        >
          <Image
            src={url}
            width={400}
            height={400}
            className={`${styles["carousel__image"]}`}
            alt="spa zanzibar swimming cave"
          />
        </div>
      ))}
    </CarouselReact>
  );
}
