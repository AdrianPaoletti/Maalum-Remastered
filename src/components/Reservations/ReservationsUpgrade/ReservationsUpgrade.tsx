import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ClickAwayListener,
    IconButton,
    Tooltip,
} from "@mui/material";

import { WHATSAPP_LINK } from "maalum/core/constants/constants";
import {
    ReservationsGuestsCounter,
    ReservationsPickerInformation,
    ReservationsSpaCounter,
    ReservationStepper,
    UpgradeGuests,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { reservationsGuestsInformation } from "maalum/utils/reservations/reservations.utils";
import { getReseravtionsSpaGuests } from "maalum/utils/reservations/reservationsPicker.utils";
import {
    cardElements,
    getHour,
} from "maalum/utils/reservations/reservationsUpgrade.util";
import Calendar from "../../../../public/svgs/calendar.svg";
import Guests from "../../../../public/svgs/guests.svg";

import styles from "./ReservationsUpgrade.module.scss";

interface ReservationsUpgradeProps {
    reservationsPickerInformation: ReservationsPickerInformation;
    setReservationsPickerInformation: React.Dispatch<
        React.SetStateAction<ReservationsPickerInformation>
    >;
    upgradeGuests: UpgradeGuests;
    setUpgradeGuests: React.Dispatch<React.SetStateAction<UpgradeGuests>>;
    spaExcluded: ReservationsSpaCounter;
    setReservationStepper: React.Dispatch<
        React.SetStateAction<ReservationStepper>
    >;
}

export function ReservationsUpgrade({
    reservationsPickerInformation,
    setReservationsPickerInformation,
    setReservationStepper,
    upgradeGuests,
    setUpgradeGuests,
    spaExcluded,
}: ReservationsUpgradeProps) {
    const [tooltipOpen, setTooltipOpen] = useState<{
        card: "naturalEssence" | "maalumRitual" | null;
        guest: keyof ReservationsGuestsCounter | null;
    }>({ card: null, guest: null });
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const formattedDate = reservationsPickerInformation.date
        ?.toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        })
        .split(",") as string[];
    const totalUpgradeGuests = cardElements.reduce(
        (accum, { id }) => accum + reservationsPickerInformation[id],
        0
    );
    const totalSpaExcluded =
        spaExcluded.maalumRitual + spaExcluded.naturalEssence;
    const guestsAvailable = 3 - totalSpaExcluded - totalUpgradeGuests;
    const guests = reservationsGuestsInformation.filter(
        ({ id }) => reservationsPickerInformation[id]
    );

    const navbarElements: {
        id: "date" | "totalGuests";
        icon: React.ReactNode;
        formatValue?: (value: Date) => string;
    }[] = [
        {
            id: "date",
            icon: <Calendar />,
            formatValue: (date: Date) =>
                date?.toLocaleDateString("es-ES", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                }),
        },
        {
            id: "totalGuests",
            icon: <Guests />,
        },
    ];

    const handlePlus = (
        id: "naturalEssence" | "maalumRitual",
        idGuests: keyof ReservationsGuestsCounter
    ) => {
        if (totalUpgradeGuests >= 3) {
            setTooltipOpen({ card: id, guest: idGuests });
            setTimer(setTimeout(() => handleTooltipClose(), 3000));
            return;
        }

        setUpgradeGuests((prevUpgradeGuests) => ({
            ...prevUpgradeGuests,
            [id]: prevUpgradeGuests[id].set(
                idGuests,
                (upgradeGuests[id].get(idGuests) ?? 0) + 1
            ),
        }));

        setReservationsPickerInformation(
            (prevReservationsPickerInformation) => ({
                ...prevReservationsPickerInformation,
                [id]: prevReservationsPickerInformation[id] + 1,
            })
        );
    };

    const handleMinus = (
        id: "naturalEssence" | "maalumRitual",
        idGuests: keyof ReservationsGuestsCounter
    ) => {
        setUpgradeGuests((prevUpgradeGuests) => ({
            ...prevUpgradeGuests,
            [id]: prevUpgradeGuests[id].set(
                idGuests,
                (upgradeGuests[id].get(idGuests) ?? 0) - 1
            ),
        }));
        setReservationsPickerInformation(
            (prevReservationsPickerInformation) => ({
                ...prevReservationsPickerInformation,
                [id]: prevReservationsPickerInformation[id] - 1,
            })
        );
    };

    const handleShowTooltip = (
        id: "naturalEssence" | "maalumRitual",
        idGuests: keyof ReservationsGuestsCounter
    ) => tooltipOpen.card === id && tooltipOpen.guest === idGuests;

    const handleTooltipClose = () => {
        setTooltipOpen({ card: null, guest: null });

        clearTimeout(timer);
    };

    return (
        <div className={styles["reservations-upgrade"]}>
            <nav
                className={`${styles["reservations-upgrade__navbar"]}`}
                onClick={() => setReservationStepper("reservationsPicker")}
            >
                {navbarElements.map(({ id, icon, formatValue }) => {
                    const value = formatValue
                        ? formatValue(reservationsPickerInformation[id] as Date)
                        : reservationsPickerInformation[id];

                    return (
                        <div
                            key={id}
                            className={`${styles["reservations-upgrade__navbar-info"]}`}
                        >
                            {icon}
                            <p className={"text-primary"}>
                                {value?.toString()}
                            </p>
                        </div>
                    );
                })}
            </nav>
            <ul className={`${styles["reservations-upgrade__cards"]}`}>
                <Link
                    className={`${styles["reservations-upgrade__card"]} ${styles["reservations-upgrade__card--whatsapp"]}`}
                    href={WHATSAPP_LINK}
                    target="_blank"
                >
                    <WhatsAppIcon
                        fontSize="large"
                        style={{ color: defaultTheme.palette.beige.main }}
                    />
                    <p>
                        For more than 3 guests or specific request, please{" "}
                        <span>click here</span> to contact us on whatsapp.
                    </p>
                </Link>
                {cardElements.map(
                    ({ id, title, price, description, image }) => {
                        const hourSpa =
                            totalSpaExcluded < 2
                                ? getHour(formattedDate?.[1] ?? "")
                                : "SOLD OUT";
                        const isSoldOut = hourSpa === "SOLD OUT";
                        const guestsAvailability = isSoldOut
                            ? 0
                            : guestsAvailable;

                        return (
                            <li
                                key={id}
                                className={`${styles["reservations-upgrade__card"]}`}
                            >
                                <span
                                    className={`${styles["reservations-upgrade__card-availability"]}`}
                                >
                                    {`${guestsAvailability} ${
                                        guestsAvailability === 1
                                            ? "place"
                                            : "places"
                                    } left`}
                                </span>
                                <div
                                    className={`${styles["reservations-upgrade__image-container"]}`}
                                >
                                    <Image
                                        src={image}
                                        alt="fotos"
                                        layout="fill"
                                        objectFit="cover"
                                        style={{
                                            borderTopLeftRadius: "1rem",
                                            borderTopRightRadius: "1rem",
                                        }}
                                    />
                                </div>
                                <div
                                    className={`${styles["reservations-upgrade__info"]}`}
                                >
                                    <div
                                        className={`${styles["reservations-upgrade__titles"]}`}
                                    >
                                        <h4
                                            className={`${styles["reservations-upgrade__title"]}`}
                                        >
                                            {title}
                                        </h4>
                                        <div
                                            className={`${styles["reservations-upgrade__price"]}`}
                                        >
                                            <p>
                                                For <span>{` ${price}$`}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`${styles["reservations-upgrade__description"]}`}
                                    >
                                        {description}
                                    </p>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={
                                                <ExpandMoreIcon fontSize="large" />
                                            }
                                            disabled={isSoldOut}
                                            // onClick={() => handleClick(id)}
                                        >
                                            <span
                                                className={`${
                                                    styles[
                                                        "reservations-upgrade__hour"
                                                    ]
                                                } ${
                                                    isSoldOut &&
                                                    styles[
                                                        "reservations-upgrade__hour--disabled"
                                                    ]
                                                }`}
                                            >
                                                <Calendar />{" "}
                                                {isSoldOut
                                                    ? hourSpa
                                                    : `${formattedDate[0]} - ${hourSpa}`}
                                            </span>
                                            <p
                                                className={`${styles["reservations-upgrade__text-title"]} ${styles["reservations-upgrade__text-title--accordion"]}`}
                                            >
                                                Select guests
                                            </p>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {guests.map(
                                                ({
                                                    id: idGuests,
                                                    pluralTitle,
                                                    singleTitle,
                                                }) => {
                                                    const isMoreGuests =
                                                        cardElements.some(
                                                            ({ id: idSpa }) =>
                                                                (upgradeGuests[
                                                                    idSpa
                                                                ].get(
                                                                    idGuests
                                                                ) as number) >=
                                                                reservationsPickerInformation[
                                                                    idGuests
                                                                ]
                                                        );
                                                    const isTooltip =
                                                        handleShowTooltip(
                                                            id,
                                                            idGuests
                                                        );

                                                    return (
                                                        <div
                                                            key={idGuests}
                                                            className={`${styles["reservations-upgrade__guests"]}`}
                                                            // ref={refCard[id]}
                                                        >
                                                            <p
                                                                className={`${styles["reservations-upgrade__text-title"]}`}
                                                            >
                                                                {reservationsPickerInformation[
                                                                    idGuests
                                                                ] > 1 ||
                                                                !reservationsPickerInformation[
                                                                    idGuests
                                                                ]
                                                                    ? pluralTitle
                                                                    : singleTitle}
                                                            </p>
                                                            <div
                                                                className={`${styles["reservations-upgrade__counter"]}`}
                                                            >
                                                                <IconButton
                                                                    onClick={() =>
                                                                        handleMinus(
                                                                            id,
                                                                            idGuests
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !upgradeGuests[
                                                                            id
                                                                        ].get(
                                                                            idGuests
                                                                        ) ||
                                                                        isSoldOut
                                                                    }
                                                                    className={`${styles["reservations-upgrade__button"]}`}
                                                                    sx={{
                                                                        "&.Mui-disabled":
                                                                            {
                                                                                backgroundColor:
                                                                                    defaultTheme
                                                                                        .palette
                                                                                        .beige
                                                                                        .disabled,
                                                                                color: defaultTheme
                                                                                    .palette
                                                                                    .white,
                                                                            },
                                                                    }}
                                                                    disableRipple
                                                                >
                                                                    <RemoveIcon fontSize="inherit" />
                                                                </IconButton>
                                                                <span
                                                                    className={`${styles["reservations-upgrade__count"]}`}
                                                                >
                                                                    {upgradeGuests[
                                                                        id
                                                                    ].get(
                                                                        idGuests
                                                                    ) ?? 0}
                                                                </span>
                                                                <ClickAwayListener
                                                                    onClickAway={() =>
                                                                        isTooltip &&
                                                                        handleTooltipClose()
                                                                    }
                                                                    touchEvent={
                                                                        false
                                                                    }
                                                                >
                                                                    <Tooltip
                                                                        disableFocusListener
                                                                        disableHoverListener
                                                                        disableTouchListener
                                                                        placement="bottom-end"
                                                                        open={
                                                                            isTooltip
                                                                        }
                                                                        onClose={
                                                                            handleTooltipClose
                                                                        }
                                                                        title={
                                                                            <Link
                                                                                className={`${styles["reservations-upgrade__tooltip"]}`}
                                                                                href={
                                                                                    WHATSAPP_LINK
                                                                                }
                                                                                target="_blank"
                                                                            >
                                                                                <p>
                                                                                    For
                                                                                    more
                                                                                    than
                                                                                    3
                                                                                    guests,
                                                                                    please{" "}
                                                                                    <span>
                                                                                        click
                                                                                        here
                                                                                    </span>{" "}
                                                                                    to
                                                                                    contact
                                                                                    us
                                                                                    on
                                                                                    whatsapp.
                                                                                </p>
                                                                            </Link>
                                                                        }
                                                                        slotProps={{
                                                                            popper: {
                                                                                modifiers:
                                                                                    [
                                                                                        {
                                                                                            name: "offset",
                                                                                            options:
                                                                                                {
                                                                                                    offset: [
                                                                                                        17,
                                                                                                        0,
                                                                                                    ],
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                            },
                                                                        }}
                                                                        PopperProps={{
                                                                            style: {
                                                                                maxWidth:
                                                                                    "25rem",
                                                                            },
                                                                        }}
                                                                    >
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                handlePlus(
                                                                                    id,
                                                                                    idGuests
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                isMoreGuests ||
                                                                                isSoldOut
                                                                            }
                                                                            className={`${styles["reservations-upgrade__button"]}`}
                                                                            sx={{
                                                                                "&.Mui-disabled":
                                                                                    {
                                                                                        backgroundColor:
                                                                                            defaultTheme
                                                                                                .palette
                                                                                                .beige
                                                                                                .disabled,
                                                                                        color: defaultTheme
                                                                                            .palette
                                                                                            .white,
                                                                                    },
                                                                            }}
                                                                            disableRipple
                                                                        >
                                                                            <AddIcon fontSize="inherit" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </ClickAwayListener>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}
