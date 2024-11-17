import {
    ADULTS_PRICE,
    CHILDREN_PRICE,
    NATURAL_ESSENCE_PRICE,
    NATURAL_ESSENCE_PRICE_PROMO,
    RESIDENTS_PRICE,
    RITUAL_PRICE,
    RITUAL_PRICE_PROMO,
} from "maalum/core/constants/constants";
import {
    FormattedReservationsPickerData,
    ReservationsConfirmationInformation,
    ReservationsGuestsCounter,
    ReservationsPickerInformation,
    ReservationsSpaCounter,
} from "maalum/core/models/reservations.model";
import { getHour } from "./reservationsUpgrade.util";

const prices = (
    isPromoNaturalEssence: boolean,
    isPromoMaalumRitual: boolean
): ReservationsSpaCounter & ReservationsGuestsCounter => ({
    adults: ADULTS_PRICE,
    children: CHILDREN_PRICE,
    residents: RESIDENTS_PRICE,
    naturalEssence: isPromoNaturalEssence
        ? NATURAL_ESSENCE_PRICE_PROMO
        : NATURAL_ESSENCE_PRICE,
    maalumRitual: isPromoMaalumRitual ? RITUAL_PRICE_PROMO : RITUAL_PRICE,
});

const reservationsConfirmationInputs: {
    id: keyof ReservationsConfirmationInformation;
    label: string;
    type?: string;
}[] = [
    {
        id: "firstName",
        label: "FIRST NAME",
    },
    {
        id: "lastName",
        label: "LAST NAME",
    },
    {
        id: "email",
        label: "EMAIL",
        type: "email",
    },
    {
        id: "phone",
        label: "PHONE NUMBER",
        type: "number",
    },
];

const reservationsPickerData: {
    id: keyof FormattedReservationsPickerData;
    title: string;
    fontWeight?: number;
}[] = [
    {
        id: "date",
        title: "DATE",
    },
    {
        id: "caveHour",
        title: "CAVE HOUR",
    },
    {
        id: "spaHour",
        title: "SPA HOUR",
    },
    {
        id: "guests",
        title: "GUESTS",
    },
    {
        id: "amount",
        title: "AMOUNT",
        fontWeight: 600,
    },
];

const formatReservationsPickerData = ({
    date,
    adults,
    children,
    residents,
    spaPrice,
    spaPricePromo,
}: ReservationsGuestsCounter & {
    date: Date | null;
    spaPrice?: number;
    spaPricePromo?: number;
}): FormattedReservationsPickerData => {
    const adultsText = `${
        !!adults ? `${adults} ${adults === 1 ? "adult" : "adults"}` : ""
    }`;
    const childrenText = `${
        !!children
            ? `${!!adults ? "," : ""} ${children} ${
                  children === 1 ? "child" : "children"
              }`
            : ""
    }`;
    const residentsText = `${
        !!residents
            ? `${!!adults || !!children ? "," : ""} ${residents} ${
                  residents === 1 ? "resident" : "residents"
              }`
            : ""
    }`;
    const totalGuests = adults + children + residents;
    const hour = date?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const hourSpa = getHour(hour as string);

    return {
        date: date?.toLocaleString().split(",")[0] || "",
        ...(!spaPrice && { caveHour: hour || "" }),
        ...(spaPrice && { spaHour: hourSpa || "" }),
        guests: `${adultsText}${childrenText}
  ${!!adults && !!children && !!residents ? "..." : `${residentsText}`}`,
        amount: spaPrice
            ? `${
                  ((totalGuests === 2 ? spaPricePromo : spaPrice) as number) *
                  totalGuests
              }$`
            : `${
                  adults * ADULTS_PRICE +
                  children * CHILDREN_PRICE +
                  residents * RESIDENTS_PRICE
              }$`,
    };
};

const includeInBookingData = (guests: ReservationsGuestsCounter) =>
    Object.values(guests).some((value) => value);

const totalPrice = (
    pickerInformation: ReservationsSpaCounter & ReservationsGuestsCounter
) => {
    const pricesDefinitive = prices(
        pickerInformation?.naturalEssence === 2,
        pickerInformation?.maalumRitual === 2
    );
    return Object.keys(pricesDefinitive).reduce(
        (accumulator, key) =>
            accumulator +
            pickerInformation[
                key as keyof ReservationsSpaCounter &
                    keyof ReservationsGuestsCounter
            ] *
                pricesDefinitive[
                    key as keyof ReservationsSpaCounter &
                        keyof ReservationsGuestsCounter
                ],
        0
    );
};

const generateWhatsAppLink = ({
    firstName,
    lastName,
    date,
    adults,
    children,
    residents,
    naturalEssence,
    maalumRitual,
}: ReservationsPickerInformation & ReservationsConfirmationInformation) => {
    const formattedDate = new Date(date as Date);
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString("en", { month: "long" });
    const time = formattedDate.toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const details = [`${adults} ${adults === 1 ? "adult" : "adults"}`];

    if (children > 0) {
        details.push(`${children} ${children === 1 ? "child" : "children"}`);
    }

    if (residents > 0) {
        details.push(
            `${residents} ${residents === 1 ? "resident" : "residents"}`
        );
    }

    let services = [];

    if (maalumRitual > 0) {
        services.push(
            `including ${maalumRitual} ${
                maalumRitual === 1 ? "maalum ritual" : "maalum rituals"
            }`
        );
    }

    if (naturalEssence > 0) {
        services.push(
            `${services.length > 0 ? "and" : "including"} ${naturalEssence} ${
                naturalEssence === 1 ? "natural essence" : "natural essences"
            }`
        );
    }

    const fullDetails = [...details, ...services].join(", ");

    const message = `Hi Maalum, I'm ${firstName} ${lastName}, I would like to make a reservation for the ${day} of ${month}, at ${time} for ${fullDetails}. Thank you :)`;

    const phoneNumber = "255772628924";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return whatsappLink;
};

export {
    reservationsConfirmationInputs,
    reservationsPickerData,
    formatReservationsPickerData,
    includeInBookingData,
    totalPrice,
    generateWhatsAppLink,
};
