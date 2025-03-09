import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Backdrop, IconButton, useMediaQuery } from "@mui/material";

import {
    Reservation,
    ReservationsConfirmationInformation,
    ReservationsGuestsCounter,
    ReservationsPickerInformation,
    ReservationsSpaCounter,
    ReservationStepper,
    UpgradeGuests,
} from "maalum/core/models/reservations.model";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import { defaultTheme } from "maalum/styles/themes";
import {
    initialGuestsCounter,
    initialReservationsConfirmationInformation,
    initialReservationsPickerInformation,
    initialUpgradeGuestsValue,
} from "maalum/utils/reservations/reservations.utils";
import {
    generateWhatsAppLink,
    totalPrice as totalPriceSum,
} from "maalum/utils/reservations/reservationsConfirmation.utils";
import { getReseravtionsSpaGuests } from "maalum/utils/reservations/reservationsPicker.utils";
import { formatUpgradeGuests } from "maalum/utils/reservations/reservationsUpgrade.util";
import { ReservationConfirmation } from "./ReservationsConfirmation/ReservationConfirmation";
import { ReservationsPicker } from "./ReservationsPicker/ReservationsPicker";
import { ReservationsUpgrade } from "./ReservationsUpgrade/ReservationsUpgrade";

import styles from "./Reservations.module.scss";

interface ReservationsWrapperProps {
    wrapper: (element: JSX.Element) => JSX.Element;
    children: JSX.Element;
    isPhoneViewport: boolean;
}

function ReservationsWrapper({
    wrapper,
    children,
    isPhoneViewport,
}: ReservationsWrapperProps) {
    return isPhoneViewport ? children : wrapper(children);
}

export function Reservations() {
    const router = useRouter();
    const isPhoneViewport = useMediaQuery("(max-width:43.75em)");
    const { isReservationsOpen, setIsReservationsOpen } =
        useContext(MaalumContext);
    const [reservationStepper, setReservationStepper] =
        useState<ReservationStepper>("reservationsPicker");
    const [reservationsPickerInformation, setReservationsPickerInformation] =
        useState<ReservationsPickerInformation>(
            initialReservationsPickerInformation
        );
    const [isError, setIsError] = useState<boolean>(false);
    const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
    const [
        reservationsConfirmationInformation,
        setReservationsConfirmationInformation,
    ] = useState<ReservationsConfirmationInformation>(
        initialReservationsConfirmationInformation
    );
    const [caveGuests, setCaveGuests] =
        useState<ReservationsGuestsCounter>(initialGuestsCounter);
    const [upgradeGuests, setUpgradeGuests] = useState<UpgradeGuests>(
        initialUpgradeGuestsValue
    );
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [spaExcluded, setSpaExcluded] = useState<ReservationsSpaCounter>();
    const [confirmationTexts, setConfirmationTexts] = useState<{
        title: string;
        text: string;
    }>({ title: "", text: "" });
    const isReservationsConfirmationButtonDisabled = Object.values(
        reservationsConfirmationInformation
    ).some((value) => !value || !value?.length);
    const isButtonDisabledPicker =
        !reservationsPickerInformation.totalGuests ||
        !reservationsPickerInformation.date?.getHours();

    const handleOnClose = () => {
        setIsReservationsOpen(false);
        setReservationsPickerInformation(initialReservationsPickerInformation);
        setReservationsConfirmationInformation(
            initialReservationsConfirmationInformation
        );
        document.body.className = `${document.body.classList[0]}`;
        const timer = setTimeout(() => {
            setReservationStepper("reservationsPicker");
            clearTimeout(timer);
        }, 1000);
    };

    const handleReservationsPickerSubmit = () => {
        setReservationStepper("reservationsUpgrade");
        setIsError(false);
        setReservationsPickerInformation(
            (prevReservationsPickerInformation) => ({
                ...prevReservationsPickerInformation,
                naturalEssence: 0,
                maalumRitual: 0,
            })
        );
        setSpaExcluded(
            getReseravtionsSpaGuests(
                reservations,
                reservationsPickerInformation.date as Date
            )
        );
    };

    const handleReservationsUpgradeSubmit = () => {
        const caveGuests = {
            adults: reservationsPickerInformation.adults,
            children: reservationsPickerInformation.children,
            residents: reservationsPickerInformation.residents,
        };
        const totalPrice = totalPriceSum({
            ...caveGuests,
            maalumRitual: reservationsPickerInformation.maalumRitual,
            naturalEssence: reservationsPickerInformation.naturalEssence,
        });

        setCaveGuests(caveGuests);
        setReservationsPickerInformation(
            (prevReservationsPickerInformation) => ({
                ...prevReservationsPickerInformation,
                totalPrice,
            })
        );
        setReservationStepper("reservationsConfirmation");
    };

    const handleGoBack = () => {
        if (reservationStepper === "reservationsUpgrade") {
            setReservationStepper("reservationsPicker");
            return;
        }

        if (reservationStepper === "reservationsConfirmation") {
            setReservationStepper("reservationsUpgrade");
            return;
        }
    };

    const renderReservationComponent = (): {
        component: React.ReactNode;
        title: string;
        buttonText: string;
        isButtonDisabled: boolean;
        onClick: () => void;
        hasGoBackIcon?: boolean;
        hideCloseIcon?: boolean;
    } => {
        switch (reservationStepper) {
            case "reservationsPicker":
                return {
                    component: (
                        <ReservationsPicker
                            reservationsPickerInformation={
                                reservationsPickerInformation
                            }
                            setReservationsPickerInformation={
                                setReservationsPickerInformation
                            }
                            reservations={reservations}
                            setReservations={setReservations}
                            upgradeGuests={upgradeGuests}
                        />
                    ),
                    title: "SELECT GUESTS AND DATES",
                    buttonText: "NEXT",
                    isButtonDisabled: isButtonDisabledPicker,
                    onClick: () => handleReservationsPickerSubmit(),
                };
            case "reservationsUpgrade":
                return {
                    component: (
                        <ReservationsUpgrade
                            reservationsPickerInformation={
                                reservationsPickerInformation
                            }
                            setReservationsPickerInformation={
                                setReservationsPickerInformation
                            }
                            upgradeGuests={upgradeGuests}
                            setUpgradeGuests={setUpgradeGuests}
                            spaExcluded={spaExcluded as ReservationsSpaCounter}
                            setReservationStepper={setReservationStepper}
                        />
                    ),
                    title: "UPGRADE YOUR EXPERIENCE",
                    buttonText: "NEXT",
                    isButtonDisabled: false,
                    onClick: () => handleReservationsUpgradeSubmit(),
                    hasGoBackIcon: true,
                };
            case "reservationsConfirmation":
                return {
                    component: (
                        <ReservationConfirmation
                            isError={isError}
                            isValidPhone={isValidPhone}
                            setIsValidPhone={setIsValidPhone}
                            reservationsPickerInformation={
                                reservationsPickerInformation
                            }
                            formattedUpgradeGuests={formatUpgradeGuests(
                                upgradeGuests
                            )}
                            caveGuests={caveGuests}
                            reservationsConfirmationInformation={
                                reservationsConfirmationInformation
                            }
                            setReservationsConfirmationInformation={
                                setReservationsConfirmationInformation
                            }
                        />
                    ),
                    title: "REQUEST SUMMARY",
                    buttonText: "SEND",
                    isButtonDisabled:
                        isReservationsConfirmationButtonDisabled ||
                        !isValidPhone,
                    hasGoBackIcon: true,
                    onClick: () =>
                        router.push(
                            generateWhatsAppLink({
                                ...reservationsPickerInformation,
                                ...reservationsConfirmationInformation,
                            })
                        ),
                };
            default:
                return {
                    component: <></>,
                    title: "",
                    buttonText: "",
                    isButtonDisabled: false,
                    onClick: () => {},
                };
        }
    };

    const {
        component,
        title,
        buttonText,
        onClick,
        hasGoBackIcon,
        isButtonDisabled,
        hideCloseIcon,
    } = renderReservationComponent();
    const isLinkButton = title === "REQUEST SUMMARY";

    return (
        <ReservationsWrapper
            isPhoneViewport={isPhoneViewport}
            wrapper={(children) => (
                <Backdrop
                    open={isReservationsOpen}
                    transitionDuration={{ enter: 800, exit: 800 }}
                    sx={{ zIndex: 2, opacity: 1 }}
                >
                    {children}
                </Backdrop>
            )}
        >
            <section
                className={`${styles.reservations} ${
                    isReservationsOpen && styles["reservations--active"]
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={`${styles["reservations__container"]}`}>
                    <header className={`${styles.reservations__header}`}>
                        <div
                            className={`${styles["reservations__title-container"]}`}
                        >
                            {hasGoBackIcon && (
                                <IconButton
                                    onClick={handleGoBack}
                                    sx={{
                                        color: "inherit",
                                        fontSize: 22,
                                        paddingLeft: 0,
                                    }}
                                    disableRipple
                                >
                                    <KeyboardBackspaceIcon fontSize="inherit" />
                                </IconButton>
                            )}
                            <h4
                                className={`${styles.reservations__title} heading-cuaternary`}
                            >
                                {title}
                            </h4>
                        </div>
                        <IconButton
                            onClick={handleOnClose}
                            sx={{
                                color: "inherit",
                                fontSize: 22,
                                visibility: hideCloseIcon
                                    ? "hidden"
                                    : "visible",
                            }}
                            disableRipple
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </header>
                    {component}

                    <footer className={`${styles.reservations__footer}`}>
                        <button
                            className={`${
                                styles["reservations__footer-button"]
                            } ${
                                isButtonDisabled &&
                                styles["reservations__footer-button--disabled"]
                            }`}
                            disabled={isButtonDisabled}
                            type="button"
                            onClick={onClick}
                        >
                            {buttonText}
                            {isLinkButton && (
                                <WhatsAppIcon
                                    style={{
                                        color: defaultTheme.palette.white,
                                        fontSize: 20,
                                    }}
                                />
                            )}
                        </button>
                    </footer>
                </div>
            </section>
        </ReservationsWrapper>
    );
}
