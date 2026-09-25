/* =========================================
   ELEMENTY FORMULARZA
========================================= */

const ids = [
    "filament",
    "filamentPrice",
    "printTime",
    "power",
    "electricityPrice",
    "machineCost",
    "margin",
    "extraWork"
];


/* =========================================
   SKRÓT DO ELEMENTU
========================================= */

const $ = (id) => {
    return document.getElementById(id);
};


/* =========================================
   FORMATOWANIE PIENIĘDZY
========================================= */

function money(value) {

    return `${value.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} zł`;
}


/* =========================================
   POBIERANIE WARTOŚCI
========================================= */

function value(id) {

    const number = Number($(id).value);

    if (
        Number.isFinite(number) &&
        number >= 0
    ) {
        return number;
    }

    return 0;
}


/* =========================================
   GŁÓWNE OBLICZENIA
========================================= */

function calculate() {

    /*
     * Pobieramy dane z formularza.
     */

    const filament =
        value("filament");

    const filamentPrice =
        value("filamentPrice");

    const printTime =
        value("printTime");

    const power =
        value("power");

    const electricityPrice =
        value("electricityPrice");

    const machineCost =
        value("machineCost");

    const margin =
        value("margin");

    const extraWork =
        value("extraWork");


    /*
     * ===============================
     * FILAMENT
     * ===============================
     *
     * Cena jest podana za kilogram,
     * dlatego gramy dzielimy przez 1000.
     */

    const filamentCost =
        (filament / 1000) *
        filamentPrice;


    /*
     * ===============================
     * PRĄD
     * ===============================
     *
     * W -> kW
     *
     * następnie:
     *
     * kW × godziny × cena kWh
     */

    const powerCost =
        (power / 1000) *
        printTime *
        electricityPrice;


    /*
     * ===============================
     * EKSPLOATACJA
     * ===============================
     *
     * godziny × koszt za godzinę
     */

    const printerCost =
        printTime *
        machineCost;


    /*
     * ===============================
     * KOSZT WŁASNY
     * ===============================
     */

    const ownCost =
        filamentCost +
        powerCost +
        printerCost +
        extraWork;


    /*
     * ===============================
     * ZYSK
     * ===============================
     *
     * Marża jest liczona od kosztu
     * własnego.
     *
     * np.
     *
     * 22,26 zł × 60% = 13,36 zł
     */

    const profit =
        ownCost *
        (margin / 100);


    /*
     * ===============================
     * CENA SPRZEDAŻY
     * ===============================
     */

    const salePrice =
        ownCost +
        profit;


    /*
     * ===============================
     * AKTUALIZACJA EKRANU
     * ===============================
     */

    $("filamentCost").textContent =
        money(filamentCost);

    $("powerCost").textContent =
        money(powerCost);

    $("machineCostResult").textContent =
        money(printerCost);

    $("workCost").textContent =
        money(extraWork);

    $("ownCost").textContent =
        money(ownCost);

    $("salePrice").textContent =
        money(salePrice);

    $("profit").textContent =
        money(profit);
}


/* =========================================
   AUTOMATYCZNE PRZELICZANIE
========================================= */

ids.forEach((id) => {

    $(id).addEventListener(
        "input",
        calculate
    );

});


/* =========================================
   PRZYCISK RESET
========================================= */

$("resetBtn").addEventListener(
    "click",
    () => {

        const defaults = {

            filament: 350,

            filamentPrice: 50,

            printTime: 3,

            power: 350,

            electricityPrice: 1.20,

            machineCost: 3.50,

            margin: 60,

            extraWork: 0
        };


        Object.entries(defaults)
            .forEach(([id, value]) => {

                $(id).value = value;

            });


        calculate();
    }
);


/* =========================================
   PIERWSZE OBLICZENIE
========================================= */

calculate();
